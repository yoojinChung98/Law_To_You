import './Footer.css';

const Footer = () => {
  return (
    <div className='footer-body'>
      <footer className='footer-area'>
        <span className='footer-menu'>
          너에게Law | 법이 궁금할 땐, 언제나 곁에 있는 너에게Law
        </span>
        <span className='footer-info'>
          개인정보 처리 방침 | 이용약관 | 운영정책
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
