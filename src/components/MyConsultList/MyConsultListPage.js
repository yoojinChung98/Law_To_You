import React, { useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Category from '../layout/Category';
import MyConsultList from './MyConsultList';
import { Pagination } from '@mui/material';

const MyConsultListPage = () => {
  // 카테고리에 주입할 리스트 선언부.(수정불필요)
  const categories = [
    '회원 정보',
    '내가 쓴 글',
    '온라인 상담 내역',
    '법봉 충전',
    '로그아웃',
  ];
  // 클릭된 카테고리의 인덱스값. 가정법률 idx = 17
  const [clickedCateIdx, setClickedCateIdx] = useState(2);

  const cateClick = (idx) => {
    setClickedCateIdx(idx);
    setCurrentPage(1);
  };

  // 페이징버튼 개수
  const [pBtnCnt, setPBtnCnt] = useState();
  // 클릭 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);
  // 카테고리에서 pressed 처리될 리스트의 idx 값.(수정불필요)
  const clickedIdx = 2;

  // 페이지 버튼이 눌릴 때 반응하는 함수 (현재 페이지 값을 바꾸고 해당 중분류의 컨텐트 값을 다시 받아옴)
  const onPageChange = (e, page) => {
    if (page === 0) {
      setCurrentPage(page + 1);
      console.log('현재 페이지는? ', currentPage);
      return;
    }
    // setCurrentPage(page);
    // console.log('onPageChange 함수내부, page = ', page);
    // clickedMidSecIdx === 0
    //   ? pageChangeMidIdx0(page)
    //   : pageChangeGetMidCon(clickedMidSecIdx, page);
  };

  const btnCntCalc = (pageNm) => {
    // 총 개수 / 한 페이지에 띄울 컨텐츠 개수  + 1 => 버튼의 개수
    setPBtnCnt(pageNm / 10 + 1);
  };
  return (
    <>
      <Header />

      {/** 헤더푸터 제외 가운데정렬로 맞출 클래스 지정을 위해 div 태그로 감쌈 */}
      <div className='page'>
        <Category
          categoryList={categories}
          clickedIdx={clickedCateIdx}
          cateClick={cateClick}
          // categorySize={categorySize}
        />

        <div className='page-content-wrapper'>
          <MyConsultList
            currentPage={currentPage}
            setPBtnCnt={setPBtnCnt}
          />
          <div className='bottom pagination'>
            {/* 페이지네이션 props 옆의 링크 참조: https://velog.io/@dkdlel102/MUI-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98-%EC%A0%81%EC%9A%A9-%EB%B0%A9%EB%B2%95-%ED%9B%84%EA%B8%B0 */}
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
      {/* 현재 상태에선 페이지네이션이 푸터한테 먹힘 */}
      <Footer />
    </>
  );
};

export default MyConsultListPage;
