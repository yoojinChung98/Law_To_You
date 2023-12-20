import React from 'react';
import './LawyerModify.css';
import './global.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import CategoryFAQ from './CategoryFAQ';

const LawyerModify = () => {
  return (
    <>
      <Header />
      <div className='userCategory'>
        <CategoryFAQ />
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

        <input
          className='inputnewpassword2'
          type='text'
        />

        <input
          className='inputnewpasswordCheck2'
          type='text'
        />

        <button className='btnleave2'>회원탈퇴</button>

        <button className='btnchange3'>변경</button>
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

      <Footer />
    </>
  );
};

export default LawyerModify;
