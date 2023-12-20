import { Box, Modal, Pagination, Typography, Backdrop } from '@mui/material';
import React, { useState } from 'react';

const JoinList = () => {
  // 변호사 회원가입요청리스트 저장한 변수 (dto객체 배열로 저장될 예정)
  const [lawyerList, setLawyerList] = useState([
    {
      lawyerId: 'abc1234',
      name: '홍길동',
      lawyerNum: 1234,
      attachedFile: 'url',
      approval: false,
    },
    {
      lawyerId: 'abc1234',
      name: '홍길동',
      lawyerNum: 1234,
      attachedFile: 'url',
      approval: true,
    },
    {
      lawyerId: 'abc1234',
      name: '홍길동',
      lawyerNum: 1234,
      attachedFile: 'url',
      approval: false,
    },
    {
      lawyerId: 'abc123444',
      name: '홍길동44',
      lawyerNum: 123444,
      attachedFile: 'url',
      approval: true,
    },
    {
      lawyerId: 'abc1234',
      name: '홍길동',
      lawyerNum: 1234,
      attachedFile: 'url',
      approval: false,
    },
    {
      lawyerId: 'abc1234',
      name: '홍길동',
      lawyerNum: 1234,
      attachedFile: 'url',
      approval: true,
    },
    {
      lawyerId: 'abc1234',
      name: '홍길동',
      lawyerNum: 1234,
      attachedFile: 'url',
      approval: false,
    },
    {
      lawyerId: 'abc1234',
      name: '홍길동',
      lawyerNum: 1234,
      attachedFile: 'url',
      approval: false,
    },
    {
      lawyerId: 'abc1234',
      name: '홍길동',
      lawyerNum: 1234,
      attachedFile: 'url',
      approval: true,
    },
    {
      lawyerId: 'abc1234',
      name: '홍길동',
      lawyerNum: 1234,
      attachedFile: 'url',
      approval: false,
    },
    {
      lawyerId: 'abc1234',
      name: '홍길동',
      lawyerNum: 1234,
      attachedFile: 'url',
      approval: true,
    },
    {
      lawyerId: 'abc1234',
      name: '홍길동',
      lawyerNum: 1234,
      attachedFile: 'url',
      approval: false,
    },
  ]);

  // 모달창 제어 변수들
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

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

  return (
    <div className='board'>
      <h1
        className='title'
        style={{ textAlign: 'center' }}
      >
        변호사 회원가입 요청 목록
        <br />
        <br />
      </h1>
      <table className='board-table'>
        <thead className=''>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>변호사 등록번호</th>
            <th>허가상태</th>
          </tr>
        </thead>
        {lawyerList.map((lawyer, index) => (
          <tbody>
            <tr key={index}>
              <td
                style={{
                  width: '100px',
                  textAlign: 'center',
                  marginLeft: '10px',
                }}
              >
                {lawyer.lawyerId}
              </td>
              <td style={{ width: '80px', textAlign: 'center' }}>
                {lawyer.name}
              </td>
              <td style={{ width: '150px', textAlign: 'center' }}>
                <span
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  onClick={handleModalOpen}
                >
                  {lawyer.lawyerNum}
                </span>
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
                      id='modal-modal-title'
                      variant='h6'
                      component='h2'
                    >
                      변호사 등록증
                    </Typography>
                    <Typography
                      id='modal-modal-description'
                      sx={{ mt: 2 }}
                    >
                      여기엔 변호사 등록증 사진이 들어와야 함
                    </Typography>
                  </Box>
                </Modal>
              </td>

              <td style={{ width: '150px', textAlign: 'center' }}>
                <span
                  style={
                    lawyer.approval
                      ? { color: '#004E95' }
                      : { color: '#EC0808' }
                  }
                >
                  {lawyer.approval ? '승인' : '미승인'}
                </span>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default JoinList;
