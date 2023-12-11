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

      {/* <div className='htab'>
        <span
          className='hbtntext'
          spanAtt='spanVal'
        >
          마이페이지
        </span>
        <div
          className='hbtndiv'
          divAtt='divVal'
          onClick={onHBtnDivClick}
        />
      </div>
      <div className='htab1'>
        <span
          className='hbtntext'
          spanAtt='spanVal'
        >
          고민나누기
        </span>
        <div
          className='hbtndiv'
          divAtt='divVal'
          onClick={onHBtnDiv1Click}
        />
      </div>
      <div className='htab2'>
        <span
          className='hbtntext'
          spanAtt='spanVal'
        >
          온라인상담
        </span>
        <div
          className='hbtndiv'
          divAtt='divVal'
          onClick={onHBtnDiv2Click}
        />
      </div>

      <div className='htab3'>
        <div
          className='hbtndiv'
          onClick={onHBtnDiv3Click}
        >
          백문 백답
        </div>
      </div>

      <img
        className='logos-mint-icon'
        alt=''
        src='/Logo-S-mint@2x.png'
        onClick={onLogoSMintImageClick}
      /> */}
    </header>
  );
};

export default Header;
