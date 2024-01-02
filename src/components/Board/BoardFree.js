import { Icon } from "@iconify/react";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFreeListApi, getFreeSearchApi } from "../../api/board/FreeBoardApi";
import "../scss/Board.scss";
import BoardForm from "./BoardForm";

const BoardFree = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    count: 0,
    pageInfo: {},
    freeboards: [],
  });

  let params = {
    page: 1,
    size: 10,
  };

  useEffect(() => {
    getFreeListApi(params)
      .then((res) => {
        if (typeof res === "object") {
          setData(res);
        }
      })
      .catch((e) => {
        console.log(e);
        setData({
          count: 0,
          pageInfo: {},
          freeboards: [
            {
              bno: 1,
              title: "제목1",
              writer: "작성자1",
              regDate: "2024.01.01",
            },
            {
              bno: 2,
              title: "제목2",
              writer: "작성자2",
              regDate: "2024.01.01",
            },
            {
              bno: 3,
              title: "제목3",
              writer: "작성자3",
              regDate: "2024.01.01",
            },
            {
              bno: 4,
              title: "제목4",
              writer: "작성자4",
              regDate: "2024.01.01",
            },
          ],
        });
      });
  }, []);

  const [searchdata, setSearchData] = useState({
    count: 0,
    serarchdata: {},
  });

  const freeSearchBtn = () => {
    let params = {
      // {
      //   search: search
      //   type: writer, titleAndContent
      //   }
    };

    getFreeSearchApi(params).then((res) => {
      if (typeof res === "object") {
        searchdata.setSearchData(res);
      }
    });
  };

  return (
    <>
      <div className="board">
        <div className="board-header">
          <span>고민나누기</span>
          <div>
            자유게시판 설명 내용 작성하기! 사용자가 올린 온라인 상담 문의글에
            간략하게 답변을 달 수 있습니다.답변이 채택된다면 사용자에게 더욱
            심도깊은 상담을 이어나갈 수 있습니다. 답변이 채택되고 상담이
            진행된다면 답변 등록 시 입력한 법봉을 추가로 받으실 수 있습니다.
          </div>
        </div>
        <div className="search-box">
          <input className="search-input"></input>
          <Icon
            className="search-button"
            icon="majesticons:search-line"
            color="#675d50"
            onClick={freeSearchBtn}
          />
        </div>
      </div>
      <BoardForm data={data.freeboards} type="freeboard" />
      <div className="button-wrapper">
        <Button
          className="board-write-btn"
          variant="contained"
          onClick={() => {
            navigate("/freewrite");
          }}
        >
          글 작성하기
        </Button>
      </div>
    </>
  );
};

export default BoardFree;
