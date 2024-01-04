import './MyPostListPage.css';
import MyPostForm from './MyPostForm';
import { Pagination } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyPostListPage = () => {
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);

  // 페이징버튼 개수
  const [pBtnCnt, setPBtnCnt] = useState();
  // 클릭 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지 버튼이 눌릴 때 반응하는 함수 (현재 페이지 값을 바꾸고 해당 중분류의 컨텐트 값을 다시 받아옴)
  const onPageChange = (e, page) => {
    if (page === 0) {
      setCurrentPage(page + 1);
      console.log('현재 페이지는? ', currentPage);
      return;
    }
  };

  return (
    <>
      {/** 헤더푸터 제외 가운데정렬로 맞출 클래스 지정을 위해 div 태그로 감쌈 */}
      <div className='page-content-wrapper'>
        <MyPostForm
          currentPage={currentPage}
          setPBtnCnt={setPBtnCnt}
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
    </>
  );
};

export default MyPostListPage;
