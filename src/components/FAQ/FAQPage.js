import React, { useEffect, useState } from 'react';
import FAQBox from './FAQBox';
import './FAQPage.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Category from '../layout/Category';
import { Pagination } from '@mui/material';
import { API_BASE_URL } from '../../config/host-config';

const FAQ = () => {
  const BASE_URL = API_BASE_URL;

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
  const [clickedCateIdx, setClickedCateIdx] = useState(0);
  // 중분류 박스에 들어갈 중분류문자열의 배열.
  const [midSecList, setMidSecList] = useState([]);
  // 클릭된 중분류의 인덱스값, 전체idx = 0, 첫번째 중분류idx = 1
  const [clickedMidSecIdx, setClickedMidSecIdx] = useState(0);
  // faqBox에 들어갈 실제 백문백답의 내용 리스트
  const [contentList, setContentList] = useState([]);
  // 페이징버튼 개수
  const [pBtnCnt, setPBtnCnt] = useState();

  // 클릭 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);

  const cateClick = (idx) => {
    // 여기의 idx 는 렌더링된 카테고리의 최하단부터 0임.
    // 상단 카테고리의 개수가 18개이기 때문에 17- 로 걍 썼음.
    setClickedCateIdx(idx);

    setClickedMidSecIdx(0);
    setCurrentPage(1);

    getMidSecContent(idx);
  };

  const pageChangeMidIdx0 = async (page) => {
    console.log('pageChangeMidIdx0 함수 내부: ');
    let largeSection = encodeURIComponent(
      categories[clickedCateIdx].substring(0, 2)
    );
    const res = await fetch(`${BASE_URL}/faq/${largeSection}?page=${page}`);
    if (res.status === 200) {
      const json = await res.json();
      console.log(json);
      let ms = json.middleSection;
      let lsbls = json.listSearchedByLargeSec;
      // let pageNm = json.요청행개수담은변수명;
      setMidSecList(ms);
      setContentList(lsbls);
      // await btnCntCalc(pageNm); // 행 개수에 맞춰 btn개수를 계산해줄 함수 호출
    } else if (res.status === 400) {
      alert('요청 중 badRequest() 에러 발생', res.json().message);
    } else {
      alert('400 제외 에러 발생');
    }
  };

  // 대분류 클릭 시, 중분류 리스트를 fetch api로 요청/응답 받고 중리스트(midSecList)를 셋(재렌더링됨)함.
  const getMidSecContent = async (idx) => {
    let largeSection = categories[idx].substring(0, 2);
    const res = await fetch(
      `${BASE_URL}/faq/${largeSection}?page=${currentPage}`
    );
    if (res.status === 200) {
      const json = await res.json();
      console.log(json);
      let ms = json.middleSection;
      let lsbls = json.listSearchedByLargeSec;
      // let pageNm = json.요청행개수담은변수명;
      setMidSecList(ms);
      setContentList(lsbls);
      /// await btnCntCalc(pageNm); // 행 개수에 맞춰 btn개수를 계산해줄 함수 호출
    } else if (res.status === 400) {
      alert('요청 중 badRequest() 에러 발생', res.json().message);
    } else {
      alert('400 제외 에러 발생');
    }
  };

  // 중분류 클릭 시, 클릭된 중분류에 해당하는 컨텐트 내용만 받아오는 함수
  const getContentByMidSec = async (idx) => {
    // setCurrentPage(1);
    await onPageChange(0, 0);
    if (idx === 0) {
      getMidSecContent(clickedCateIdx);
      return;
    }

    let largeSection = encodeURIComponent(
      categories[clickedCateIdx].substring(0, 2)
    );
    let middleSection = encodeURIComponent(midSecList[idx - 1]);
    let page = currentPage;
    console.log('4. 요청 보내기 전, page: ', page);
    const res = await fetch(
      `${BASE_URL}/faq/${largeSection}/${middleSection}?page=${page}`
    );
    if (res.status === 200) {
      // 이 부분 data 로 받지 말고 이제 이름으로 받아야 함.
      // log(res.json())으로 먼저 어떤 이름으로 값들이 들어오는지 까봐야 할 듯?
      res.json().then((data) => setContentList(data));
      // await btnCntCalc(pageNm); // 행 개수에 맞춰 btn개수를 계산해줄 함수 호출
    } else if (res.status === 400) {
      alert('요청 중 badRequest() 에러 발생', res.json().message);
    } else {
      alert('400 제외 에러 발생');
    }
  };

  // 중분류박스 내용 렌더링하는 함수
  // 이 부분 useEffect에 넣어서 최초 1회 첫번째 대분류에 해당하는 전체. 엥?? 근데 전체면 어떤 요청을 보내야함?
  const renderMidSecList = () => {
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
          getContentByMidSec(index + 1);
        }}
      >
        {midSec}
      </span>
    ));
  };

  const pageChangeGetMidCon = async (idx, page) => {
    console.log('pageChangeGetMidCon 함수 내부');
    await onPageChange(0, 0);
    let largeSection = encodeURIComponent(
      categories[clickedCateIdx].substring(0, 2)
    );
    let middleSection = encodeURIComponent(midSecList[idx - 1]);
    console.log('요청보내기직전 page 값: ', page);
    const res = await fetch(
      `${BASE_URL}/faq/${largeSection}/${middleSection}?page=${page}`
    );
    if (res.status === 200) {
      // 이 부분 data 로 받지 말고 이제 이름으로 받아야 함.
      // log(res.json())으로 먼저 어떤 이름으로 값들이 들어오는지 까봐야 할 듯?
      let json = res.json();
      console.log(json);
      json.then((data) => setContentList(data));
      // await btnCntCalc(pageNm); // 행 개수에 맞춰 btn개수를 계산해줄 함수 호출
    } else if (res.status === 400) {
      alert('요청 중 badRequest() 에러 발생', res.json().message);
    } else {
      alert('400 제외 에러 발생');
    }
  };

  //

  // 페이지 버튼이 눌릴 때 반응하는 함수 (현재 페이지 값을 바꾸고 해당 중분류의 컨텐트 값을 다시 받아옴)
  const onPageChange = (e, page) => {
    if (page === 0) {
      setCurrentPage(page + 1);
      return;
    }
    setCurrentPage(page);
    console.log('onPageChange 함수내부, page = ', page);
    clickedMidSecIdx === 0
      ? pageChangeMidIdx0(page)
      : pageChangeGetMidCon(clickedMidSecIdx, page);
  };

  const btnCntCalc = (pageNm) => {
    // 총 개수 / 한 페이지에 띄울 컨텐츠 개수  + 1 => 버튼의 개수
    setPBtnCnt(pageNm / 10 + 1);
  };

  useEffect(() => {
    //처음 들어올 때, 0번째 카테고리로 요청 한 번 보내서 값을 가져오긴 해야할 듯?
    // cateClick(0);
    getMidSecContent(clickedCateIdx);
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
                getContentByMidSec(0);
              }}
            >
              전체
            </span>
            {midSecList && renderMidSecList()}
          </div>
          {contentList && (
            <FAQBox
              contentList={contentList}
              currentPage={currentPage}
            />
          )}

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

      <Footer />
    </>
  );
};

export default FAQ;
