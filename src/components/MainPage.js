import cn from 'classnames';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import commUtil from '../util/commUtil';
import './MainPage.css';
import { API_BASE_URL } from '../config/host-config';
import { logout } from '../store/userSlice';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const isLogin = commUtil.isNotEmpty(localStorage.getItem('accessToken'));
  const loggedUser = useSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [targetDivId, setTargetDivId] = useState(null);
  const [myBtn, setMyBtn] = useState('');

  const handleMouseHover = (e) => {
    setTargetDivId(e.target.parentNode.id);
  };
  const handleMouseLeave = () => {
    setTargetDivId('');
  };

  const mode = useAppSelector((state) => state.user.mode);

  const logoutBtnOnclick = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/user/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      console.log('accessToken', localStorage.getItem('accessToken'));
      if (res.status === 200) {
        localStorage.clear();
        dispatch(logout());
        alert('로그아웃 되었습니다.');
        navigate('/');
      }
    } catch (error) {
      console.error('로그아웃 에러:', error);
      alert('로그아웃 실패');
    }
  };

  const renderMyBtn = () => {
    if (isLogin && loggedUser.mode == 'user') {
      return (
        <>
          <Link
            to='/mypage/user'
            className='mainJoinBtn'
          >
            마이페이지
          </Link>
        </>
      );
    } else if (isLogin && loggedUser.mode == 'lawyer') {
      return (
        <>
          <Link
            to='/mypage/lawyer'
            className='mainJoinBtn'
          >
            마이페이지
          </Link>
        </>
      );
    } else if (isLogin) {
      return (
        <>
          <Link
            to='/joinlist/'
            className='mainJoinBtn'
            style={{ width: '170px' }}
          >
            회원가입 요청 리스트
          </Link>
        </>
      );
    } else {
      return (
        <Link
          to='/join'
          className='mainJoinBtn'
        >
          회원가입
        </Link>
      );
    }
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

        {/* {isLogin ? (
          <>
            <Link
              to='/mypage'
              className='mainJoinBtn'
            >
              마이페이지
            </Link>
          </>
        ) : (
          <Link
            to='/join'
            className='mainJoinBtn'
          >
            회원가입
          </Link>
        )} */}
        {renderMyBtn()}

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
            style={{
              width: '100px',
              height: '100px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            로그아웃
          </Link>
        )}
      </div>
    </div>
  );
};

export default MainPage;
