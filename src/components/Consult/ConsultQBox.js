import React, { useState } from 'react';
import './ConsultQBox.css';
import { Box, Button, Modal, Typography } from '@mui/material';

import { createTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF5733',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
  },
});

const ConsultQBox = ({ qContent, aContentList }) => {
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

  const viewImg = (index) => {
    setClickedImgIdx(index);
    handleModalOpen();
  };

  const bToImg = () => {
    let bList = qContent.routes;
    let iUrlList = [];
    bList.map((byteArray) => {
      // 바이트 배열을 Blob 객체로 반환
      let blob = new Blob([byteArray], { type: 'image/jpeg' });
      // Blob 객체를 데이터 URL로 변환
      let imageUrl = URL.createObjectURL(blob);
      iUrlList.push(imageUrl);
    });
    setIUrlList(iUrlList);

    return iUrlList.map((iUrl, index) => (
      <img
        className='previewImg'
        alt='Img'
        src={iUrl}
        onClick={viewImg(index)}
      />
    ));
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
                    src={iUrlList[clickedImgIdx]}
                    style={{ width: 'auto', height: 'auto' }}
                  />
                }
              </Typography>
            </Box>
          </Modal>
        </div>
        {qContent.writer == loggedUser.id && !aContentList && (
          <Button
            className='consult-del-btn'
            variant='outlined'
          >
            삭제하기
          </Button>
        )}
      </div>
    </>
  );
};

export default ConsultQBox;
