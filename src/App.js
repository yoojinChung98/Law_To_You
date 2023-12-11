import logo from './logo.svg';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { Fragment } from 'react';
import FAQPage from './components/FAQ/FAQPage';
import MainPage from './components/MainPage';

function App() {
  return (
    <>
      <FAQPage />
      {/* <MainPage /> */}
    </>
  );
}

export default App;
