import React, { useState } from 'react';
import './MainPage.css';
import cn from 'classnames';

const MainPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [targetDivId, setTargetDivId] = useState(null);

  const handleMouseHover = (e) => {
    setTargetDivId(e.target.parentNode.id);
    setIsHovered(true);
    console.log('handleMouseHover 작동~');
    console.log(e.target.parentNode.id);
  };
  const handleMouseLeave = () => {
    setTargetDivId('');
    setIsHovered(false);
    console.log('handleMouseLeave 작동~');
  };

  return (
    <div className='mainPageDiv'>
      {/* 상단에 로고 하나 띄워야함. absolute으로 걍 박으면,,, 안될까...? 아니면 sec1 기준으로 박을까/ */}

      <div className='logom-white-icon' />

      <div
        id='mainSec1'
        className={cn('secDefault1', {
          hoveredSec1: targetDivId === 'mainSec1',
        })}
      >
        <span
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseLeave}
        >
          온라인상담
        </span>
      </div>

      <div
        id='mainSec2'
        className={cn('secDefault2', {
          hoveredSec2: targetDivId === 'mainSec2',
        })}
      >
        <span
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseLeave}
        >
          고민나누기
        </span>
      </div>

      <div
        id='mainSec3'
        className={cn('secDefault3', {
          hoveredSec3: targetDivId === 'mainSec3',
        })}
      >
        <span
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseLeave}
        >
          마이페이지
        </span>
      </div>
      <div className='mainJoinLogin'>
        <span className='mainJoinBtn'>회원가입</span>
        <div className='mainBtnBar' />
        <span className='mainLoginBtn'>로그인</span>
      </div>
    </div>
  );
};

export default MainPage;
