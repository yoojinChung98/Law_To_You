import { Button } from '@mui/material';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/host-config';
import '../scss/Board.scss';

const URL = API_BASE_URL;

const CounselWrite = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: '',
    content: '',
    largeSection: '가정법률',
  });

  const fileInput = useRef(null);

  const titleOnchangeEventHandler = (e) => {
    setData({ ...data, title: e.target.value });
  };
  const contentOnchangeEventHandler = (e) => {
    setData({ ...data, content: e.target.value });
  };
  const selectionOnchangeEventHandler = (e) => {
    setData({ ...data, largeSection: e.target.value });
    console.log(e.target.value);
  };
  const fileOnChangeEventHandler = (e) => {
    setData({ ...data, file: e.target.files[0] });
  };
  const counselregisthandler = () => {
    let params = {
      title: data.title,
      content: data.content,
      largeSection: data.largeSection,
    };
    console.log('params:', params);

    let formData = new FormData();

    let files = document.getElementById('files').files;
    console.log('files: ', files);
    const paramsJsonBlob = new Blob([JSON.stringify(params)], {
      type: 'application/json',
    });
    formData.append('requestDTO', paramsJsonBlob);

    for (let file of files) {
      console.log('file: ', file);
      formData.append('files', file);
    }

    fetch(`${URL}/counsel/register`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (typeof result === 'object') {
          alert('일반상담등록!');
          navigate(`/counsel/write`);
        } else {
          console.error(result.error);
        }
      });
  };
  const counselcancelhandler = () => {};

  return (
    <div className='board'>
      <div className='board-header'>
        <span>온라인 상담</span>
        <div>
          상담받고 싶은 내용을 입력하여 여러 전문 변호사에게 브리핑을 받아볼 수
          있습니다. 질문에 달린 브리핑 중 마음에 드는 답변을 하나 골라 해당
          변호사와 더욱 깊은 상담을 나누실 수 있습니다. 온라인 상담 등록 시,
          법봉 1개가 차감되며 답변마다 요구되는 법봉의 개수는 달라질 수
          있습니다.
        </div>
      </div>
      <div className='form-layout'>
        <div className='form-title'>
          <span>제목</span>
          <input
            placeholder='상담 제목을 입력해주세요'
            onChange={titleOnchangeEventHandler}
          ></input>
        </div>
        <div className="form-faq-category">
          <span className="categorize-index">분류</span>
        <div className='form-faq-category'>
          <span className='categorize-index'>분류</span>
          <select
            onChange={selectionOnchangeEventHandler}
            className="faq-selection"
            className='faq-selection'
            // className='groupinputplaceholder'
            // onFocus={() => {
            //   setIsGroupInputClicked(true);
            // }}
            // onBlur={() => {
            //   setIsGroupInputClicked(false);
            // }}
          >
            {/* <option
              value=''
              disabled
              selected
            >
              {isGroupInputClicked === true ? '' : '대분류'}
            </option> */}
            <option value='가정법률'>가정법률</option>
            <option value='교통/운전'>교통/운전</option>
            <option value='국가 및 지자체'>국가 및 지자체</option>
            <option value='국방/보훈'>국방/보훈</option>
            <option value='근로/노동'>근로/노동</option>
            <option value='금융/금전'>금융/금전</option>
            <option value='무역/출입국'>무역/출입국</option>
            <option value='문화/여가생활'>문화/여가생활</option>
            <option value='민형사/소송'>민형사/소송</option>
            <option value='복지'>복지</option>
            <option value='사업'>사업</option>
            <option value='사회안전/범죄'>사회안전/범죄</option>
            <option value='소비자'>소비자</option>
            <option value='아동청소년/교육'>아동청소년/교육</option>
            <option value='정보통신/기술'>정보통신/기술</option>
            <option value='창업'>창업</option>
            <option value='환경/에너지'>환경/에너지</option>
          </select>
          <Button
            variant='contained'
            className='faq-browse'
          >
            법률 백문백답 보러가기
          </Button>
        </div>
        <div className='form-content'>
          <span>내용</span>
          <textarea
            placeholder="상담 내용을 입력해주세요
          <textarea
            placeholder='상담 내용을 입력해주세요
상담 내용 등록 시 법봉 1개가 차감되며 등록 이후 수정이 불가능한 점 유의해주세요.
변호사 답변 채택 후, 깊은 상담을 이어갈 시 상담 내용은 1회 수정 가능합니다.'
            onChange={contentOnchangeEventHandler}
          ></textarea>
        </div>
        <div className='form-attach'>
          <span>첨부파일</span>
          <input
            ref={fileInput}
            type='file'
            id='files'
            multiple
            onChange={fileOnChangeEventHandler}
          ></input>
        </div>
        <div className='counsel-btn'>
          <Button
            className='counsel-regist-btn'
            onClick={counselregisthandler}
          >
            등록하기
          </Button>
          <Button
            className='counsel-cancel-btn'
            onClick={counselcancelhandler}
          >
            취소하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CounselWrite;
