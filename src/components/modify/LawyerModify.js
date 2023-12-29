import React, { useState } from 'react';
// import './LawyerModify.css';
// import './global.css';
import Category from '../layout/Category';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LawyerModify = () => {
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.user);

  // 카테고리에 주입할 리스트 선언부.(수정불필요)
  const categories = [
    '회원정보',
    '내가 쓴 글',
    '온라인 상담 내역',
    '법봉 충전',
    '로그아웃',
  ];

  const [clickedCateIdx, setClickedCateIdx] = useState(0);

  const cateClick = (idx) => {
    setClickedCateIdx(idx);
    switch (idx) {
      case 0:
        loggedUser.mode == 'user'
          ? navigate('/mypage/user/')
          : navigate('/mypage/lawyer/');
        break;
      case 1:
        navigate('/myfree/');
        break;
      case 2:
        navigate('/mycounsel/');
        break;
      case 3:
        navigate('/bupbong/');
        break;
      default:
        // 여기는 로그아웃 부분. 로그아웃 로직이 연결되도록 해야함.
        break;
    }
  };

  // 비밀번호 중복 확인

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
    } else {
      // 비밀번호 변경 로직을 여기에 작성하세요.
      alert('비밀번호가 성공적으로 변경되었습니다.');
    }
  };

  return (
    <>
      <div className='userCategory'>
        {
          <Category
            categoryList={categories}
            clickedIdx={clickedCateIdx}
            cateClick={cateClick}
          />
        }
      </div>
      <div className='lawyermodify1'>
        {/* <Category /> */}

        <span className='maintext2'>
          <span className='div18'>회원정보</span>
        </span>

        <span className='texts'>
          <span className='text0'>이름</span>
        </span>

        <span className='texts1'>
          <span className='text0'>ID</span>
        </span>

        <span className='texts2'>
          <span className='text0'>새 비밀번호 </span>
        </span>

        <span className='texts3'>
          <span className='text0'>새 비밀번호 확인</span>
        </span>

        <span className='texts4'>
          <span className='text0'>이메일</span>
        </span>

        <span className='texts5'>
          <span className='text0'>회원 상태 승인</span>
        </span>

        <input
          className='inputme'
          type='text'
          value='미승인'
          disabled
        />

        <form onSubmit={handleSubmit}>
          <input
            className='inputnewpassword2'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className='inputnewpasswordCheck2'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type='submit'
            className='btnchange3 '
          >
            변경
          </button>
        </form>

        <button className='btnleave2'>회원탈퇴</button>

        <input
          className='inputid2'
          type='text'
          value='sindyjj1'
          disabled
        />

        <input
          className='inputname1'
          type='text'
          value='원정욱'
          disabled
        />

        <input
          className='email2'
          type='text'
          value='sindyjj1@naver.com'
          disabled
        />
      </div>
    </>
  );
};

export default LawyerModify;
