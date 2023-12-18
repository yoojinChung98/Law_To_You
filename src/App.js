import logo from './logo.svg';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Fragment } from 'react';
import FAQPage from './components/FAQ/FAQPage';
import MainPage from './components/MainPage';
import ConsultPage from './components/Consult/ConsultPage';
import DeepPage from './components/Consult/DeepPage';
import MyConsultListPage from './components/MyConsultList/MyConsultListPage';
import MyPostListPage from './components/MyPostList/MyPostListPage';
import JoinList from './components/JoinList/JoinListPage';

function App() {
  return (
    <>
      {/* <FAQPage /> */}
      {/* <MainPage /> */}
      {/* <ConsultPage /> */}
      {/* <DeepPage /> */}
      <MyConsultListPage />
      {/* <MyPostListPage /> */}
      {/* <JoinList /> */}
    </>
  );
}

export default App;
