import { Icon } from '@iconify/react';
import { Button, MenuItem, Pagination, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFreeListApi, getFreeSearchApi } from '../../api/board/FreeBoardApi';
import '../scss/Board.scss';
import BoardForm from './BoardForm';

const BoardFree = () => {
  const navigate = useNavigate();

  const [searchVal, setSearchVal] = useState(''); // 검색창 입력값 저장
  const [select, setSelect] = useState('writer'); // 검색창 옵션
  // 페이징버튼 개수
  const [pBtnCnt, setPBtnCnt] = useState(1);
  // 클릭 현재 페이지 번호
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지 버튼 클릭 시의 로직
  const onPageChange = (e, page) => {
    setCurrentPage(page);
    return;
  };

  const [data, setData] = useState({
    count: 0,
    pageInfo: {},
    freeboards: [],
  });

  useEffect(() => {
    let params = {
      page: currentPage,
      size: 10,
    };

    getFreeListApi(params)
      .then((res) => {
        if (typeof res === 'object') {
          setData(res);
          console.log(res);
          console.log(res.count);
          setPBtnCnt(Math.floor(res.count / 10) + 1);
        }
      })
      .catch((e) => {
        setData({
          count: 0,
          pageInfo: {},
          freeboards: [
            {
              bno: 1,
              title: '제목1',
              writer: '작성자1',
              regDate: '2024.01.01',
            },
            {
              bno: 2,
              title: '제목2',
              writer: '작성자2',
              regDate: '2024.01.01',
            },
          ],
        });
      });
  }, [currentPage]);

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  const searchValTarget = async (e) => {
    const searchValue = e.target.value;
    setSearchVal(searchValue);
  };

  const freeSearchBtn = async () => {
    if (!searchVal.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }
    let params = {
      search: searchVal,
      type: select,
    };

    getFreeSearchApi(params).then((res) => {
      if (typeof res === 'object') {
        setData({ ...data, freeboards: res.freeboardDetailResponseDTOS });
        console.log(res.count);
        setPBtnCnt(Math.floor(res.count / 10) + 1);
      }
    });
  };
  return (
    <>
      <div className='board'>
        <div className='board-header'>
          <span>고민나누기</span>
          <div>
            자유게시판 설명 내용 작성하기! 사용자가 올린 온라인 상담 문의글에
            간략하게 답변을 달 수 있습니다.답변이 채택된다면 사용자에게 더욱
            심도깊은 상담을 이어나갈 수 있습니다. 답변이 채택되고 상담이
            진행된다면 답변 등록 시 입력한 법봉을 추가로 받으실 수 있습니다.
          </div>
        </div>
        <Select
          value={select}
          style={{
            left: '330px',
            top: '62px',
            height: '31px',
          }}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value='writer'>작성자</MenuItem>
          <MenuItem value='titleAndContent'>제목 + 내용</MenuItem>
        </Select>
        <div className='search-box'>
          <input
            className='search-input'
            onChange={searchValTarget}
          />
          <Icon
            className='search-button'
            icon='majesticons:search-line'
            color='#675d50'
            onClick={freeSearchBtn}
          />
        </div>
      </div>
      <BoardForm
        setPBtnCnt={setPBtnCnt}
        currentPage={currentPage}
        onPageChange={onPageChange}
        data={data.freeboards}
        type='freeboard'
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
      <div className='button-wrapper'>
        <Button
          className='board-write-btn'
          variant='contained'
          onClick={() => {
            navigate('/freewrite');
          }}
        >
          글 작성하기
        </Button>
      </div>
    </>
  );
};

export default BoardFree;
