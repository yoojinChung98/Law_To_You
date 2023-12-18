import { Button } from '@mui/material';
import React, { useState } from 'react';

const MyConsultList = () => {
  // 권한 값을 예시로 lawyer 로 설정해놓음 (이 부분에 실제 권한이 문자열로 들어와야 함.)
  const [authority, setAuthority] = useState('client');

  let delOrAdopt; // 삭제버튼 혹은 채택됨 박스의 렌더링을 결정할 함수
  if (authority === 'lawyer') {
    // authority 의 값이 lawyer 인 경우 삭제 버튼 렌더링
    delOrAdopt = (
      <Button
        variant='outlined'
        style={{ width: '60px', margin: '0px 7px' }}
      >
        삭제
      </Button>
    );
  } else if (authority === 'client') {
    // authority 의 값이 client 인 경우 채택됨 박스 렌더링
    delOrAdopt = (
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
    );
  } else {
    // 여기는 혹시나 관리자 계정을 사용할까 싶어서 놔둔 부분
    delOrAdopt = <span>다른 권한 혹은 오류 발생</span>;
  }

  return (
    <div className='board'>
      <h1 className='title'>온라인 상담 내역</h1>
      <table className='board-table'>
        <thead className=''>
          <tr>
            <th>상담번호</th>
            <th>제목</th>
            <th>작성일자</th>
            <th>{authority === 'lawyer' ? '삭제' : '채택여부'}</th>
            <th>깊은상담</th>
          </tr>
        </thead>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function () {
          return (
            <tbody>
              <tr>
                <td style={{ width: '90px', textAlign: 'center' }}>0</td>
                <td style={{ paddingLeft: '25px', width: '950px' }}>
                  <a
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    href=''
                  >
                    게시글 제목이 들어갈 공간입니다.
                  </a>
                </td>
                <td style={{ width: '100px', textAlign: 'center' }}>
                  23.12.07
                </td>
                <td>{delOrAdopt}</td>
                <td>
                  <Button
                    variant='contained'
                    style={{
                      width: '150px',
                      margin: '0px 7px',
                      padding: '5px 1px',
                      backgroundColor: 'var(--deep-brown)',
                    }}
                  >
                    깊은상담하러가기
                  </Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default MyConsultList;
