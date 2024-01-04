import React from "react";
import { Link } from "react-router-dom";
import "../scss/Board.scss";

const BoardForm = ({
  setPBtnCnt,
  currentPage,
  onPageChange,
  data,
  type = "freeboard",
}) => {
  return (
    <div className="board">
      <table className="board-table">
        <thead className="">
          <tr>
            <th>등록번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const no = type === "freeboard" ? item.bno : item.consultNum;
            return (
              <tr key={no ?? index}>
                <td>{no ?? index}</td>
                <td>
                  <Link
                    className="link"
                    style={{ textDecoration: "none" }}
                    to={
                      type === "freeboard"
                        ? "/freereply?bno=" + no
                        : "/counsel/content?consultNum=" + no
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
