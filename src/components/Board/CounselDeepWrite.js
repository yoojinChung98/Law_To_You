import Button from "@mui/material/Button";
import React, { useRef, useState } from "react";
import { putDeepRegistApi } from "../../api/board/CounselWriteApi";
import "../scss/Board.scss";

const CounselDeepWrite = () => {
  const [data, setData] = useState({
    consultNum: 1,
    title: "",
    content: "",
  });

  const fileInput = useRef(null);

  const titleOnchangeEventHandler = (e) => {
    setData({ ...data, title: e.target.value });
  };
  const contentOnchangeEventHandler = (e) => {
    setData({ ...data, content: e.target.value });
  };
  const fileOnChangeEventHandler = (e) => {
    setData({ ...data, file: e.target.files[0] });
  };
  const counselregisthandler = () => {
    console.log("clcl");
    let params = {
      consultNum: data.consultNum,
      title: data.title,
      content: data.content,
    };

    let formData = new FormData();

    let files = document.getElementById("files").files;
    for (let x = 0; x < files.length; x++) {
      formData.append("attachedFile", files[x]);
    }

    formData.append(
      "detailedConsulting",
      new Blob([JSON.stringify(params)], { type: "application/json" })
    );

    putDeepRegistApi(formData).then((res) => {
      if (typeof res === "object") {
        alert("깊은상담등록!");
      } else {
        //
      }
    });
  };

  const counselcancelhandler = () => {};
  return (
    <div className="board">
      <div className="board-header">
        <span>깊은 상담</span>
        <div>
          깊은 상담입니다 ~~ 상담받고 싶은 내용을 입력하여 여러 전문 변호사에게
          브리핑을 받아볼 수 있습니다. 질문에 달린 브리핑 중 마음에 드는 답변을
          하나 골라 해당 변호사와 더욱 깊은 상담을 나누실 수 있습니다. 온라인
          상담 등록 시, 법봉 1개가 차감되며 답변마다 요구되는 법봉의 개수는
          달라질 수 있습니다.
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
        <div className="form-content">
          <span>내용</span>
          <input
            placeholder="깊은 상담 내용을 입력해주세요."
            onChange={contentOnchangeEventHandler}
          ></input>
        </div>
        <div className="form-attach">
          <span>첨부파일</span>
          <input
            ref={fileInput}
            type="file"
            id="files"
            onChange={fileOnChangeEventHandler}
          ></input>
        </div>
        <div className="counsel-btn">
          <Button className="counsel-regist-btn" onClick={counselregisthandler}>
            등록하기
          </Button>
          <Button className="counsel-cancel-btn" onClick={counselcancelhandler}>
            취소하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CounselDeepWrite;
