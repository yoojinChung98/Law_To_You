import React, { useRef } from 'react';
import './ConsultABoxWrite.css';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { REGISTER } from 'redux-persist';
import { API_BASE_URL } from '../../config/host-config';
import { useNavigate } from 'react-router-dom';

export const ConsultABoxWrite = ({ consultNum }) => {
  const loggedUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const BASE_URL = API_BASE_URL;

  // 짧은 답변 textarea 태그 내부값을 가져오기 위한 useRef
  const shortAnsRef = useRef(null);
  const reqHammerRef = useRef(10);

  const regist = async () => {
    let reqHammer =
      reqHammerRef.current.value === ''
        ? 10
        : parseInt(reqHammerRef.current.value, 10);

    console.log('변경후 reqHammer : ', reqHammer);
    console.log('shortAns: ', shortAnsRef.current.value);

    let res = await fetch(`${BASE_URL}/answer/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        consultNum: consultNum,
        shortAns: shortAnsRef.current.value,
        reqHammer: reqHammer,
      }),
    });

    if (res.status == 200) {
      alert('답변 등록이 완료되었습니다.');
      navigate(`/counsel/detail/${consultNum}`);
    } else {
      // 변호사가 아니거나 등록한 적이 없다면 여기 컴포넌트가 안뜨도록해서... 이게.. 왜... 에러가 뜨는지 확인해봐야함.
      const resText = await res.text();
      alert(resText);
    }
  };

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
          ref={shortAnsRef}
        ></textarea>

        <div className='consult-gavel-area'>
          <span className='gavel-info'>깊은 상담 시 법봉 개수</span>
          <input
            className='input-gavel-num'
            placeholder='10'
            ref={reqHammerRef}
          ></input>
          <span className='gavel-num'>개</span>
          <Button
            className='consult-adopt-btn'
            variant='contained'
            onClick={() => regist()}
          >
            답변등록하기
          </Button>
        </div>
      </div>
    </>
  );
};
