import { Button } from "@mui/material";
import Input from "@mui/material/Input";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postFreeWriteApi } from "../../api/board/FreeBoardApi";
import Editor from "../common/Editor";
import "../scss/Board.scss";

const BoardFreeWrite = () => {
  const navigate = useNavigate();

  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [attchedFile, setAttchedFile] = useState([]);
  const afOnChangeEventHandler = (e) => {
    setAttchedFile({ attachedFile: e.target.files[0] });
  };

  const postBtnOnClick = () => {
    let param = {
      freeboards: {
        title: title,
        content: content,
      },
    };

    let params = new FormData();
    params.append("attachedFile", attchedFile);
    params.append("freeboards", param);
    postFreeWriteApi(params).then((res) => {
      console.log(res);
      if (res.status === 200) {
        navigate("/");
      } else {
      }
    });
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  // const afOnChangeEventHandler = (e) => {
  //   setAttchedFile(e.target.files[0]);
  // };
  const fileInput = useRef(null);

  return (
    <div className="board">
      <div className="board-header">
        <span>글 작성하기</span>
      </div>
      <div className="write-form">
        <input
          className="write-title"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={onChangeTitle}
        />
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
        <Input
          id="attachedFile"
          ref={fileInput}
          // accept="image/*"
          onChange={afOnChangeEventHandler}
          type="file"
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
