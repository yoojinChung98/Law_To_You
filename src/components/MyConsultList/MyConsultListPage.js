import React, { useState } from 'react';
import MyConsultList from './MyConsultList';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MyConsultListPage = () => {
  const navigate = useNavigate();

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
    // setCurrentPage(page);
    // console.log('onPageChange 함수내부, page = ', page);
    // clickedMidSecIdx === 0
    //   ? pageChangeMidIdx0(page)
    //   : pageChangeGetMidCon(clickedMidSecIdx, page);
  };

  // const btnCntCalc = (pageNm) => {
  //   // 총 개수 / 한 페이지에 띄울 컨텐츠 개수  + 1 => 버튼의 개수
  //   setPBtnCnt(pageNm / 10 + 1);
  // };
  return (
    <>
      <div className='page-content-wrapper'>
        <MyConsultList
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

export default MyConsultListPage;
