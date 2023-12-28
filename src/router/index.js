import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import BoardCounsel from '../components/Board/BoardCounsel';
import BoardFree from '../components/Board/BoardFree';
import BoardFreeReply from '../components/Board/BoardFreeReply';
import BoardFreeWrite from '../components/Board/BoardFreeWrite';
import Bupbong from '../components/Bupbong/Bupbong';
import JoinMain from '../components/Join/JoinMain';
import LoginMain from '../components/Login/LoginMain';
import MainPage from '../components/MainPage';
import commUtil from '../util/commUtil';
import FAQPage from '../components/FAQ/FAQPage';
import UserModify from '../components/modify/UserModify';
import LawyerModify from '../components/modify/LawyerModify';
import OnlineWrite from '../components/write/OnlineWrite';
import DeepWrite from '../components/write/DeepWrite';
import ConsultPage from '../components/Consult/ConsultPage';
import DeepPage from '../components/Consult/DeepPage';
import '../index.css';
import MyConsultListPage from '../components/MyConsultList/MyConsultListPage';
import MyPostListPage from '../components/MyPostList/MyPostListPage';

const RouterIndex = () => {
  const isLogin = commUtil.isNotEmpty(localStorage.getItem('accessToken'));

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    } else {
      if (location.pathname === '/login') {
        navigate('/');
      }
    }
  }, []);

  return (
    <Routes>
      <Route
        path='/login/'
        element={<LoginMain />}
      />
      <Route
        path='/join/'
        element={<JoinMain />}
      />
      <Route
        path='/'
        element={<MainPage />}
      ></Route>
      <Route
        path='/*'
        element={<></>}
      ></Route>
      <Route
        path='/faq/'
        element={<FAQPage />}
      ></Route>
      <Route
        path='/counsel/'
        element={<BoardCounsel />}
      ></Route>
      <Route
        path='/counsel/detail/:consultNum'
        element={<ConsultPage />}
      ></Route>
      {/* 
        일반상담 클릭 시, user 권한은 상담등록페이지로 이동
        <Route
          path='/counselwirte/'
          element={}
        ></Route> */}
      <Route
        path='/free/'
        element={<BoardFree />}
      ></Route>
      <Route
        path='/freewrite/'
        element={<BoardFreeWrite />}
      ></Route>
      <Route
        path='/myfree/'
        element={<MyPostListPage />}
      ></Route>
      <Route
        path='/mycounsel/'
        element={<MyConsultListPage />}
      ></Route>
      <Route
        path='/deep/:consultNum'
        element={<DeepPage />}
      ></Route>
      <Route
        path='/freereply/'
        element={<BoardFreeReply />}
      ></Route>
      <Route
        path='/bupbong/'
        element={<Bupbong />}
      ></Route>
      <Route
        path='/faq/'
        element={<FAQPage />}
      ></Route>
      <Route
        path='/mypage/'
        element={<UserModify />}
      ></Route>
      <Route
        path='/mypage/lawyer/'
        element={<LawyerModify />}
      ></Route>
      <Route
        path='/counsel/register/'
        element={<OnlineWrite />}
      ></Route>
      <Route
        path='/counsel/detail/'
        element={<DeepWrite />}
      ></Route>
    </Routes>
  );
};

export default RouterIndex;
