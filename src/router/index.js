import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import BoardCounsel from "../components/Board/BoardCounsel";
import BoardFree from "../components/Board/BoardFree";
import BoardFreeReply from "../components/Board/BoardFreeReply";
import BoardFreeWrite from "../components/Board/BoardFreeWrite";
import Bupbong from "../components/Bupbong/Bupbong";
import ConsultPage from "../components/Consult/ConsultPage";
import DeepPage from "../components/Consult/DeepPage";
import FAQPage from "../components/FAQ/FAQPage";
import JoinMain from "../components/Join/JoinMain";
import JoinListPage from "../components/JoinList/JoinListPage";
import LoginMain from "../components/Login/LoginMain";
import MainLayout from "../components/MainLayout";
import MainPage from "../components/MainPage";
import MyConsultListPage from "../components/MyConsultList/MyConsultListPage";
import MyPostListPage from "../components/MyPostList/MyPostListPage";
import LawyerModify from "../components/modify/LawyerModify";
import UserModify from "../components/modify/UserModify";

import CounselDeepWrite from "../components/Board/CounselDeepWrite";
import CounselWrite from "../components/Board/CounselWrite";
import KakaoLoginHandler from "../components/Login/KakaoLoginHandler";
import NaverLoginHandler from "../components/Login/NaverLoginHandler";
import MypageLayout from "../components/MypageLayout";
import Policy from "../components/layout/Policy";
import "../index.css";
import commUtil from "../util/commUtil";
const RouterIndex = () => {
  const isLogin = commUtil.isNotEmpty(localStorage.getItem("accessToken"));

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLogin) {
      navigate("login");
    } else {
      if (location.pathname === "/login") {
        navigate("/");
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/policy/:pIdx" element={<Policy />} />
      <Route path="/login/" element={<LoginMain />} />
      <Route path="/join/" element={<JoinMain />} />
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/*" element={<></>}></Route>
      <Route path="/joinlist/" element={<JoinListPage />} />

      {/* 메인 레이아웃 (헤더, 푸터) */}
      <Route element={<MainLayout />}>
        <Route path="/naverLogin/redirect" element={<NaverLoginHandler />} />
        <Route path="/oauth/redirected/kakao" element={<KakaoLoginHandler />} />
        <Route path="/faq/" element={<FAQPage />}></Route>
        <Route path="/counsel/" element={<BoardCounsel />}></Route>
        <Route path="/free/" element={<BoardFree />}></Route>
        <Route path="/freewrite/" element={<BoardFreeWrite />}></Route>
        <Route path="/freereply/" element={<BoardFreeReply />}></Route>
        <Route
          path="/counsel/detail/:consultNum"
          element={<ConsultPage />}
        ></Route>
        <Route path="/counsel/write/" element={<CounselWrite />}></Route>
        <Route
          path="/counsel/deep/:consultNum"
          element={<CounselDeepWrite />}
        ></Route>
      </Route>

      {/* 마이페이지 레이아웃(헤더, 푸터, 마이페이지카테고리 )*/}
      <Route path="/" element={<MypageLayout />}>
        <Route path="/mypage/user/" element={<UserModify />}></Route>
        <Route path="/mypage/lawyer/" element={<LawyerModify />}></Route>
        <Route path="/myfree/" element={<MyPostListPage />}></Route>
        <Route path="/mycounsel/" element={<MyConsultListPage />}></Route>
        <Route path="/deep/:consultNum" element={<DeepPage />}></Route>
        <Route path="/bupbong/" element={<Bupbong />}></Route>
      </Route>
    </Routes>
  );
};

export default RouterIndex;
