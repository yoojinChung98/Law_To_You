import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
  const loggedUser = useSelector((state) => state.user);
  const onHBtnDivClick = useCallback(() => {
    // Please sync "회원정보조회(사용자)" to the project
  }, []);

  const navigate = useNavigate();

  return (
    <div className='header-area'>
      <header
        className='header'
        id='header'
        attriName='attriValue'
      >
        <div
          className='logos-mint-icon'
          onClick={() => {
            navigate('/');
          }}
        />

        <div className='htab'>
          <div
            className='hbtndiv'
            onClick={() => {
              navigate('/faq/');
            }}
          >
            백문백답
          </div>
        </div>

        <div className='htab'>
          <div
            className='hbtndiv'
            onClick={() => {
              loggedUser.mode === 'lawyer'
                ? navigate('/counsel/')
                : navigate('/counselwirte/');
            }}
          >
            온라인상담
          </div>
        </div>

        <div className='htab'>
          <div
            className='hbtndiv'
            onClick={() => {
              navigate('/free/');
            }}
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
