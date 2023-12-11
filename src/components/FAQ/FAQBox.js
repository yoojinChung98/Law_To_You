import React from 'react';
import './FAQBox.css';
import FAQContent from './FAQContent';

const FAQBox = () => {
  return (
    <>
      <div className='faqbox-header'>
        <span className='faqbox-header-no'>번호</span>
        <span className='faqbox-header-categ'>분류</span>
        <span className='faqbox-header-title'>제목</span>
      </div>
      <div className='faqbox-content'>
        <FAQContent isClicked={false} />
        <FAQContent isClicked={false} />
        <FAQContent isClicked={true} />
      </div>
    </>
  );
};

export default FAQBox;
