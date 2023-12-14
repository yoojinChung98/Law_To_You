import React from 'react';
import './ConsultPage.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ConsultQBox from './ConsultQBox';
import ConsultABox from './ConsultABox';
import { ConsultABoxWrite } from './ConsultABoxWrite';

const ConsultPage = () => {
  return (
    <>
      <Header />

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

      <Footer />
    </>
  );
};

export default ConsultPage;
