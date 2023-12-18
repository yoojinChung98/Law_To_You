import React from 'react';
import FAQBox from './FAQBox';
import './FAQPage.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Category from '../layout/Category';
import { Pagination } from '@mui/material';

const FAQ = () => {
  const categories = ['카테고리1', '카테고리2', '카테고리3', '카테고리4'];
  const clickedIdx = 3;
  return (
    <>
      <Header />

      {/** 헤더푸터 제외 가운데정렬로 맞출 클래스 지정을 위해 div 태그로 감쌈 */}
      <div className='page'>
        <Category
          categoryList={categories}
          clickedIDX={clickedIdx}
        />
        <div className='faq-wrapper'>
          <h1 className='faq-major'>대분류</h1>
          <div className='faq-minor-wrapper'>
            <span className='faq-minor'>전체</span>
            <span className='faq-minor'>1중분류</span>
            <span className='faq-minor'>2중분류중분류중분류</span>
            <span className='faq-minor'>3중분류중분류</span>
            <span className='faq-minor'>4중중분분류류</span>
            <span className='faq-minor'>5중분류</span>
            <span className='faq-minor'>6중분류중분류</span>
            <span className='faq-minor faq-minor-selected'>7선택된 중분류</span>
            <span className='faq-minor'>8중 / 분류</span>
            <span className='faq-minor'>9중분류중분류중분류중분류</span>
            <span className='faq-minor'>10중분류</span>
            <span className='faq-minor'>11중분류중분류</span>
            <span className='faq-minor'>
              12 이정도면걍 한줄로 처리해도 문제 없을듯
            </span>
            <span className='faq-minor'>13중분류</span>
            <span className='faq-minor'>14중분류중분류</span>
            <span className='faq-minor'>15중분류</span>
          </div>
          <FAQBox />
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

export default FAQ;
