import React, { useEffect } from 'react';
import './ConsultPage.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ConsultQBox from './ConsultQBox';
import ConsultABox from './ConsultABox';
import { ConsultABoxWrite } from './ConsultABoxWrite';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { useNavigate, useParams } from 'react-router-dom';

const ConsultPage = () => {
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);

  // 요청 경로에 묻어있는 param 값을 함께 받아옴 (변수명 수정 금지. 수정 시 Route 함께 수정)
  let consultNum = useParams();

  // 온라인 상담 문의 글 받아오기
  const getQCounsel = () => {};

  // useEffect(() => {
  //   // 로그인이 되지 않은 경우 login 유도
  //   if (!loggedUser.id) {
  //     alert('로그인이 필요한 서비스입니다.');
  //     navigate('/login');
  //     return;
  //   }
  //   if()

  //   if(loggedUser.mode === 'user') {

  //   }

  // }, []);

  // 더미 데이터 입력을 위한 임시 코드
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // setUser 액션을 통해 user 상태를 변경합니다.
  //   dispatch(
  //     setUser({
  //       id: 'newId', // 새로운 ID 값
  //       name: 'New Name', // 새로운 이름 값
  //       nickname: 'New Nickname', // 새로운 닉네임 값
  //       mode: 'New Mode', // 새로운 모드 값
  //     })
  //   );
  // }, [dispatch]);

  // 들어오자마자 패치요청 날려날려~

  // console.log(LoggedUser);
  // console.log('LoggedUser.id 값: ', LoggedUser.id);
  // console.log('LoggedUser.name 값: ', LoggedUser.name);
  // console.log('LoggedUser.nickname의 값: ', LoggedUser.nickname);
  // console.log('LoggedUser.mode의 값: ', LoggedUser.mode);

  // if (LoggedUser.id ===   LoggedUser.mode === 'CLIENT', )

  // useEffect(() => {}, []);

  return (
    <>
      <div className='page'>
        <div className='consult-wrapper'>
          {/* 1. 작성자 '본인' 사용자 계정 : ConsultQBox (조건에따라 삭제btnO), consultABox(채택btnO)
          2. 아직 답변을 달지 않은 변호사 : ConsultQBox(삭제btnX), consultABox, ConsultABoxWirte
          3. 답변을 달았던 변호사 : ConsultQBox(삭제btnX), consultABox */}

          {/*  ------------------- 사용자 질문 박스 -------------------------- */}
          <ConsultQBox />
          {/* ------------------- 등록된 변호사 답변 목록 -------------------------------------- */}
          <ConsultABox />
          {/* ------------------- 변호사 답변 쓰기 박스 --------------------------*/}
          <ConsultABoxWrite />
        </div>
      </div>
    </>
  );
};

export default ConsultPage;
