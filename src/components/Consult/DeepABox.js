import React, { useState } from 'react';
import './DeepABox.css';
import { Box, Button, Modal, Typography } from '@mui/material';
import { API_BASE_URL } from '../../config/host-config';
import { useSelector } from 'react-redux';

const DeepABox = (ansCont, consultNum, hasDeepA, qContent) => {
  const BASE_URL = API_BASE_URL;
  // const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);
  const [iUrlList, setIUrlList] = useState([]);

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
    width: 400,
    bgcolor: '#ffffff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  // 프리뷰 이미지
  const viewImg = (index) => {
    setClickedImgIdx(index);
    handleModalOpen();
  };

  // // 전달받은 바이트배열을 이미지로 변환시키는 함수
  // const bToImg = () => {
  //   let bList = qContent.routes;
  //   let iUrlList = [];
  //   bList.map((byteArray) => {
  //     // 바이트 배열을 Blob 객체로 반환
  //     let blob = new Blob([byteArray], { type: 'image/jpeg' });
  //     // Blob 객체를 데이터 URL로 변환
  //     let imageUrl = URL.createObjectURL(blob);
  //     iUrlList.push(imageUrl);
  //   });
  //   setIUrlList(iUrlList);

  //   return iUrlList.map((iUrl, index) => (
  //     <img
  //       className='previewImg'
  //       alt='Img'
  //       src={iUrl}
  //       onClick={viewImg(index)}
  //     />
  //   ));
  // };

  // // 전달받은 바이트배열을 이미지로 변환시키는 함수
  // const bToImg = () => {
  //   let bList = qContent.routes;
  //   let iUrlList = [];
  //   bList.map((byteArray) => {
  //     // 바이트 배열을 Blob 객체로 반환
  //     let blob = new Blob([byteArray], { type: 'image/jpeg' });
  //     // Blob 객체를 데이터 URL로 변환
  //     let imageUrl = URL.createObjectURL(blob);
  //     iUrlList.push(imageUrl);
  //   });
  //   setIUrlList(iUrlList);

  //   return iUrlList.map((iUrl, index) => (
  //     <img
  //       className='previewImg'
  //       alt='Img'
  //       src={iUrl}
  //       onClick={viewImg(index)}
  //     />
  //   ));
  // };

  // 전달받은 링크배열을 그냥 이미지 src 로 박아버리는 함수
  const bToImg = () => {
    let bList = qContent.routes;
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

  // 답변이 없는경우 (ansCont = null), 전문 변호사의 다변을 기다리고 있다는 박스가 단 하나만 떠야함.
  const renderAns = () => {
    if (hasDeepA) {
      return (
        <>
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
            {ansCont.content}
          </textarea>

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
                        src={iUrlList[clickedImgIdx]}
                        style={{ width: 'auto', height: 'auto' }}
                      />
                    }
                  </Typography>
                </Box>
              </Modal>
            </div>
          </div>
        </>
      );
    } else {
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
          담당 변호사의 답변을 기다리는 중입니다.
        </span>
      );
    }
  };

  return <>{renderAns()}</>;
};

export default DeepABox;
