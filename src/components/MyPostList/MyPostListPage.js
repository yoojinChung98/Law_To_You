import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Category from '../layout/Category';
import './MyPostListPage.css';
import MyPostForm from './MyPostForm';
import { Pagination } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyPostListPage = () => {
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
  const [clickedCateIdx, setClickedCateIdx] = useState(1);

  const cateClick = (idx) => {
    setClickedCateIdx(idx);
    // setCurrentPage(1);
    switch (idx) {
      case 0:
        loggedUser.mode == 'user'
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

  return (
    <>
      {/** 헤더푸터 제외 가운데정렬로 맞출 클래스 지정을 위해 div 태그로 감쌈 */}
      <div className='page-content-wrapper'>
        <MyPostForm />
        <div className='bottom pagination'>
          <Pagination
            count={10}
            variant='outlined'
            shape='rounded'
          />
        </div>
      </div>
    </>
  );
};

export default MyPostListPage;
