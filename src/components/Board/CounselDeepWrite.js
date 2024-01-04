import Button from "@mui/material/Button";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { putDeepRegistApi } from "../../api/board/CounselWriteApi";
import "../scss/Board.scss";

const CounselDeepWrite = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const qTitle = location.state.qTitle;
  const qRoutes = location.state.qRoutes;
  const qWriter = location.state.qWriter;
  const qContent = location.state.qContent;

  console.log("qTitle 값은: ", qTitle);
  console.log("qContent의 값은: ", qContent);

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

  const counselcancelhandler = () => {
    navigate("/mycounsel/");
  };

  return (
    <div className="board">
      <div className="board-header">
        <span>깊은 상담</span>
        <div>
          온라인 상담에 남겨주었던 내용을 바탕으로 선택하신 담당 변호사와 더욱
          심도깊은 상담을 받을 수 있는 서비스입니다. 깊은 상담 등록 시 채택한
          답변에 명시된 요구 법봉의 개수만큼 보유하신 법봉의 개수가 차감됩니다.
          깊은 상담은 질문 등록 후 수정이 불가능하오니 신중하게 답변을
          등록하시길 바랍니다.
        </div>
      </div>
      <div className="form-layout">
        <div className="form-title">
          <span>제목</span>
          <input
            placeholder="상담 제목을 입력해주세요"
            onChange={titleOnchangeEventHandler}
            value={qTitle}
          ></input>
        </div>
        <div className="form-content">
          <span>내용</span>

          <textarea
            placeholder="깊은 상담 내용을 입력해주세요."
            onChange={contentOnchangeEventHandler}
          >
            {qContent}
          </textarea>
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
