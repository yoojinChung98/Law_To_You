import React from 'react';
import './UserModify.css';
import './global.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import CategoryFAQ from './CategoryFAQ';

const UserModify = () => {
  return (
    <>
      <Header />
      <div className='userCategory'>
        <CategoryFAQ />
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

        <input
          className='inputnewpassword1'
          type='text'
        />

        <input
          className='inputnewpasswordCheck1'
          type='text'
        />

        <button className='btnleave1'>회원탈퇴</button>

        <button className='btnchange1'>변경</button>

        <button className='btnchange2'>변경</button>
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

      <Footer />
    </>
  );
};

export default UserModify;
