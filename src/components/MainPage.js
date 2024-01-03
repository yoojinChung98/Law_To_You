import cn from 'classnames';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { getLogoutApi } from '../api/login/LoginApi';
import { useAppDispatch, useAppSelector } from '../store';
// import { logout } from '../store/userSlice';
import commUtil from '../util/commUtil';
import './MainPage.css';
import { API_BASE_URL } from '../config/host-config';
import { getLogoutApi } from '../api/login/LoginApi';

const MainPage = () => {
  const isLogin = commUtil.isNotEmpty(localStorage.getItem('accessToken'));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [targetDivId, setTargetDivId] = useState(null);

  const handleMouseHover = (e) => {
    setTargetDivId(e.target.parentNode.id);
  };
  const handleMouseLeave = () => {
    setTargetDivId('');
  };

  const mode = useAppSelector((state) => state.user.mode);

  const logoutBtnOnclick = () => {
    fetch(`${API_BASE_URL}/user/logout`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log(res);
        alert('logout');
        localStorage.clear();
        window.location.href = '/';
      }
    });
  };

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
          to={mode === 'user' ? '/counsel/write' : '/counsel'}
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
        {/* <span className="mainJoinBtn">회원가입</span> */}
        {/* <div className="mainBtnBar" /> */}
        {/* <span className="mainLoginBtn">로그인</span> */}
        <Link
          to='/join'
          className='mainJoinBtn'
        >
          회원가입
        </Link>
        {}
        <div className='mainBtnBar' />

        {!isLogin ? (
          <Link
            to='/login'
            className='mainLoginBtn'
          >
            로그인
          </Link>
        ) : (
          <Link
            className='mainLoginBtn'
            onClick={logoutBtnOnclick}
          >
            로그아웃
          </Link>
        )}
      </div>
    </div>
  );
};

export default MainPage;
