import React, { useState } from 'react';
import './FAQContent.css';

const FAQContent = ({ content, rownum, currentPage }) => {
  const [flag, setFlag] = useState(false);

  const toggleFlag = () => {
    setFlag(!flag);
  };

  return (
    <>
      {/* 클릭되어있느지 여부에 따라 faq-title-area 배경색 #EDE9E3로 변경 */}
      <div className={`faq-title-area ${flag ? 'select' : 'unselect'}`}>
        <span className='faq-title-no'>
          {rownum + 1 + 10 * (currentPage - 1)}
        </span>
        <span className='faq-title-categ'>{content.middleSection}</span>
        <span className='faq-title-title'>{content.subject}</span>
        <img
          className='faquarrowframe-icon'
          alt=''
          src={`${
            flag
              ? require('../../assets/img/up_arrow.png')
              : require('../../assets/img/down_arrow.png')
          }
          `}
          onClick={toggleFlag}
        />
      </div>

      <div className={`faq-detail-area ${flag ? 'show' : 'hidden'}`}>
        <p className='faq-detail-content'>{content.question}</p>
        <p className='faq-detail-content'>{content.answer}</p>
        <p
          className='faq-detail-content'
          style={{ color: '#888888', fontSize: '13px' }}
        >
          <span style={{ display: 'block' }}>
            생활법령정보는 법적 효력을 갖는 유권해석(결정, 판단)의 근거가 되지
            않고, 각종 신고, 불복 청구 등의 증거자료로서의 효력은 없습니다.
          </span>
          <span style={{ display: 'block' }}>
            구체적인 법령에 대한 질의는 담당기관이나 국민신문고에 문의하시기
            바랍니다.
          </span>
        </p>
      </div>
    </>
  );
};

export default FAQContent;
