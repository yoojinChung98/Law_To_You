import './Category.css';

const Category = ({ categoryList, clickedIdx, cateClick, cateTitle }) => {
  const renderCategoryList = () => {
    return categoryList.map((category, index) => (
      <li
        key={index}
        className={
          index === clickedIdx ? 'category-list cate-selected' : 'category-list'
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
      <li className='category-title'>{cateTitle}</li>
      {renderCategoryList()}
    </ul>
  );
};

export default Category;
