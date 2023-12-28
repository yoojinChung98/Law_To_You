import React, { useState } from 'react';
import './UserModify.css';
import './global.css';
import Category from '../layout/Category';

const UserModify = () => {
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

  //  닉네임 글자수 제한

  const [nickname, setNickname] = useState('');

  const handleSubmits = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    if (nickname.length < 2 || nickname.length > 10) {
      alert('닉네임은 2자 이상, 10자 이하로 입력해주세요.');
    } else {
      // 닉네임 변경 로직을 여기에 작성하세요.
      alert('닉네임이 성공적으로 변경되었습니다.');
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
      <div className='Usermodify'>
        <span className='maintext1'>
          <span className='div18'>회원정보</span>
        </span>

        <span className='text1'>
          <span className='text0'>ID</span>
        </span>

        <span className='text2'>
          <span className='text0'>새 비밀번호 </span>
        </span>

        <span className='text3'>
          <span className='text0'>새 비밀번호 확인</span>
        </span>

        <span className='text4'>
          <span className='text0'>닉네임</span>
        </span>

        <span className='text5'>
          <span className='text0'>이메일</span>
        </span>

        <input
          className='inputNickname'
          type='text'
        />

        <form onSubmit={handleSubmit}>
          <input
            className='inputnewpassword1'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className='inputnewpasswordCheck1'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type='submit'
            className='btnchange2 '
          >
            변경
          </button>
        </form>

        <form onSubmit={handleSubmits}>
          <input
            className='inputNickname'
            type='text'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <button
            className='btnchange1'
            type='submit'
          >
            변경
          </button>
        </form>

        <button className='btnleave1'>회원탈퇴</button>

        <input
          className='inputid1'
          type='text'
          value='sindyjj1'
          disabled
        />

        <input
          className='email1'
          type='text'
          value='sindyjj1@naver.com'
          disabled
        />
      </div>
    </>
  );
};

export default UserModify;
