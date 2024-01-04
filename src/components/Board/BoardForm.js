import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/Board.scss';

const BoardForm = ({
  setPBtnCnt,
  currentPage,
  onPageChange,
  data,
  type = 'freeboard',
}) => {
  return (
    <div className='board'>
      <table className='board-table'>
        <thead className=''>
          <tr>
            <th>등록번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const no = type === 'freeboard' ? item.bno : item.consultNum;
            return (
              <tr key={no ?? index}>
                <td>{no ?? index}</td>
                <td>
                  <Link
                    className='link'
                    style={{ textDecoration: 'none' }}
                    to={
                      type === 'freeboard'
                        ? '/freereply?bno=' + no
                        : '/counsel/detail/' + no
                    }
                  >
                    {item.title}
                  </Link>
                </td>
                <td>{item.writer}</td>
                <td>{item.regDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BoardForm;

// import React, { useEffect, useState } from "react";
// import { getFreeListApi } from "../../api/board/FreeBoardApi";
// import "../scss/Board.scss";

// function GetData() {
//   const [data, setData] = useState([]);
//   let params = {
//     page: "3",
//   };

//   useEffect(() => {
//     console.log("api호출");
//     getFreeListApi(params)
//       .then((res) => {
//         console.log(res.data);
//         if (res.status === 200) {
//           setData(res.data);
//         }
//       })
//       .catch((error) => {
//         console.log("api호출 오류: ", error);
//       });
//   }, []);

//   return data.map((item, index) => (
//     <tr key={index}>
//       <td>34</td>
//       <td>{item.title}</td>
//       <td>{item.writer}</td>
//       <td>{item.regDate}</td>
//     </tr>
//   ));
// }

// const BoardForm = () => {
//   // GetData를 직접 호출하여 반환된 데이터를 사용합니다.
//   const items = GetData();

//   return (
//     <div className="board">
//       <table className="board-table">
//         <thead className="">
//           <tr>
//             <th>상담번호</th>
//             <th>제목</th>
//             <th>작성자</th>
//             <th>작성일자</th>
//           </tr>
//         </thead>
//         <tbody>{items}</tbody>
//       </table>
//     </div>
//   );
// };

// export default BoardForm;
