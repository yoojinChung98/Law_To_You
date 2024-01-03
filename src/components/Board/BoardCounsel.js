import { Icon } from '@iconify/react';
import { Button, Pagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getCounselListApi } from '../../api/board/CounselWriteApi';
import { useAppSelector } from '../../store';
import '../scss/Board.scss';
import BoardForm from './BoardForm';

const BoardCounsel = () => {
  const [data, setData] = useState({
    // count: "",
    pageInfo: {},
    consultingList: [],
  });

  // 페이징버튼 개수
  const [pBtnCnt, setPBtnCnt] = useState(1);
  // 클릭 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지 버튼 클릭 시의 로직
  const onPageChange = (e, page) => {
    setCurrentPage(page);
    return;
  };

  let params = {
    page: 1,
    size: 10,
  };

  useEffect(() => {
    getCounselListApi(params)
      .then((res) => {
        if (typeof res === 'object') {
          setData(res);
          setPBtnCnt(Math.floor(res.count / 10) + 1);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentPage]);

  const mode = useAppSelector((state) => state.user.mode);

  return (
    <>
      <div className='board'>
        <div className='board-header'>
          <span>온라인상담</span>
          <div>
            사용자가 올린 온라인 상담 문의글에 간략하게 답변을 달 수
            있습니다.답변이 채택된다면 사용자에게 더욱 심도깊은 상담을 이어나갈
            수 있습니다. 답변이 채택되고 상담이 진행된다면 답변 등록 시 입력한
            법봉을 추가로 받으실 수 있습니다.
          </div>
        </div>
      </div>
      <BoardForm
        data={data.consultingList}
        type='counsel'
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
      {mode === 'user' && (
        <div>
          <Button
            className='input-button'
            variant='contained'
          >
            글 작성하기
          </Button>
        </div>
      )}
    </>
  );
};

export default BoardCounsel;
