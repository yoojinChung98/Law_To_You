import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Pagination } from '@mui/material';
import JoinList from './JoinList';

const JoinListPage = () => {
  return (
    <>
      <Header />

      {/** 헤더푸터 제외 가운데정렬로 맞출 클래스 지정을 위해 div 태그로 감쌈 */}
      <div className='page'>
        <div className='page-content-wrapper'>
          <JoinList />
          <div className='bottom pagination'>
            {/* 페이지네이션 props 옆의 링크 참조: https://velog.io/@dkdlel102/MUI-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98-%EC%A0%81%EC%9A%A9-%EB%B0%A9%EB%B2%95-%ED%9B%84%EA%B8%B0 */}
            <Pagination
              count={10}
              variant='outlined'
              shape='rounded'
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default JoinListPage;
