// 댓글작성, 댓글 삭제 버튼 띄우기 까지.

import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  deleteFreeDeleteApi,
  getFreeDetailApi,
  putFreeModifyApi,
} from "../../api/board/FreeBoardApi";
import {
  deleteReplyApi,
  getReplyListApi,
  postReplyApi,
} from "../../api/board/ReplyApi";
import { useAppDispatch, useAppSelector } from "../../store";
import commUtil from "../../util/commUtil";
import Editor from "../common/Editor";
const BoardFreeReply = () => {
  const dispatch = useAppDispatch;

  const loggedUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  const mode = useAppSelector((state) => state.user.mode);
  const id = loggedUser.id;
  const name = loggedUser.name;

  // dispatch(setUser({}));

  const [queryParams] = useSearchParams();
  const bno = queryParams.get("bno") ?? null;

  const editorRef = useRef(null);

  const [detail, setDetail] = useState({});
  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const searchDetail = () => {
    const params = { bno };
    getFreeDetailApi(params)
      .then((res) => {
        setDetail(res);
        setContent(res.content);
        setTitle(res.title);
        searchReply();
        console.log(mode);
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log(error);
        if (bno === "1") {
          setDetail({
            trueFalse: 1,
            title: "제목",
            content: "<p>안녕하세요<strong>변호사</strong>에요</p>",
            writer: "작성자",
            routes: [],
            regDate: "23.1.1",
          });
          setContent("<p>안녕하세요<strong>변호사</strong>에요</p>");
        } else {
          setDetail({
            trueFalse: 0,
            title: "두번째 제목",
            content: "<p>안녕하세요<strong>변호사</strong>아님</p>",
            writer: "작성자두번째",
            routes: [],
            regDate: "23.1.1",
          });
          setContent("<p>안녕하세요<strong>변호사</strong>아님</p>");
        }
        searchReply();
      });
  };

  // 댓글 리스트 가져오기
  const [reply, setReply] = useState({
    count: "",
    replyList: [],
  });

  const searchReply = () => {
    const params = { page: 1, size: 10, bno };
    getReplyListApi(params)
      .then((res) => {
        setReply(res);
      })
      .catch((error) => {
        // dummy
        setReply({
          count: 2,
          replyList: [
            {
              lawyerId: "aaa",
              userId: "ddd",
              content: "ㅋㅋ",
              writer: "ddd",
              regDate: "23.12.7",
              deleteButton: true,
            },
            {
              lawyerId: "bbb",
              userId: "eee",
              content: "퓨ㅠㅠ",
              writer: "eee",
              regDate: "23.12.7",
              deleteButton: true,
            },
            {
              lawyerId: "ccc",
              userId: "fff",
              content: "ㅎㅎ",
              writer: "fff",
              regDate: "23.12.7",
              deleteButton: true,
            },
          ],
        });
      });
  };

  const [replyContent, setReplyContent] = useState({
    // bno: Number(bno),
    content: "",
    rno: "",
  });
  // 댓글 등록
  const onChangeReplyContent = (e) => {
    setReplyContent(e.target.value);
  };

  let params = {
    bno: bno,
    content: replyContent,
  };
  const replyRegistBtn = () => {
    postReplyApi(params).then((res) => {
      if (typeof res === "object") {
        setReplyContent(res);
        alert("댓글등록");
        searchReply();
      }
    });
  };

  // 댓글 삭제
  const replyDeleteBtn = () => {
    console.log();
    let params = {
      rno: replyContent.rno,
    };
    // console.log(rno);
    deleteReplyApi(params).then((res) => {
      if (res.status === 200) {
        console.log(res);
        // alert(res.text());
        searchReply();
      } else {
        // alert(res.text());
      }
    });
  };

  // 글 수정
  const fileInput = useRef(null);
  const [attachedFile, setAttachedFile] = useState(null); // 파일
  const afOnChangeEventHandler = (e) => {
    // setAttachedFile({ attachedFile: e.target.files });
    setAttachedFile({ attachedFile });
  };

  const [newTitle, setNewTitle] = useState();
  const [newContent, setNewContent] = useState();

  const newTitleHandler = (e) => {
    // setNewTitle(e.target.value);
    setTitle(e.target.value);
    console.log(e.target.value);
  };
  const newContentHandler = (e) => {
    // setNewContent(content);
    setContent(e.target.value);
  };

  const detailModifyBtn = () => {
    const routes = detail.routes.join(", ");

    console.log("routes", routes);
    let formData = new FormData();

    let files = document.getElementById("attachedFile").files;
    for (let file of files) {
      console.log("file: ", file);
      formData.append("attchedFile", file);
    }

    let params = {
      freeboard: {
        bno: Number(bno),
        title: title,
        content: content,
        routes: routes,
      },
    };
    // for (let x = 0; x < files.length; x++) {
    //   formData.append("attchedFile", files[x]);
    //   // formData.append("attachedFile", routes);
    // }

    console.log("params", params);
    formData.append(
      "freeboard",
      new Blob([JSON.stringify(params)], { type: "application/json" })
    );
    console.log("api들어가기전");
    console.log(formData);
    putFreeModifyApi(formData).then((res) => {
      console.log("api", res);
      if (res.status === 200) {
        setTitle(newTitle);
        console.log("newTitle", newTitle);
        setContent(newContent);
        searchReply();
        // searchDetail();
        navigate("/free");
      }
    });
  };

  // 글 삭제
  const detailDeleteBtn = () => {
    let param = {
      bno: bno,
    };
    deleteFreeDeleteApi(param).then((res) => {
      if (typeof res === "string") {
        alert("게시글이 삭제되었습니다.");
        searchReply();
        navigate("/free");
      }
    });
  };

  useEffect(() => {
    searchDetail();
  }, []);

  return (
    <>
      <div className="board">
        <div className="detail-wrapper">
          <div className="detail-title">
            {detail.trueFalse !== 1 ? (
              detail.title
            ) : (
              <input
                // enctype="multipart/form-data"
                defaultValue={detail.title}
                onChange={newTitleHandler}
                value={newTitle}
              ></input>
            )}
          </div>
          {
            commUtil.isNotEmpty(detail) && (
              // (detail.trueFalse === 1 ? (
              <Editor
                style={{ height: "200px" }}
                onChange={setContent} // setter 넣기
                data={content ?? ""} //getter 넣기
                editor={setEditor}
                readOnly={detail.trueFalse !== 1}
              />
            )
            // ) : (
            //   <Editor
            //     style={{ height: "200px" }}
            //     // onChange={setContent} // setter 넣기
            //     // onChange={newContentHandler}
            //     data={content ?? ""} //getter 넣기
            //     editor={setEditor}
            //     readOnly={detail.trueFalse !== 1}
            //   />
            // ))
          }

          {detail.trueFalse === 1 ? (
            <>
              <div>이미지이미지</div>
              <input
                // enctype="multipart/form-data"
                id="attachedFile"
                ref={fileInput}
                // accept="image/*"
                onChange={afOnChangeEventHandler}
                type="file"
                multiple
              />
            </>
          ) : (
            <img></img>
          )}
        </div>

        {detail.trueFalse === 1 && (
          <div className="detail-button">
            <Button
              className="detail-modify-button"
              variant="contained"
              onClick={detailModifyBtn}
            >
              수정
            </Button>
            <Button
              className="detail-delete-button"
              variant="contained"
              onClick={detailDeleteBtn}
            >
              삭제
            </Button>
          </div>
        )}
        <div className="reply-wrapper">
          <div className="reply-writer">{name}</div>
          <div className="reply-cb">
            <input
              className="reply-content"
              onChange={onChangeReplyContent}
              placeholder="댓글을 입력해주세요"
            ></input>
            <Button
              className="reply-button"
              variant="contained"
              onClick={replyRegistBtn}
            >
              등록
            </Button>
          </div>
        </div>
        {reply.replyList.map((item) => (
          <div className="replies" key={item.rno + item.content}>
            <div className="replies-writer">{item.writer}</div>
            <div className="replies-content">{item.content}</div>
            <div className="replies-date">{item.regDate}</div>
            {item.deleteButton && (
              <Button
                className="reply-delete-button"
                variant="contained"
                onClick={replyDeleteBtn}
              >
                삭제
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default BoardFreeReply;
