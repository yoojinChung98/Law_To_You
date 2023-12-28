import Category from '../layout/Category';
import React, { useState } from 'react';
import './CategoryFAQ.css';

const CategoryFAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='frame-parent'>
      {/* <div className='category-wrapper'>
        <div className='category'>category</div>
      </div>
      <CategoryButton
        selected={selectedCategory === '회원정보'}
        onClick={() => handleCategoryClick('회원정보')}
        label='회원정보'
      />
      <CategoryButton
        selected={selectedCategory === '내가 쓴 글'}
        onClick={() => handleCategoryClick('내가 쓴 글')}
        label='내가 쓴 글'
      />
      <CategoryButton
        selected={selectedCategory === '온라인 상담 내역'}
        onClick={() => handleCategoryClick('온라인 상담 내역')}
        label='온라인 상담 내역'
      />
      <CategoryButton
        selected={selectedCategory === '법봉 충전'}
        onClick={() => handleCategoryClick('법봉 충전')}
        label='법봉 충전'
      />
      <CategoryButton
        selected={selectedCategory === '로그아웃'}
        onClick={() => handleCategoryClick('로그아웃')}
        label='로그아웃'
      /> */}
      <Category />
    </div>
  );
};

const CategoryButton = ({ selected, onClick, label }) => {
  return (
    <button
      className={`category-container ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className='category1'>{label}</div>
    </button>
  );
};

export default CategoryFAQ;
