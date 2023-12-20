import logo from './logo.svg';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Fragment } from 'react';
import FAQPage from './components/FAQ/FAQPage';
import MainPage from './components/MainPage';
import UserModify from './components/modify/UserModify';
import LawyerModify from './components/modify/LawyerModify';
import OnlineWrite from './components/write/OnlineWrite';
import DeepWrite from './components/write/DeepWrite';

function App() {
  return (
    <>
      {/* <FAQPage /> */}
      {/* <MainPage /> */}

      {/* 개인정보수정(사용자) */}
      {/* <UserModify /> */}

      {/* 개인정보수정(변호사) */}
      {/* <LawyerModify /> */}

      {/* 깊은 상담 */}
      <DeepWrite />

      {/* 온라인 상담 */}
      {/* <OnlineWrite /> */}
    </>
  );
}

export default App;
