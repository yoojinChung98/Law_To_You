import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
  const loggedUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className='header-area'>
      <header
        className='header'
        id='header'
        attriName='attriValue'
      >
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
              loggedUser.mode === 'user'
                ? navigate('/counsel/write/')
                : navigate('/counsel/');
            }}
          >
            온라인상담
          </div>
        </div>

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
              navigate('/free/');
            }}
          >
            만남의광장
          </div>
        </div>

        <div className='htab'>
          <div
            className='hbtndiv'
            onClick={() => {
              loggedUser.mode === 'user'
                ? navigate('/mypage/user/')
                : navigate('/mypage/lawyer/');
            }}
          >
            마이페이지
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
