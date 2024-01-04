import React, { useState } from 'react';
import './DeepABox.css';
import { Box, Button, Modal, Typography } from '@mui/material';
import { API_BASE_URL } from '../../config/host-config';
import { useSelector } from 'react-redux';

const DeepABox = ({ ansCont, consultNum, hasDeepA, qContent }) => {
  const BASE_URL = API_BASE_URL;
  // const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);

  // 답변이 없는경우 (ansCont = null), 전문 변호사의 다변을 기다리고 있다는 박스가 단 하나만 떠야함.
  const renderAns = () => {
    console.log('renderAns함수 호출, hasDeepA의 값은: ', hasDeepA);
    if (hasDeepA) {
      return (
        <div className='consult-a-box'>
          <div className='consult-a-title-area'>
            <img
              className='QAIcon'
              alt=''
              src={require('../../assets/img/Consultation_A.png')}
            />
            <div className='consult-a-title-wrapper'>
              <span className='laywer-name'>{ansCont.writer}</span>
            </div>
            <div className='consult-a-regdate-wrapper'>
              <span className='regdate'>{ansCont.regDate}</span>
            </div>
          </div>

          <textarea
            className='consult-a-content-area'
            readOnly='true'
          >
            {ansCont.detailedAns}
          </textarea>
        </div>
      );
    } else {
      return (
        <div className='consult-a-box'>
          <span
            style={{
              display: 'block',
              fontFamily: 'SDSamliphopangche_Basic',
              fontSize: '28x',
              textAlign: 'center',
              margin: '80px 20px 80px 20px',
            }}
          >
            담당 변호사의 답변을 기다리는 중입니다.
          </span>
        </div>
      );
    }
  };

  return <>{renderAns()}</>;
};

export default DeepABox;
