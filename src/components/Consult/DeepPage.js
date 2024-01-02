import React, { useState } from 'react';
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
  let consultNum = useParams();

  // 의뢰인 질문에 필요한 값이 모두 들어있는 객체 상태값.
  const [qContent, setQContent] = useState({});
  // 답변리스트가 담기는 객체 상태값
  const [aContentList, setAContentList] = useState([]);
  // 변호사가 답변을 작성한 적이 있는지 구분하는 상태값
  const [wrote, setWrote] = useState(false);
  // 깊은 답변이 달려있는지 여부를 알리는 변수
  const [hasDeepA, setHasDeepA] = useState(false);
  // 자식 컴포넌트 중 ConsultQBox 내부의 삭제버튼을 띄우지 않기 위한 변수
  const IsDeep = true;

  let getQCounsel = async () => {
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
      alert('이 글의 진입 권한이 없습니다.');
      navigate('/');
    }
    // 응답상태가 200 인 경우 조건에 따라 입밴 / 응답값 상태변수에 할당
    const data = await res.json();
    //의뢰인이라면 아이디가 같은 경우에만 본 페이지 열람이 가능함
    if (loggedUser.mode === 'user') {
      if (data.writer != loggedUser.id) {
        alert('다른 사람이 작성한 온라인 상담은 열람할 수 없습니다.');
        navigate('/');
      }
      console.log(
        'res.json().then(data)에서 data를 setQContent할건데 그 값은? ',
        data
      );
      setQContent(data);
    } else {
      // 변호사라면 언제든지 열람가능
      setQContent(data);
    }
  };

  const getAnss = async () => {
    let res = await fetch(`${BASE_URL}/answer/detail?answerNum=${consultNum}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    });

    // 응답상태가 200일 때, 답변을 리스트에 담던지, 아니면 깊은 답변이 아직 달리지 않은 경우 이던지
    if (res.status == 200) {
      const resJson = res.json();
      if (resJson == null) {
        // 깊은 답변 작성이 안되어있는 경우
        setHasDeepA(false);
        setWrote(false);
        // setAContentList(resJson); // 값이 없으니까 굳이 담을 필요 없음
        return;
      } else {
        // 깊은 답변 작성이 되어있는 경우
        setHasDeepA(true);
        setWrote(true);
        setAContentList(resJson);
      }
    } else {
      // 응답 상태가 에러일 시 메인페이지로 이동 (counsel 로 보내면 권한에 따라 글쓰기로 보내지므로.)
      alert('이 글의 진입 권한이 없습니다.');
      navigate('/');
    }
  };

  const renderABox = () => {
    return aContentList.map((ansCont) => {
      return (
        <DeepABox
          ansCont={ansCont}
          consultNum={consultNum}
          hasDeepA={hasDeepA}
          qContent={qContent}
        />
      );
    });
  };

  const chkUserMode = () => {
    // 의뢰인의 질문 데이터 할당
    getQCounsel();
    // 변호사들의 답변들 데이터 할당
    getAnss();

    return loggedUser.mode === 'user' ? userMode() : lawyerMode();
  };

  // 유저의 경우 할당이 끝난 값들을 가지고 어떻게 컴포넌트를 배열할지 로직
  const userMode = () => {
    return (
      <>
        <ConsultQBox
          qContent={qContent}
          aContentList={aContentList}
          IsDeep={IsDeep}
        />
      </>
    );
  };

  // 변호사의 경우 할당이 끝난 값들을 가지고 어떻게 컴포넌트를 배열할지  로직//
  const lawyerMode = () => {
    return (
      <>
        <ConsultQBox
          qContent={qContent}
          aContentList={aContentList}
          IsDeep={IsDeep}
        />
        {/* 조건부 렌더링 필요: 변호사의 답변 등록 유무 */}
        {loggedUser.mode === 'lawyer' && !hasDeepA ? (
          <DeepABoxWrite consultNum={consultNum} />
        ) : (
          ''
        )}
      </>
    );
  };

  return (
    <>
      <div className='page'>
        <div className='consult-wrapper'>
          {/* 1. 사용자계정 : V ConsultQBox 에 삭제버튼 X
                  일반상담의 isUpdated = true(깊은 상담 작성 완료) 직후부터 입장 가능.

              2. 변호사계정 : 아직 답변을 달지 않았다면 <DeepABoxWriter />
                  일반상담이 isUpdated 인 직후부터 입장 가능. (아직 답변 작성하지 않았다면 DeepABoxWrite 를 띄우고, 답변작성완료라면 DeepABox 를 띄우기.)
              답변을 달았다면 <DeepABox />/*}

          {/*  ------------------- 사용자 질문 박스 -------------------------- */}
          {/* deep한 상담인 경우 삭제버튼은 무조건 띄우면 안되므로, DeepPage에서 IsDeep? 의 값으로 True 값을 주어 삭제할 수없도록 하자. */}
          <ConsultQBox IsDeep={IsDeep} />

          {/* -------------------- 답변 조회/등록 박스 --------------------- */}
          {/* 조건부 렌더링 필요: 변호사의 답변 등록 유무 */}
          <DeepABox />
          <DeepABoxWrite />
        </div>
      </div>
    </>
  );
};

export default DeepPage;
