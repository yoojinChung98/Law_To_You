import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postFreeWriteApi } from "../../api/board/FreeBoardApi";
import Editor from "../common/Editor";
import "../scss/Board.scss";
const BoardFreeWrite = () => {
  const navigate = useNavigate();

  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState({
    title: "",
    content: "",
    attachedFile: [],
  });

  const postBtnOnClick = () => {
    let params = {
      title: content.title,
      content: content.content,
      attachedFile: content.attachedFile,
    };
    postFreeWriteApi(params).then((res) => {
      console.log(res);
      if (res.status === 200) {
        navigate("/");
      } else {
      }
    });
  };

  return (
    <div className="board">
      <div className="board-header">
        <span>글 작성하기</span>
      </div>
      <div className="write-form">
        <input className="write-title" placeholder="제목을 입력하세요" />
        {/* <div className="write-style">
          <Icon icon="ph:text-b-bold" width="30" height="30" />
          <Icon icon="ph:text-b" width="30" height="30" />
          <Icon icon="ph:text-b-light" width="30" height="30" />
        </div>
        <textarea className="write-content" placeholder="본문을 입력하세요" /> */}
        <Editor
          height={"270px"}
          onChange={setContent} // setter 넣기
          data={content} //getter 넣기
          editor={setEditor}
        />
      </div>
      <div className="button-wrapper">
        <Button
          className="regist-button"
          variant="contained"
          onClick={postBtnOnClick}
        >
          등록
        </Button>
        <Button
          className="cancel-button"
          variant="contained"
          onClick={() => {
            navigate("/free");
          }}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default BoardFreeWrite;
