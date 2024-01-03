import React, { useEffect, useState } from 'react';
import './MyPostForm.css';
import { API_BASE_URL } from '../../config/host-config';
import { useNavigate } from 'react-router-dom';

const MyPostForm = () => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  const redirection = useNavigate();

  const requestHeader = {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  const [freeList, setFreeList] = useState([]);
  const [count, setCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const postsPerPage = 10; // 한 페이지에 보여줄 글 개수

  useEffect(() => {
    fetch(`${API_BASE_URL}/mypage/list`, {
      method: 'GET',
      headers: requestHeader,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) return res.json();
        else if (res.status === 403) {
          alert('로그인이 필요한 서비스입니다.');
          redirection('/');
          return;
        } else {
          alert('관리자에게 문의하세요!');
          redirection('/');
        }
        return;
      })
      .then((json) => {
        console.log(json);
        setFreeList(json.freeboardList);
        setCount(json.count);
      });
  }, []);

  // 현재 페이지의 글 목록 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = freeList.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 번호를 클릭했을 때 실행되는 함수
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getContentHandler = (e) => {
    e.preventDefault();

    fetch(`${API_BASE_URL}/freeboard/content?`);
  };

  return (
    <div className='board'>
      <span
        className='bt-title'
        style={{
          width: '1400px',
          textAlign: 'left',
          textIndent: '20px',
          paddingBottom: '30px',
        }}
      >
        내가 쓴 글
      </span>
      <table className='board-table'>
        <thead className=''>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((item, index) => (
            <tr key={item.bno}>
              <td style={{ width: '80px', textAlign: 'center' }}>
                {/* 순차적인 번호 부여 */}
                {(currentPage - 1) * postsPerPage + index + 1}
              </td>
              <td style={{ paddingLeft: '25px' }}>
                <a
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  href={`http://localhost:80/api/freeboard/content?bno=${item.bno}`}
                  onClick={getContentHandler}
                >
                  {item.title}
                </a>
              </td>
              <td style={{ width: '100px', textAlign: 'center' }}>
                {item.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 페이징 처리 */}
      <div className='pagination'>
        {Array.from({ length: Math.ceil(count / postsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default MyPostForm;
