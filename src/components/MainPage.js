import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store';
import './MainPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/userSlice';

const MainPage = () => {
  const [targetDivId, setTargetDivId] = useState(null);

  const handleMouseHover = (e) => {
    setTargetDivId(e.target.parentNode.id);
  };
  const handleMouseLeave = () => {
    setTargetDivId('');
  };

  const mode = useAppSelector((state) => state.user.mode);
  console.log(mode);

  return (
    <div className='mainPageDiv'>
      <div className='logom-white-icon' />

      <div
        id='mainSec1'
        className={cn('secDefault1', {
          hoveredSec1: targetDivId === 'mainSec1',
        })}
      >
        <Link
          to='/faq'
          className='insteadOfSpan'
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseLeave}
        >
          백문백답
        </Link>
      </div>

      <div
        id='mainSec2'
        className={cn('secDefault2', {
          hoveredSec2: targetDivId === 'mainSec2',
        })}
      >
        <Link
          to={mode === 'user' ? '/' : '/counsel'}
          state={{ mode: mode }}
          className='insteadOfSpan'
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseLeave}
        >
          온라인상담
        </Link>
      </div>

      <div
        id='mainSec3'
        className={cn('secDefault3', {
          hoveredSec3: targetDivId === 'mainSec3',
        })}
      >
        <Link
          to='/free'
          className='insteadOfSpan'
          onMouseEnter={handleMouseHover}
          onMouseLeave={handleMouseLeave}
        >
          고민나누기
        </Link>
      </div>
      <div className='mainJoinLogin'>
        <Link
          to='/join'
          className='mainJoinBtn'
        >
          회원가입
        </Link>
        <div className='mainBtnBar' />
        <Link
          to='/login'
          className='mainLoginBtn'
        >
          로그인
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
