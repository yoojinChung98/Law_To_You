import React from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Category from '../layout/Category';
import './MyPostListPage.css';
import MyPostForm from './MyPostForm';
import { Pagination } from '@mui/material';

const MyPostListPage = () => {
  // 카테고리에 주입할 리스트 선언부.(수정불필요)
  const categories = [
    '회원 정보',
    '내가 쓴 글',
    '온라인 상담 내역',
    '법봉 충전',
    '로그아웃',
  ];
  // 카테고리에서 pressed 처리될 리스트의 idx 값.(수정불필요)
  const clickedIdx = 1;
  return (
    <>
      <Header />

      {/** 헤더푸터 제외 가운데정렬로 맞출 클래스 지정을 위해 div 태그로 감쌈 */}
      <div className='page'>
        <Category
          categoryList={categories}
          clickedIDX={clickedIdx}
        />
        <div className='page-content-wrapper'>
          <MyPostForm />
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

export default MyPostListPage;
