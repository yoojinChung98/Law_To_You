import React, { useState } from 'react';
import './FAQBox.css';
import FAQContent from './FAQContent';

const FAQBox = ({ contentList, currentPage }) => {
  // 처음 FAQBox가 렌더링 될때는 모든 화살표가 닫혀있어야 하므로 상태로 관리하지 않고 그냥 false 내려보낼거임.
  // FAQContent 내부에서 클릭여부 상태값으로 관리할 예정

  const renderFAQContent = () => {
    console.log(currentPage);
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
