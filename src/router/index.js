import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import BoardCounsel from "../components/Board/BoardCounsel";
import BoardFree from "../components/Board/BoardFree";
import BoardFreeReply from "../components/Board/BoardFreeReply";
import BoardFreeWrite from "../components/Board/BoardFreeWrite";
import Bupbong from "../components/Bupbong/Bupbong";
import JoinMain from "../components/Join/JoinMain";
import LoginMain from "../components/Login/LoginMain";
import MainPage from "../components/MainPage";
import commUtil from "../util/commUtil";
import MainLayout from "./MainLayout";

const RouterIndex = () => {
  const isLogin = commUtil.isNotEmpty(localStorage.getItem("accessToken"));

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    } else {
      if (location.pathname === "/login") {
        navigate("/");
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/login/" element={<LoginMain />} />
      <Route path="/join/" element={<JoinMain />} />
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/*" element={<></>}></Route>
      <Route element={<MainLayout />}>
        <Route path="/counsel/" element={<BoardCounsel />}></Route>
        <Route path="/free/" element={<BoardFree />}></Route>
        <Route path="/freewrite/" element={<BoardFreeWrite />}></Route>
        <Route path="/freereply/" element={<BoardFreeReply />}></Route>
        <Route path="/bupbong/" element={<Bupbong />}></Route>
      </Route>
    </Routes>
  );
};

export default RouterIndex;
