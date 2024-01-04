import React, { useEffect, useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ConsultQBox from './ConsultQBox';
import './DeepPage.css';
import DeepABox from './DeepABox';
import DeepABoxWrite from './DeepABoxWrite';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../config/host-config';
import { useSelector } from 'react-redux';

const DeepPage = () => {
  const BASE_URL = API_BASE_URL;
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);
  // 깊은 페이지로 들어올 때 해당하는 consultNum 을 파라미터로 함께 보냄
  let { consultNum } = useParams();
  consultNum = parseInt(consultNum, 10);

  // 의뢰인 질문에 필요한 값이 모두 들어있는 객체 상태값.
  const [qContent, setQContent] = useState({});
  // 답변리스트가 담기는 객체 상태값
  const [aContentList, setAContentList] = useState([]);
  // 변호사가 답변을 작성한 적이 있는지 구분하는 상태값
  const [wrote, setWrote] = useState(false);
  // 깊은 답변이 달려있는지 여부를 알리는 변수
  // const [hasDeepA, setHasDeepA] = useState(false);
  // 자식 컴포넌트 중 ConsultQBox 내부의 삭제버튼을 띄우지 않기 위한 변수
  const IsDeep = true;

  // 실제 렌더링 될 내용
  const [realContent, setRealContent] = useState();
  // 실제 답변 리스트
  const [realAnswer, setRealAnswer] = useState();

  useEffect(() => {
    // 의뢰인의 질문 데이터 할당
    // 이후 답변 데이터 할당 및 렌더링 내용 set을 줄줄이 호출할 예정
    getQCounsel();
  }, []);

  // 온라인 상담 문의 글 받아와서 상테값에 세팅하는 함수
  let getQCounsel = async () => {
    console.log('getQCounsel 함수 호출완료!');
    let res = await fetch(
      `${BASE_URL}/mypage/counsel/detail?consultNum=${consultNum}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      }
    );

    // 응답 상태가 에러일 시 메인페이지로 이동 (counsel 로 보내면 권한에 따라 글쓰기로 보내지므로.)
    if (res.status != 200) {
      let resText = alert('이 글의 진입 권한이 없습니다.');
      navigate('/');
    }

    const dataQ = await res.json();
    // 응답상태가 200 인 경우 조건에 따라 입밴 / 응답값 상태변수에 할당
    //의뢰인이라면 아이디가 같은 경우에만 본 페이지 열람이 가능함
    if (loggedUser.mode === 'user') {
      console.log('data.writer: ', dataQ.writer);
      console.log('loggedUser.id: ', loggedUser.name);
      if (dataQ.writer != loggedUser.name) {
        alert('다른 의뢰인이 작성한 깊은 상담은 열람할 수 없습니다.');
        navigate('/');
      }
      setQContent(dataQ);
    } else {
      // 변호사라면 언제든지 열람가능
      setQContent(dataQ);
    }

    getAnss(dataQ);
  };

  const getAnss = async (dataQ) => {
    console.log('getAnss 함수 호출 완료!');
    let res = await fetch(
      `${BASE_URL}/answer/detail?consultNum=${consultNum}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      }
    );

    let dataA;
    let hasDeepA = false;
    // 응답상태가 200일 때, 답변을 리스트에 담던지, 아니면 깊은 답변이 아직 달리지 않은 경우 이던지
    if (res.ok) {
      dataA = await res.json();

      if (loggedUser.mode === 'lawyer') {
        console.log('data.writer: ', dataA.writer);
        console.log('loggedUser.id: ', loggedUser.name);
        if (dataA.writer != loggedUser.name) {
          alert('채택되지 않은 깊은 상담은 열람할 수 없습니다.');
          navigate('/');
        }
      }

      if (dataA == null) {
        // 깊은 답변 작성이 안되어있는 경우
        hasDeepA = false;
        setWrote(false);
        // setAContentList(resJson); // 값이 없으니까 굳이 담을 필요 없음
        return;
      } else {
        // 깊은 답변 작성이 되어있는 경우
        hasDeepA = true;
        setWrote(true);
        // 리스트이지만 결국 크기가 1인 배열이 들어갈 것(객체 하나만 들어감.)
        // 아닌가 객체가 들어가서 터지려나
        setAContentList(dataA);
      }
    } else {
      // 응답 상태가 에러일 시 메인페이지로 이동 (counsel 로 보내면 권한에 따라 글쓰기로 보내지므로.)
      let resText = await res.text();
      switch (resText) {
        case 'no-detailed-answer':
          break;
        default:
          alert('깊은 상담 페이지 진입에 오류가 있습니다.');
          navigate('/');
          break;
      }
    }

    render(dataQ, dataA, hasDeepA);
  };

  const render = (dataQ, dataA, hasDeepA) => {
    console.log('---------render 함수 호출완료!--------');
    if (loggedUser.mode === 'user') {
      console.log('user 모드인 경우!');
      setRealContent(
        <>
          <ConsultQBox
            qContent={dataQ}
            aContentList={dataA}
            IsDeep={IsDeep}
          />
        </>
      );
      setRealAnswer(renderABox(dataQ, dataA, hasDeepA));
    } else if (loggedUser.mode === 'lawyer') {
      console.log('lawyer 모드인 경우!');
      setRealContent(
        <>
          <ConsultQBox
            qContent={dataQ}
            aContentList={dataA}
            IsDeep={IsDeep}
          />
          {hasDeepA ? '' : <DeepABoxWrite consultNum={consultNum} />}
        </>
      );
      if (hasDeepA) {
        setRealAnswer(renderABox(dataQ, dataA, hasDeepA));
      }
    }
    console.log('---------render 함수 종료----------');
  };

  const renderABox = (dataQ, dataA, hasDeepA) => {
    return (
      <DeepABox
        ansCont={dataA}
        consultNum={consultNum}
        hasDeepA={hasDeepA}
        qContent={dataQ}
      />
    );
  };

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

export default DeepPage;
