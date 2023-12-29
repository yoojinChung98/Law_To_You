import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/host-config';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const MyConsultList = ({ currentPage, setPBtnCnt }) => {
  const navigate = useNavigate();
  const BASE_URL = API_BASE_URL;
  // 로그인한 사용자가 질문(user)/답변(lawyer)한 총 리스트
  const [contentList, setContentList] = useState([]);
  // 로그인한 사용자가 질문(user)/답변(lawyer)한 총 리스트 개수
  const [contentCnt, setContentCnt] = useState(1);

  const loggedUser = useSelector((state) => state.user);

  useEffect(() => {
    getQCounselList();
  }, []);

  // 박스에 띄울 모든 리스트를 받아오기 위한 요청 (전체 리스트가 반환될 것.)
  const getQCounselList = async () => {
    let url =
      loggedUser.mode === 'user'
        ? `${BASE_URL}/mypage/counsel?page=${currentPage}&size=10`
        : `${BASE_URL}/mypage/counsel/lawyer`;
    let res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    });

    // 응답 받은 리스트를 contentList 와 contentCnt(페이징처리용) 상태에 세팅
    let resJson = await res.json();
    if (loggedUser.mode === 'user') {
      resJson.then((data) => {
        setContentList(data.consultingList);
        setContentCnt(data.count);
        setPBtnCnt(contentCnt / 10 + 1);
      });
    } else {
      resJson.then((data) => {
        setContentCnt(data.consultingList);
        setContentCnt(data.count);
      });
    }
  };

  // 유저: 깊은 상담 하러가기 버튼을 눌렀을 때, 작성/상세 페이지 어디로 보낼지 결정하는 함수
  const chkToDeepU = async (cNm) => {
    let res = await fetch(
      `${BASE_URL}/mypage/counsel/detail?consultNum=${cNm}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      }
    );

    let resJson = await res.json();
    console.log('chkToDeepU의 resJson은: ', resJson);
    if (resJson.status === 200) {
      resJson.then((data) => {
        data.ifUpdated ? navigate(`/deep/${cNm}`) : navigate('/counsel/deep/');
      });
    } else {
      alert('다른 사람의 깊은 상담은 볼 수 없습니다.');
    }
  };

  // 변호사: 깊은 상담 하러가기 버튼을 눌렀을 때, 거절/상세 페이지 중 어디로 보낼지 결정하는 함수
  const chkToDeepL = async (cNm) => {
    let res = await fetch(
      `${BASE_URL}/mypage/counsel/detail?consultNum=${cNm}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      }
    );

    let resJson = await res.json();
    console.log('chkToDeepU의 resJson은: ', resJson);
    if (resJson.status === 200) {
      resJson.then((data) => {
        if (data.ifUpdated) {
          navigate(`/deep/${cNm}`);
        } else {
          alert(
            `아직 의뢰인이 깊은 상담을 등록하지 않았습니다.\n 깊은 상담이 등록될 때 까지 기다려주십시오.`
          );
        }
      });
    } else {
      alert('채택되지 않은 깊은 상담은 볼 수 없습니다.');
    }
  };

  // 유저의 리스트를 렌더링하는 함수
  const listRenderUser = () => {
    let sliceIdx = 10 * (currentPage - 1);
    // 여기 만약 contentList 가 모든 리스트가 아닌 페이징처리한 리스트가 오는거라면 slice는 필요 없음.
    return contentList.slice(sliceIdx, sliceIdx + 10).map((content, index) => {
      return (
        <tr key={content.consultNum}>
          <td style={{ width: '90px', textAlign: 'center' }}>
            {content.consultNum}
          </td>
          <td style={{ paddingLeft: '25px', width: '950px' }}>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to={`/counsel/detail/${content.consultNum}`}
            >
              {content.title}
            </Link>
          </td>
          <td style={{ width: '100px', textAlign: 'center' }}>
            {content.regDate}
          </td>
          <td>
            {/*  답변이 달렸다면 삭제할수 없고, 달리지 않은 경우엔 삭제가능. */}
            {content.isAnswered ? (
              ''
            ) : (
              <Button
                variant='outlined'
                style={{ width: '60px', margin: '0px 7px' }}
                onClick={deleteCounsel(content.consultNum)}
              >
                삭제
              </Button>
            )}
          </td>
          <td>
            <Button
              variant='contained'
              style={{
                width: '150px',
                margin: '0px 7px',
                padding: '5px 1px',
                backgroundColor: 'var(--deep-brown)',
              }}
              onClick={chkToDeepU(content.consultNum)}
            >
              깊은상담하러가기
            </Button>
          </td>
        </tr>
      );
    });
  };

  // 변호사의 리스트를 렌더링 하는 함수
  const listRenderLawyer = () => {
    let sliceIdx = 10 * (currentPage - 1);
    return contentList.slice(sliceIdx, sliceIdx + 10).map((content, index) => {
      return (
        <tr key={content.consultNum}>
          <td style={{ width: '90px', textAlign: 'center' }}>
            {content.consultNum}
          </td>
          <td style={{ paddingLeft: '25px', width: '950px' }}>
            <Link
              style={{ textDecoration: 'none', color: 'inherit' }}
              to={`/counsel/detail/${content.consultNum}`}
            >
              {content.title}
            </Link>
          </td>
          <td style={{ width: '100px', textAlign: 'center' }}>
            {content.regDate}
          </td>
          <td>
            {/*  채택되었다면 채택됨 div 를 보여주고, 채택되지 않았다면 빈칸. */}
            {content.isAdopted ? (
              <div
                style={{
                  fontFamily: 'Pretendard-Regular',
                  color: '#ffffff',
                  width: '80px',
                  height: '35px',
                  textAlign: 'center',
                  lineHeight: '35px',
                  backgroundColor: 'var(--light-brown)',
                  borderRadius: '20px',
                }}
              >
                채택됨
              </div>
            ) : (
              ''
            )}
          </td>
          <td>
            <Button
              variant='contained'
              style={{
                width: '150px',
                margin: '0px 7px',
                padding: '5px 1px',
                backgroundColor: 'var(--deep-brown)',
              }}
              onClick={chkToDeepL(content.consultNum)}
            >
              깊은상담하러가기
            </Button>
          </td>
        </tr>
      );
    });
  };

  const deleteCounsel = async (cNm) => {
    let res = await fetch(`${BASE_URL}/mypage/counsel`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
      body: JSON.stringify({
        consultNum: cNm,
      }),
    });

    if (res.status === 200) {
      alert('질문이 삭제되었습니다.');
    } else {
      // 에러코드 뭐오는지 모름.
      alert('삭제할 수 없는 질문입니다.');
    }
  };

  return (
    <div className='board'>
      <span
        className='bt-title'
        style={{
          width: '1400px',
          textAlign: 'left',
          textIndent: '20px',
          paddingBottom: '30px',
        }}
      >
        온라인 상담 내역
      </span>
      <table className='board-table'>
        <thead className=''>
          <tr>
            <th>상담번호</th>
            <th>제목</th>
            <th>작성일자</th>
            <th>{loggedUser.mode === 'user' ? '삭제' : '채택여부'}</th>
            <th>깊은상담</th>
          </tr>
        </thead>
        <tbody>
          {loggedUser.mode === 'user' ? listRenderUser() : listRenderLawyer()}
        </tbody>
      </table>
    </div>
  );
};

export default MyConsultList;
