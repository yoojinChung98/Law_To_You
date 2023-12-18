import React from "react";
import "../scss/Board.scss";

const BoardForm = () => {
  return (
    <div className="board">
      <table className="board-table">
        <thead className="">
          <tr>
            <th>상담번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
          </tr>
        </thead>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function () {
          return (
            <tbody>
              <tr>
                <td>34</td>
                <td>
                  술을 마시고 택시에 구토를 하였는데, 택시기사가 고소하겠다고
                  협박합니다
                </td>
                <td>냥냐냥냥ㄴ냐얀얀</td>
                <td>23.12.07</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default BoardForm;
