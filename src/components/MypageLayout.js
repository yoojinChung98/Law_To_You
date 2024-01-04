import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './layout/Header';
import Category from './layout/Category';
import Footer from './layout/Footer';
import { useSelector } from 'react-redux';

const MypageLayout = () => {
  // .css 파일 만들기 실어서 걍 인라인으로 박기 위한 변수
  const myplyoutWrapper = {
    display: 'flex',
    justifyContent: 'center',
    width: '2000px',
    padding: '0xp',
    margin: '0px auto',
  };

  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);

  // 카테고리에 주입할 리스트 선언부.(수정불필요)
  const categories = [
    '회원 정보',
    '내가 쓴 글',
    '온라인 상담 내역',
    '법봉 충전',
    '로그아웃',
  ];

  // 클릭된 카테고리의 인덱스값. 가정법률 idx = 17
  const [clickedCateIdx, setClickedCateIdx] = useState();

  // 카테고리 렌더링 무한 반복을 막기 위해 사용
  const [cateFlag, setCateFlag] = useState(false);

  const cateClick = (idx) => {
    setClickedCateIdx(idx);
    switch (idx) {
      case 0:
        loggedUser.mode === 'user'
          ? navigate('/mypage/user/')
          : navigate('/mypage/lawyer/');
        break;
      case 1:
        navigate('/myfree/');
        break;
      case 2:
        navigate('/mycounsel/');
        break;
      case 3:
        navigate('/bupbong/');
        break;
      default:
        // 여기는 로그아웃 부분. 로그아웃 로직이 연결되도록 해야함.
        break;
    }
  };

  // 클릭된 카테고리가 무엇인지 체크하기 위한 변수와 함수
  const url = window.location.href;
  //(url에서 :3000 이후의 6문자 비교)
  const testFunc = () => {
    let idxF = url.indexOf(':3000') + 5;
    let urlStr = url.substring(idxF, idxF + 6);
    // 무한렌더링을 막기 위해 cateFlag 변수 이용
    //
    if (!cateFlag) {
      switch (urlStr) {
        case '/mypag':
          setClickedCateIdx(0);
          setCateFlag(true);
          break;
        case '/myfre':
          setClickedCateIdx(1);
          setCateFlag(true);
          break;
        case '/mycou':
          setClickedCateIdx(2);
          setCateFlag(true);
          break;
        case '/bupbo':
          setClickedCateIdx(3);
          setCateFlag(true);
          break;
        default:
          setClickedCateIdx(4);
          setCateFlag(true);
          break;
      }
    }
  };

  testFunc();

  return (
    <>
      <Header />
      <div style={myplyoutWrapper}>
        <Category
          categoryList={categories}
          clickedIdx={clickedCateIdx}
          cateClick={cateClick}
        />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MypageLayout;
