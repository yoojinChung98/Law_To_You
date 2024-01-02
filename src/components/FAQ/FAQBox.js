import React, { useState } from 'react';
import './FAQBox.css';
import FAQContent from './FAQContent';

const FAQBox = ({ contentList, currentPage }) => {
  const renderFAQContent = () => {
    return contentList.map((content, index) => (
      <FAQContent
        content={content}
        rownum={index}
        currentPage={currentPage}
      />
    ));
  };

  return (
    <>
      <div className='faqbox-header'>
        <span className='faqbox-header-no'>번호</span>
        <span className='faqbox-header-categ'>분류</span>
        <span className='faqbox-header-title'>제목</span>
      </div>
      <div className='faqbox-content'>{renderFAQContent()}</div>
    </>
  );
};

export default FAQBox;
