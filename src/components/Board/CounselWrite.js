import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { postCounselRegistApi } from "../../api/board/CounselWriteApi";
import "../scss/Board.scss";

const CounselWrite = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    largeSection: "",
    file: [],
  });
  const fileInput = useRef(null);

  const titleOnchangeEventHandler = (e) => {
    setData({ ...data, title: e.target.value });
  };
  const contentOnchangeEventHandler = (e) => {
    setData({ ...data, content: e.target.content });
  };
  const fileOnChangeEventHandler = (e) => {
    data({ ...data, file: e.target.files });
  };
  const counselregisthandler = () => {
    let params = new FormData();
    params.append("files", data);
    params.append("consulting", {
      title: data.title,
      content: data.content,
      largeSection: data.largeSection,
    });

    postCounselRegistApi(params).then((res) => {
      if (typeof res === "object") {
        //
      } else {
        //
      }
    });
  };
  const counselcancelhandler = () => {};
  return (
    <div className="board">
      <div className="board-header">
        <span>온라인 상담</span>
        <div>
          상담받고 싶은 내용을 입력하여 여러 전문 변호사에게 브리핑을 받아볼 수
          있습니다. 질문에 달린 브리핑 중 마음에 드는 답변을 하나 골라 해당
          변호사와 더욱 깊은 상담을 나누실 수 있습니다. 온라인 상담 등록 시,
          법봉 1개가 차감되며 답변마다 요구되는 법봉의 개수는 달라질 수
          있습니다.
        </div>
      </div>
      <div className="form-layout">
        <div className="form-title">
          <span>제목</span>
          <input
            placeholder="상담 제목을 입력해주세요"
            onChange={titleOnchangeEventHandler}
          ></input>
        </div>
        <div className="form-faq-category">
          <span>분류</span>
          <input></input>
          <Button variant="contained" className="faq-browse">
            법률 백문백답 보러가기
          </Button>
        </div>
        <div className="form-content">
          <span>내용</span>
          <input
            placeholder="상담 내용을 입력해주세요
상담 내용 등록 시 법봉 1개가 차감되며 등록 이후 수정이 불가능한 점 유의해주세요.
변호사 답변 채택 후, 깊은 상담을 이어갈 시 상담 내용은 1회 수정 가능합니다."
            onChange={contentOnchangeEventHandler}
          ></input>
        </div>
        <div className="form-attach">
          <span>첨부파일</span>
          <input
            ref={fileInput}
            type="file"
            id="file"
            onChange={fileOnChangeEventHandler}
          ></input>
        </div>
        <div className="counsel-btn">
          <Button className="counsel-regist-btn" onclick={counselregisthandler}>
            등록하기
          </Button>
          <Button className="counsel-cancel-btn" onclick={counselcancelhandler}>
            취소하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CounselWrite;
