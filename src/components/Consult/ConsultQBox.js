import React from 'react';
import './ConsultQBox.css';
import { Button } from '@mui/material';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5733',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
  },
});

const ConsultQBox = () => {
  return (
    <>
      <div className='consult-q-title-area'>
        <img
          className='QAIcon'
          alt=''
          src={require('../../assets/img/Consultation_Q.png')}
        />
        <div className='consult-q-title-wrapper'>
          <span
            className='cq-id'
            style={{ textAlign: 'left' }}
          >
            아이디가 들어가는 부분
          </span>
          <span className='cq-title'>질문글 제목이 들어가는 부분입니다.</span>
        </div>
        <div className='consult-q-regdate-wrapper'>
          <span className='regdate'>2023-12-05</span>
        </div>
      </div>

      <p className='consult-q-content-area'>질문글 내용이 들어옵니다.</p>

      <div className='consult-preview-area'>
        <span>첨부파일</span>
        <div className='preview-box'>
          <img
            className='previewImg'
            alt='Img'
            src={require('../../assets/img/DummyImg.png')}
          />
          <img
            className='previewImg'
            alt='Img'
            src={require('../../assets/img/DummyImg.png')}
          />
          <img
            className='previewImg'
            alt='Img'
            src={require('../../assets/img/DummyImg.png')}
          />
        </div>
        {/* 조건부 렌더링 필요: 글을 작성한 사용자 본인에게만 보여줘야함 && 답변이 하나도 달리지 않아야 함 */}
        <Button
          className='consult-del-btn'
          variant='outlined'
        >
          삭제하기
        </Button>
      </div>
    </>
  );
};

export default ConsultQBox;
