import React, { useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Pagination } from '@mui/material';
import JoinList from './JoinList';

const JoinListPage = () => {
  // 페이징버튼 개수
  const [pBtnCnt, setPBtnCnt] = useState(1);
  // 클릭 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지 버튼 클릭 시의 로직
  const onPageChange = (e, page) => {
    setCurrentPage(page);
    return;
  };

  return (
    <>
      {/** 헤더푸터 제외 가운데정렬로 맞출 클래스 지정을 위해 div 태그로 감쌈 */}
      <div className='page'>
        <div className='page-content-wrapper'>
          <JoinList
            setPBtnCnt={setPBtnCnt}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
          <div className='bottom pagination'>
            <Pagination
              count={pBtnCnt}
              page={currentPage}
              onChange={onPageChange}
              variant='outlined'
              shape='rounded'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinListPage;
