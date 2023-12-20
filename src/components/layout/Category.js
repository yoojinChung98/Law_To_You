import './Category.css';

const Category = ({ categoryList, clickedIDX }) => {
  const renderCategoryList = () => {
    return categoryList.map((category, index) => (
      <li
        key={index}
        className={
          index === clickedIDX ? 'category-list cate-selected' : 'category-list'
        }
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
