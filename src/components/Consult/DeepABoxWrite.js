import { Button } from '@mui/material';
import React from 'react';
import './DeepABoxWrite.css';

const DeepABoxWrite = () => {
  return (
    <>
      <div className='consult-a-box'>
        <div className='consult-aw-title-area'>
          <h3 className='h32'>상세한 답변을 남겨주세요</h3>
        </div>

        <textarea
          className='consult-aw-content-area'
          placeholder='기존에 입력했던 일반 상담의 내용과 일관성을 띈 자세한 답변을 남겨주세요.
          7일 이내 등록을 완료하지 않을 시, 일반 상담 답변 채택은 취소되며 더이상 깊은 상담의 답변을 남기실 수 없습니다.
          깊은 상담 답변을 등록한 뒤에는 내용을 수정할 수 없습니다.
          등록이 완료되고 나면 일반 상담 답변 등록 시 입력했던 법봉의 개수만큼 법봉을 지급받으실 수 있습니다.'
        ></textarea>

        <div className='consult-preview-area'>
          <span>첨부파일</span>
          <div className='preview-box'>
            <img
              className='previewImg'
              alt='Img'
              src={require('../../assets/img/add-file.png')}
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
            className='consult-adopt-btn'
            variant='contained'
          >
            등록하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeepABoxWrite;
