import {
  Box,
  Modal,
  Pagination,
  Typography,
  Backdrop,
  TableBody,
  Button,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
import { API_BASE_URL } from '../../config/host-config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const JoinList = ({ setPBtnCnt, currentPage, onPageChange }) => {
  const loggedUser = useSelector((state) => state.user);
  const BASE_URL = API_BASE_URL;
  const navigate = useNavigate();

  const [lawyerList, setLawyerList] = useState([]); // 변호사 회원가입 요청리스트 저장변수
  const [lawyerURL, setLawyerURL] = useState([]); // 변호사 회원가입 URL 리스트 저장
  const [lawyerIdClick, setlawyerIdClick] = useState([]); // 변호사 승인시 변호사Id 저장

  // 변호사 리스트
  const lawyerListPage = async () => {
    await fetch(`${BASE_URL}/master/history?authority=master`, {
      // authority=master 로그인 되면 수정필여
      headers: {
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((body) => {
        console.log(body.lawyerListResponseDTOS);
        setLawyerList(body.lawyerListResponseDTOS);
        setPBtnCnt(Math.floor(body.count / 10) + 1);
      });
  };

  // 변호사 등록번호 클릭시 이미지 띄우기
  const lawyerIdOnClick = async (e) => {
    const lawyerId = e.currentTarget.getAttribute('id');
    console.log(lawyerId);
    await fetch(`${BASE_URL}/master/history/img?lawyerId=${lawyerId}`, {
      headers: {
        'content-type': 'application/json',
      },
    }).then((res) =>
      res.text().then((body) => {
        setLawyerURL(body);
        setlawyerIdClick(lawyerId);
      })
    );
  };

  const approvalOnChange = async (e) => {
    await fetch(
      `${BASE_URL}/master/history?authority=master&lawyerId=${lawyerIdClick}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
      }
    ).then((res) =>
      res.text().then((body) => {
        alert(body);
        window.location.reload();
      })
    );
  };

  useEffect(() => {
    if (loggedUser.mode == 'user' || loggedUser.mode == 'lawyer') {
      alert('페이지 접근 권한이 없습니다.');
      navigate('/');
    } else {
      lawyerListPage();
    }
  }, []);

  const modalImg = () => {
    return lawyerURL;
  };

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
    width: 'auto',
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
        {lawyerList
          .slice((currentPage - 1) * 10, currentPage * 10)
          .map((lawyer, index) => (
            <tbody>
              <tr key={lawyer.lawyerId}>
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
                <td
                  style={{ width: '150px', textAlign: 'center' }}
                  id={lawyer.lawyerId}
                  onClick={lawyerIdOnClick}
                >
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
                        id='modal-modal-description'
                        sx={{ mt: 3 }}
                        style={{
                          position: 'relative',
                        }}
                      >
                        <img
                          src={modalImg()}
                          alt='lawyerPaper'
                        />
                        <Button
                          className='board-write-btn'
                          variant='contained'
                          style={{
                            position: 'absolute',
                            right: -20,
                            bottom: -20,
                          }}
                          onClick={approvalOnChange}
                        >
                          승인하기
                        </Button>
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
