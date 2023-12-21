import React, { useEffect, useState } from 'react';
import FAQBox from './FAQBox';
import './FAQPage.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Category from '../layout/Category';
import { Pagination } from '@mui/material';

const FAQ = () => {
  const categories = [
    '가정법률',
    '교통/운전',
    '국가 및 지자체',
    '국방/보훈',
    '근로/노동',
    '금융/금전',
    '무역/출입국',
    '문화/여가생활',
    '민형사/소송',
    '복지',
    '부동산/임대차',
    '사업',
    '사회안전/범죄',
    '소비자',
    '아동청소년/교육',
    '정보통신/기술',
    '창업',
    '환경/에너지', // 얘가 idx 0 을 갖게 될 것.
  ];

  let categorySize = categories.length - 1;

  // 클릭된 카테고리의 인덱스값. 가정법률 idx = 17
  const [clickedCateIdx, setClickedCateIdx] = useState(17);
  // 중분류 박스에 들어갈 중분류문자열의 배열.
  const [midSecList, setMidSecList] = useState([
    '중분류',
    '중분류',
    '중분류',
    '중분류',
    '중분류',
    '중분류',
    '중분류',
    '중분류',
    '중분류',
    '중분류',
    '중분류',
    '중분류',
  ]);
  // 클릭된 중분류의 인덱스값, 전체idx = 0, 첫번째 중분류idx = 1
  const [clickedMidSecIdx, setClickedMidSecIdx] = useState(0);
  // faqBox에 들어갈 실제 백문백답의 내용 리스트
  const [contentList, setContentList] = useState([
    // page, size 값은 사용하지 않으므로 걍 삭제해도 무방.
    {
      page: 1,
      size: 10,
      middleSection: '중분류1',
      subject: '제목1',
      question: '상세질문1',
      answer: '상세답변1',
    },
    {
      page: 1,
      size: 10,
      middleSection: '중분류3',
      subject: '제목2',
      question: '상세질문2',
      answer: '상세답변2',
    },
    {
      page: 1,
      size: 10,
      middleSection: '중분류3',
      subject: '제목3',
      question: '상세질문3',
      answer: '상세답변3',
    },
    {
      page: 1,
      size: 10,
      middleSection: '중분류2',
      subject: '제목4',
      question: '상세질문4',
      answer: '상세답변4',
    },
    {
      page: 1,
      size: 10,
      middleSection: '중분류1',
      subject: '제목5',
      question: '상세질문5',
      answer: '상세답변5',
    },
    {
      page: 1,
      size: 10,
      middleSection: '중분류4',
      subject: '제목6',
      question: '상세질문6',
      answer: '상세답변6',
    },
    {
      page: 1,
      size: 10,
      middleSection: '중분류4',
      subject: '제목7',
      question: '상세질문7',
      answer: '상세답변7',
    },
    {
      page: 1,
      size: 10,
      middleSection: '중분류5',
      subject: '제목8',
      question: '상세질문8',
      answer: '상세답변8',
    },
    {
      page: 1,
      size: 10,
      middleSection: '중분류2',
      subject: '제목9',
      question: '상세질문9',
      answer: '상세답변9',
    },
    {
      page: 1,
      size: 10,
      middleSection: '중분류3',
      subject: '제목10',
      question: '상세질문10',
      answer: '상세답변10',
    },
  ]);
  // 클릭 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);

  const cateClick = (idx) => {
    // 상단 카테고리의 개수가 18개이기 때문에 17- 로 걍 썼음.
    setClickedCateIdx(categorySize - idx);
    setClickedMidSecIdx(0);

    getMidSecContent(idx);
  };

  // 대분류 클릭 시, 중분류 리스트를 fetch api로 요청/응답 받고 중리스트(midSecList)를 셋(재렌더링됨)함.
  const getMidSecContent = async (idx) => {
    // setMidSecList(['바뀐중분류', '바뀐중분류', '바뀐중분류', '바뀐중분류']);
    // console.log('getMidSecContent가 받아온 idx: ', idx);
    let largeSection = categories[idx].substring(0, 2);
    // console.log(largeSection);
    const res = await fetch(`http://localhost:8181/api/faq/${largeSection}`);
    if (res.status === 200) {
      setMidSecList(res.json()[0]);
      console.log('midSecList의 리스트는(FAQPage147행): ', midSecList);
      setContentList(res.json()[1]);
      console.log('contentList의 리스트는(FAQPage149행): ', contentList);
    } else if (res.status === 400) {
      alert('요청 중 badRequest() 에러 발생', res.json().message);
    }
  };

  // 중분류 클릭 시, 클릭된 중분류에 해당하는 컨텐트 내용만 받아오는 함수
  const getContentByMidSec = async (idx) => {
    console.log('getMidSecContent가 받아온 idx: ', idx);
    let largeSection = categories[clickedCateIdx].substring(0, 2);
    console.log(largeSection);
    let middleSection = midSecList[idx];
    console.log('middleSection의 값: ', middleSection);
    const res = await fetch(
      `http://localhost:8181/api/faq/${largeSection}/${middleSection}?pno=${currentPage}`
    );
    if (res.status === 200) {
      setContentList(res.json());
      console.log('contentList의 리스트는(FAQPage176행): ', contentList);
    } else if (res.status === 400) {
      alert('요청 중 badRequest() 에러 발생', res.json().message);
    }
  };

  // 중분류박스 내용 렌더링하는 함수
  // 이 부분 useEffect에 넣어서 최초 1회 첫번째 대분류에 해당하는 전체. 엥?? 근데 전체면 어떤 요청을 보내야함?
  const rendermidSecList = () => {
    return midSecList.map((midSec, index) => (
      <span
        key={index + 1}
        className={
          index + 1 === clickedMidSecIdx
            ? 'faq-minor faq-minor-selected'
            : 'faq-minor'
        }
        onClick={() => {
          setClickedMidSecIdx(index + 1);
        }}
      >
        {midSec}
        {index}
      </span>
    ));
  };

  // 컨텐트 내용을 렌더링 하는 함수

  const onPageChange = (e, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    //처음 들어올 때, 0번째 카테고리로 요청 한 번 보내서 값을 가져오긴 해야할 듯?
    cateClick(0);
  }, []); // 중분류 변경 시도 추가

  return (
    <>
      <Header />

      {/** 헤더푸터 제외 가운데정렬로 맞출 클래스 지정을 위해 div 태그로 감쌈 */}
      <div className='page'>
        <Category
          categoryList={categories}
          clickedIdx={clickedCateIdx}
          cateClick={cateClick}
          categorySize={categorySize}
        />
        <div className='faq-wrapper'>
          <h1 className='faq-major'>대분류</h1>
          <div className='faq-minor-wrapper'>
            <span
              key={0}
              className={
                0 === clickedMidSecIdx
                  ? 'faq-minor faq-minor-selected'
                  : 'faq-minor'
              }
              onClick={() => {
                setClickedMidSecIdx(0);
              }}
            >
              전체
            </span>
            {rendermidSecList()}
          </div>
          <FAQBox
            contentList={contentList}
            currentPage={currentPage}
          />
          <div className='bottom pagination'>
            {/* 페이지네이션 props 옆의 링크 참조: https://velog.io/@dkdlel102/MUI-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98-%EC%A0%81%EC%9A%A9-%EB%B0%A9%EB%B2%95-%ED%9B%84%EA%B8%B0 */}
            <Pagination
              count={10}
              // page={currentPage}
              onChange={onPageChange}
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
