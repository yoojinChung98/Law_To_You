import React from 'react';
import './ConsultABox.css';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../config/host-config';
import { useNavigate } from 'react-router';

const ConsultABox = ({ ansCont, userWriter, consultNum, existAdopted }) => {
  const BASE_URL = API_BASE_URL;
  // const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  // 답변이 없는경우 (ansCont = null), 전문 변호사의 다변을 기다리고 있다는 박스가 단 하나만 떠야함.
  const renderNoAns = () => {
    return (
      <span
        style={{
          display: 'block',
          fontFamily: 'SDSamliphopangche_Basic',
          fontSize: '28x',
          textAlign: 'center',
          margin: '80px 20px 80px 20px',
        }}
      >
        전문 변호사의 답변을 기다리는 중입니다.
      </span>
    );
  };

  // 채택하기 버튼을 누르면 채택 요청이 가는 함수
  const adoptAns = async () => {
    let res = await fetch(
      `${BASE_URL}/answer/adopt?answerNum=${ansCont.answerNum}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      }
    );

    if (res.status == 200) {
      alert(
        '답변이 채택되었습니다. 깊은 상담은 마이페이지에서 등록할 수 있습니다.'
      );
      navigate(`/counsel/detail/${consultNum}`);
    } else {
      // 응답코드 상태가 나뉘어있다면 에러코드에 따라 답변이 다르면 좋을 듯!
      alert('해당 답변을 채택할 수 없습니다.');
    }
  };

  // 답변이 있는 경우 답변채택카드 렌더링
  const renderAns = () => {
    console.log('renderAns 함수 호출');
    console.log('userWriter의 값은: ', userWriter);
    let userIsWriter = loggedUser.name === userWriter ? true : false;
    const adoptBtn =
      userIsWriter && !existAdopted ? (
        <Button
          className='consult-adopt-btn'
          variant='contained'
          onClick={() => adoptAns()}
        >
          답변채택하기
        </Button>
      ) : null;
    console.log('adoptBtn의 값은 ', adoptBtn);

    return (
      <>
        <div className='consult-a-title-area'>
          <img
            className='QAIcon'
            alt=''
            src={require('../../assets/img/Consultation_A.png')}
          />
          <div className='consult-a-title-wrapper'>
            <span className='laywer-name'>{ansCont.writer} 변호사</span>
          </div>
          <div className='consult-a-regdate-wrapper'>
            <span className='regdate'>{ansCont.regDate}</span>
          </div>
        </div>

        <textarea
          className='consult-a-content-area'
          readOnly='true'
        >
          {ansCont.shortAns}
        </textarea>

        <div className='consult-gavel-area'>
          <span className='gavel-info'>깊은 상담 시 법봉 개수</span>
          <span className='gavel-num'>{ansCont.reqHammer}개</span>
          {adoptBtn}
        </div>
      </>
    );
  };

  return (
    <>
      <div className='consult-a-box'>
        {ansCont == null ? renderNoAns() : renderAns()}
      </div>
    </>
  );
};

export default ConsultABox;
