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

  return <ul className='category-wrapper'>{renderCategoryList()}</ul>;
};

export default Category;
