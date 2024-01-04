import React, { useState } from 'react';
import './ConsultQBox.css';
import { Box, Button, Modal, Typography } from '@mui/material';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config/host-config';

const ConsultQBox = ({ qContent, aContentList, IsDeep }) => {
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);
  const BASE_URL = API_BASE_URL;
  // const [iUrlList, setIUrlList] = useState([]);

  // 모달창 제어 변수들
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const [clickedImgIdx, setClickedImgIdx] = useState();

  // 모달창 스타일
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#ffffff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const viewImg = (index) => {
    setClickedImgIdx(index);
    handleModalOpen();
  };

  // const bToImg = () => {
  //   let bList = qContent.routes;
  //   console.log('bList는 : ', bList);
  //   let iUrlList = [];
  //   if (bList == null) return null;
  //   bList.map((byteArray) => {
  //     // 바이트 배열을 Blob 객체로 반환
  //     let blob = new Blob([byteArray], { type: 'image/jpeg' });
  //     // Blob 객체를 데이터 URL로 변환
  //     let imageUrl = URL.createObjectURL(blob);
  //     iUrlList.push(imageUrl);
  //     return byteArray;
  //   });
  //   // setIUrlList(iUrlList);

  //   return iUrlList.map((iUrl, index) => (
  //     <img
  //       className='previewImg'
  //       alt='Img'
  //       src={iUrl}
  //       onClick={viewImg(index)}
  //     />
  //   ));
  // };

  const bToImg = () => {
    console.log('qContent의 값은', qContent);
    let bList = qContent.routes;
    console.log('bList는 : ', bList);
    // let iUrlList = [];
    if (bList == null) return null;
    // bList.map((byteArray) => {
    //   // 바이트 배열을 Blob 객체로 반환
    //   let blob = new Blob([byteArray], { type: 'image/jpeg' });
    //   // Blob 객체를 데이터 URL로 변환
    //   let imageUrl = URL.createObjectURL(blob);
    //   iUrlList.push(imageUrl);
    //   return byteArray;
    // });
    // setIUrlList(iUrlList);

    return bList.map((bUrl, index) => (
      <img
        className='previewImg'
        alt='Img'
        src={bUrl}
        onClick={() => viewImg(index)}
      />
    ));
  };

  const deleteQContent = async () => {
    const res = await fetch(
      `${BASE_URL}/mypage/counsel?consultNum=${qContent.consultNum}`,
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      }
    );
    if (res.ok) {
      alert('질문이 삭제되었습니다.');
      navigate('/mycounsel/');
    } else {
      const resText = await res.text();
      console.log('resText는: ', resText);
      alert(resText);
      return;
    }
  };

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
            {qContent.writer}
          </span>
          <span className='cq-title'>{qContent.title}</span>
        </div>
        <div className='consult-q-regdate-wrapper'>
          <span className='regdate'>{qContent.regDate}</span>
        </div>
      </div>

      <p className='consult-q-content-area'>{qContent.content}</p>

      <div className='consult-preview-area'>
        <span>첨부파일</span>
        <div className='preview-box'>
          {bToImg()}
          <Modal
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            style={{
              backgroundColor: 'rgb(250,250,250,0.5)',
            }}
          >
            <Box sx={modalStyle}>
              <Typography
                id='modal-modal-description'
                sx={{ mt: 2 }}
              >
                {
                  <img
                    alt='img'
                    src={qContent.routes[clickedImgIdx]}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                }
              </Typography>
            </Box>
          </Modal>
        </div>
        {qContent.writer == loggedUser.name &&
          aContentList == null &&
          !IsDeep && (
            <Button
              className='consult-del-btn'
              variant='outlined'
              onClick={() => deleteQContent()}
            >
              삭제하기
            </Button>
          )}
      </div>
    </>
  );
};

export default ConsultQBox;
