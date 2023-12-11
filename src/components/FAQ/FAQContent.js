import React from 'react';
import './FAQContent.css';

const FAQContent = ({ isClicked }) => {
  let flag1 = isClicked;

  return (
    <>
      {/* 클릭되어있느지 여부에 따라 faq-title-area 배경색 #EDE9E3로 변경 */}
      <div className={`faq-title-area ${flag1 ? 'select' : 'unselect'}`}>
        <span className='faq-title-no'>0</span>
        <span className='faq-title-categ'>중분류 / 중분류</span>
        <span className='faq-title-title'>제목이 들어갈 부분입니당</span>
        <img
          className='faquarrowframe-icon'
          alt=''
          src={`${
            flag1
              ? require('../../assets/img/up_arrow.png')
              : require('../../assets/img/down_arrow.png')
          }
          `}
        />
      </div>

      <div className={`faq-detail-area ${flag1 ? 'show' : 'hidden'}`}>
        <p className='faq-detail-content'>여기는 FAQ답변이들어갑니다.</p>
      </div>
    </>
  );
};

export default FAQContent;
