import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ConsultQBox from './ConsultQBox';
import './DeepPage.css';
import DeepABox from './DeepABox';
import DeepABoxWrite from './DeepABoxWrite';
import { useParams } from 'react-router-dom';

const DeepPage = () => {
  // 깊은 페이지로 들어올 때 해당하는 consultNum 을 파라미터로 함께 보냄
  let consultNum = useParams();
  return (
    <>
      <div className='page'>
        <div className='consult-wrapper'>
          {/* 1. 사용자계정 : ConsultQBox 에 삭제버튼 X
              2. 변호사계정 : 아직 답변을 달지 않았다면 <DeepABoxWriter />
              답변을 달았다면 <DeepABox />/*}

          {/*  ------------------- 사용자 질문 박스 -------------------------- */}
          <ConsultQBox />

          {/* -------------------- 답변 조회/등록 박스 --------------------- */}
          {/* 조건부 렌더링 필요: 변호사의 답변 등록 유무 */}
          <DeepABox />
          {/* <DeepABoxWrite /> */}
        </div>
      </div>
    </>
  );
};

export default DeepPage;
