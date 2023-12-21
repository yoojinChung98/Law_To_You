import './Category.css';

const Category = ({ categoryList, clickedIdx, cateClick, categorySize }) => {
  const renderCategoryList = () => {
    return categoryList.map((category, index) => (
      <li
        key={index}
        className={
          index === categorySize - clickedIdx
            ? 'category-list cate-selected'
            : 'category-list'
        }
        onClick={() => {
          cateClick(index);
        }}
      >
        {category}
      </li>
    ));
  };

  return (
    <ul className='category-wrapper'>
      <li className='category-title'>카테고리제목</li>
      {renderCategoryList()}
    </ul>
  );
};

export default Category;
