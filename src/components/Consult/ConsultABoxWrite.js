import React from 'react';
import './ConsultABoxWrite.css';
import { Button } from '@mui/material';

export const ConsultABoxWrite = () => {
  return (
    <>
      <div className='consult-a-box'>
        <div className='consult-aw-title-area'>
          <h3 className='h32'>간단한 답변을 남겨주세요</h3>
        </div>

        <textarea
          className='consult-aw-content-area'
          placeholder='상담자의 상담 내역에 관련한 간단한 답변을 남겨주세요.
          상담자가 입력된 상담 내용을 보고 답변을 채택하면 해당 상담자와 보다 심도 깊은 상담을 진행할 수 있습니다.
          또한 채택이 완료된 후 깊은 상담에 자세한 상담을 남겨주시면 하단에 입력한 법봉의 개수만큼 법봉을 지급받으실 수 있습니다.'
        ></textarea>

        <div className='consult-gavel-area'>
          <span className='gavel-info'>깊은 상담 시 법봉 개수</span>
          <input
            className='input-gavel-num'
            placeholder='10'
          ></input>
          <span className='gavel-num'>개</span>
          {/* 여기 조건부렌더링 (채택버튼은 일반회원 O, 변호사 X) */}
          <Button
            className='consult-adopt-btn'
            variant='contained'
          >
            답변등록하기
          </Button>
        </div>
      </div>
    </>
  );
};
