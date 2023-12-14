import React from 'react';
import './DeepABox.css';
import { Button } from '@mui/material';

const DeepABox = () => {
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
              담당 변호사의 답변을 기다리는 중입니다.
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
        </div>
      </div>
    </>
  );
};

export default DeepABox;
