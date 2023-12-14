import React from 'react';
import './ConsultABox.css';
import { Button } from '@mui/material';

const ConsultABox = () => {
  return (
    <>
      <div className='consult-a-box'>
        {/* 만일 답변이 존재하지 않는 경우 하단의 span 태그만 나오도록 설정 */}
        {/* <span
          style={{
            display: 'block',
            fontFamily: 'SDSamliphopangche_Basic',
            fontSize: '28x',
            textAlign: 'center',
            margin: '80px 20px 80px 20px',
          }}
        >
          전문 변호사의 답변을 기다리는 중입니다.
        </span> */}

        <div className='consult-a-title-area'>
          <img
            className='QAIcon'
            alt=''
            src={require('../../assets/img/Consultation_A.png')}
          />
          <div className='consult-a-title-wrapper'>
            <span className='laywer-name'>이제현 변호사</span>
          </div>
          <div className='consult-a-regdate-wrapper'>
            <span className='regdate'>2023-12-05</span>
          </div>
        </div>

        {/* <p className='consult-a-content-area'>
          작성된 답변글 내용 여기도 그냥 textarea
        </p> */}
        <textarea
          className='consult-a-content-area'
          readOnly='true'
        >
          여기는 작성된 답변이 입력되는 공간입니다
        </textarea>

        <div className='consult-gavel-area'>
          <span className='gavel-info'>깊은 상담 시 법봉 개수</span>
          <span className='gavel-num'>10개</span>
          {/* 여기 조건부렌더링 (채택버튼은 일반회원 O, 변호사 X) */}
          <Button
            className='consult-adopt-btn'
            variant='contained'
          >
            답변채택하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default ConsultABox;
