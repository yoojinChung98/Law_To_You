import React, { useEffect, useState } from 'react';
import './ConsultPage.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ConsultQBox from './ConsultQBox';
import ConsultABox from './ConsultABox';
import { ConsultABoxWrite } from './ConsultABoxWrite';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config/host-config';

const ConsultPage = () => {
  const BASE_URL = API_BASE_URL;
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);

  // 요청 경로에 묻어있는 param 값을 함께 받아옴 (변수명 수정 금지. 수정 시 Route 함께 수정)
  let { consultNum } = useParams();
  consultNum = parseInt(consultNum, 10);

  // 의뢰인 질문에 필요한 값이 모두 들어있는 객체 상태값.
  const [qContent, setQContent] = useState({});
  // 답변리스트가 담기는 객체 상태값
  const [aContentList, setAContentList] = useState([]);
  // 변호사가 답변을 작성한 적이 있는지 구분하는 상태값
  const [wrote, setWrote] = useState(false);
  // 글을 작성한 의뢰인인지를 기억하는 상태값
  const [userIsWriter, setUserIsWriter] = useState(false);

  // 실제 렌더링 될 내용
  const [realContent, setRealContent] = useState();
  // 실제 답변 리스트
  const [realAnswer, setRealAnswer] = useState();

  useEffect(() => {
    // 의뢰인의 질문 데이터 할당
    getQCounsel();
    // // 변호사들의 답변들 데이터 할당
    // getAnss();

    // render();
  }, []);

  // const getContent = () => {
  //   getQCounsel();
  //   getAnss();
  // };

  // const chkUserMode = () => {
  //   return loggedUser.mode === 'user' ? userMode() : lawyerMode();
  // };

  // 온라인 상담 문의 글 받아와서 상테값에 세팅하는 함수
  const getQCounsel = async () => {
    console.log('getQCounsel 함수 호출완료!');
    let res = await fetch(
      `${BASE_URL}/counsel/content?consultNum=${consultNum}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      }
    );

    // 응답 상태가 에러일 시 메인페이지로 이동 (counsel 로 보내면 권한에 따라 글쓰기로 보내지므로.)
    if (res.status != 200) {
      console.log(res);
      alert('이 글의 진입 권한이 없습니다.');
      console.log('navigate(' / ')');
      navigate('/'); // 로직 수정 완료 후 살릴 것!
    }

    // 응답상태가 200 인 경우 조건에 따라 입밴 / 응답값 상태변수에 할당
    // 이거 res 여러번 까서 문제되려나?ㅜㅜ
    const dataQ = await res.json();
    //의뢰인이라면 아이디가 같은 경우에만 본 페이지 열람이 가능함
    if (loggedUser.mode === 'user') {
      console.log('data.writer: ', dataQ.writer);
      console.log('loggedUser.id: ', loggedUser.name);
      if (dataQ.writer != loggedUser.name) {
        alert('다른 사람이 작성한 온라인 상담은 열람할 수 없습니다.');
        navigate('/');
      }
      setUserIsWriter(true);
      console.log(
        'res.json().then(data)에서 data를 setQContent할건데 그 값은? ',
        dataQ
      );
      console.log('qContent 세팅 직전');
      setQContent(dataQ);
    } else {
      // 변호사라면 언제든지 열람가능
      console.log('qContent 세팅 직전');
      setQContent(dataQ);
    }

    getAnss(dataQ);
  };

  // 답변 목록을 받아오고 상태변수에 할당하는 함수
  const getAnss = async (dataQ) => {
    console.log('getAnss 함수 호출 완료!');
    let res = await fetch(
      `${BASE_URL}/answer?consultNum=${consultNum}&page=1&size=10`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      }
    );

    // 응답 상태가 에러일 시 메인페이지로 이동 (counsel 로 보내면 권한에 따라 글쓰기로 보내지므로.)
    if (res.status != 200) {
      alert('이 글의 진입 권한이 없습니다.');
      navigate('/');
    }

    let dataA = await res.json();
    dataA = dataA.answerList;
    console.log(dataA);

    //답변이 하나도 달리지 않은 경우, 함수 종료
    if (dataA == null) return;

    console.log('aContentList 세팅 직전');
    // 응답상태가 200 인 경우 답변리스트 상태변수에 응답값 할당
    setAContentList(dataA);

    // 현재 로그인한 변호사의 계정으로 작성된 답변이 있다면 작성컴포넌트를 띄우지 않도록
    // 그걸 체크할 상태플래그(wrote)를 세팅하는 과정.
    let flg = false;
    dataA.map((answer) => {
      console.log('answer.writer의 값: ', answer.writer);
      console.log('loggedUser.name의 값: ', loggedUser.name);
      if (answer.writer === loggedUser.name) {
        flg = true;
      }
    });
    console.log('flg의 값: ', flg);

    // console.log('fla의 값은: ', flg);
    // console.log('!!fla의 값은: ', !!flg);

    // !!flg ? setWrote(true) : setWrote(false);

    render(dataQ, dataA, flg);
  };

  const render = (dataQ, dataA, flg) => {
    console.log('---------render 함수 호출완료!--------');
    if (loggedUser.mode === 'user') {
      console.log('user 모드인 경우!');
      if (!!qContent) {
        console.log('user: qContent가 truthy 인 경우! ');
        setRealContent(
          <>
            {/* <span>유저계정 컴포넌트</span> */}
            <ConsultQBox
              qContent={dataQ}
              aContentList={dataA}
            />
            {/* 유저의 경우 변호사가 답변을 달지 않았다면 하단의 컴포넌트는 span 만 뜰 것.  */}
            {/* <ConsultABox aContentList={aContentList} userIsWriter={userIsWriter} consultNum={consultNum} /> */}
          </>
        );
        setRealAnswer(renderABox(dataA));
      }
    } else if (loggedUser.mode === 'lawyer') {
      console.log('lawyer 모드인 경우!');
      if (!!qContent) {
        console.log('lawyer: qContent가 truthy 인 경우! ');
        setRealContent(
          <>
            {/* <span>변호사계정 컴포넌트</span> */}
            <ConsultQBox
              qContent={dataQ}
              aContentList={dataA}
            />
            {flg ? '' : <ConsultABoxWrite consultNum={consultNum} />}
            {/* <ConsultABox aContentList={aContentList} userIsWriter={userIsWriter} consultNum={consultNum} /> */}
          </>
        );
        setRealAnswer(renderABox(dataA));
      }
    }
    console.log('---------render 함수 종료----------');
  };

  // 유저의 경우 할당이 끝난 값들을 가지고 어떻게 컴포넌트를 배열할지 로직
  // const userMode = () => {
  //   return (
  //     <>
  //       <ConsultQBox
  //         qContent={qContent}
  //         aContentList={aContentList}
  //       />
  //       {/* 유저의 경우 변호사가 답변을 달지 않았다면 하단의 컴포넌트는 span 만 뜰 것.  */}
  //       {/* <ConsultABox aContentList={aContentList} userIsWriter={userIsWriter} consultNum={consultNum} /> */}
  //     </>
  //   );
  // };

  // 변호사의 경우 할당이 끝난 값들을 가지고 어떻게 컴포넌트를 배열할지  로직//
  // const lawyerMode = () => {
  //   return (
  //     <>
  //       <ConsultQBox
  //         qContent={qContent}
  //         aContentList={aContentList}
  //       />
  //       {loggedUser.mode === 'lawyer' && !wrote ? (
  //         <ConsultABoxWrite consultNum={consultNum} />
  //       ) : (
  //         ''
  //       )}
  //       {/* <ConsultABox aContentList={aContentList} userIsWriter={userIsWriter} consultNum={consultNum} /> */}
  //     </>
  //   );
  // };

  // const renderABox = () => {
  //   console.log('aContetList 의 값: ', aContentList);
  //   return aContentList.map((ansCont) => {
  //     return (
  //       <ConsultABox
  //         ansCont={ansCont}
  //         userIsWriter={userIsWriter}
  //         consultNum={consultNum}
  //       />
  //     );
  //   });
  // };

  const renderABox = (dataA) => {
    console.log('renderABox 호출');
    console.log('aContetList 의 값: ', dataA);
    return dataA.map((ansCont) => {
      return (
        <ConsultABox
          ansCont={ansCont}
          userIsWriter={userIsWriter}
          consultNum={consultNum}
        />
      );
    });
  };

  // getQCounsel();
  // getAnss();

  return (
    <>
      <div className='page'>
        <div className='consult-wrapper'>
          {console.log('이제 진짜 렌더링 시작!')}
          {realContent}
          {realAnswer}
        </div>
      </div>
    </>
  );
};

export default ConsultPage;
