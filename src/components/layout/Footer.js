import { Modal } from '@mui/base';
import './Footer.css';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const Footer = () => {
  const navigate = useNavigate();

  const viewPolicy = (index) => {
    // 적당히 숫자 발라서 navigate로 policy로 보내자.
    navigate(`/policy/${index}`);
  };

  return (
    <div className='footer-body'>
      <footer className='footer-area'>
        <span className='footer-menu'>
          내옆으Law | 법이 궁금할 땐, 언제나 곁에 있는 내옆으Law
        </span>
        <span className='footer-info'>
          <span
            className='footer-policy'
            onClick={() => viewPolicy(0)}
          >
            {' '}
            개인정보 처리 방침{' '}
          </span>
          <span> | </span>
          <span
            className='footer-policy'
            onClick={() => viewPolicy(1)}
          >
            {' '}
            이용약관{' '}
          </span>
          <span> | </span>
          <span
            className='footer-policy'
            onClick={() => viewPolicy(2)}
          >
            {' '}
            운영정책{' '}
          </span>
        </span>
        <span className='footer-info'>
          주소: 서울특별시 마포구 백범로 23, 3층 (신수동, 케이터틀) | 고객 문의
          이메일: LawToYou@gmail.com{' '}
        </span>
        <span className='footer-info'>
          Copyright 2023 LawToYou Inc., All rights reserved
        </span>
      </footer>
    </div>
  );
};

export default Footer;
