import { useCallback } from 'react';
import './Header.css';

const Header = () => {
  const onHBtnDivClick = useCallback(() => {
    // Please sync "회원정보조회(사용자)" to the project
  }, []);

  const onLogoSMintImageClick = useCallback(() => {
    // Please sync "메인페이지" to the project
  }, []);

  return (
    <div className='header-area'>
      <header
        className='header'
        id='header'
        attriName='attriValue'
      >
        {/* 
      <img
        className='logos-mint-icon1'
        alt='Logo'
        src={require('../../assets/img/LogoS_mint.png')}
        onClick={onLogoSMintImageClick}
      /> */}

        <div className='htab'>
          <div
            className='hbtndiv'
            onClick={onHBtnDivClick}
          >
            백문백답
          </div>
        </div>

        <div className='htab'>
          <div
            className='hbtndiv'
            onClick={onHBtnDivClick}
          >
            온라인상담
          </div>
        </div>

        <div
          className='logos-mint-icon'
          onClick={onLogoSMintImageClick}
        />

        <div className='htab'>
          <div
            className='hbtndiv'
            onClick={onHBtnDivClick}
          >
            만남의광장
          </div>
        </div>

        <div className='htab'>
          <div
            className='hbtndiv'
            onClick={onHBtnDivClick}
          >
            마이페이지
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
