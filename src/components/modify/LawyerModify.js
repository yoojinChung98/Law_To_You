import React, { useState } from 'react';
import './LawyerModify.css';
import './global.css';
import Category from '../layout/Category';

const LawyerModify = () => {
  const categories = [
    '회원정보',
    '내가 쓴 글',
    '온라인 상담 내역',
    '법봉 충전',
    '로그아웃', // 얘가 idx 0 을 갖게 될 것.
  ];

  let categorySize = categories.length - 1;

  const [clickedCateIdx, setClickedCateIdx] = useState(4);

  const cateClick = (idx) => {
    // 상단 카테고리의 개수가 18개이기 때문에 17- 로 걍 썼음.
    setClickedCateIdx(4 - idx);
    //console.log(idx); // 여기서 idx 값은 카테고리 가장 상단부터 0 할당됨.
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
            categorySize={categorySize}
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
