import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import { setUser } from "../../store/userSlice";
import commUtil from "../../util/commUtil";
import Editor from "../common/Editor";
const dispatch = useAppDispatch;

const BoardFreeReply = () => {
  const mode = useAppSelector((state) => state.user.mode);
  // const nick = useAppSelector((state) => state.user.nickname);
  const name = useAppSelector((state) => state.user.name);
  dispatch(setUser({}));

  const [queryParams] = useSearchParams();
  const bno = queryParams.get("bno") ?? null;

  const editorRef = useRef(null);

  const [detail, setDetail] = useState({});

  // 댓글 리스트 가져오기
  const [reply, setReply] = useState({
    count: "",
    replyList: [
      {
        lawyerId: "",
        userId: "",
        bno: "",
        rno: "",
        content: "",
        writer: "",
        regDate: "",
        deleteButton: "",
      },
    ],
  });

  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState("");

  const searchDetail = () => {
    const params = { bno };
    getFreeDetailApi(params)
      .then((res) => {
        setDetail(res);
        setContent(res.content);
        searchReply();
        console.log(mode);
        console.log(name);
      })
      .catch((error) => {
        console.log(error);
        if (bno === "1") {
          setDetail({
            TrueFalse: 1,
            title: "제목",
            content: "<p>안녕하세요<strong>변호사</strong>에요</p>",
            writer: "작성자",
            routes: [],
            regDate: "23.1.1",
          });
          setContent("<p>안녕하세요<strong>변호사</strong>에요</p>");
        } else {
          setDetail({
            TrueFalse: 0,
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

  const searchReply = () => {
    const params = { page: 1, size: 10, bno };
    getReplyListApi(params)
      .then((res) => {
        if (typeof res === "object") {
          setReply(res);
          console.log(reply);
        }
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

  const [replyContent, setReplyContent] = useState("");
  // 댓글 등록
  const onChaneReplyContent = (e) => {
    setReplyContent(e.target.value);
  };

  const replyRegistBtn = () => {
    let pa = {
      bno: Number(bno),
      content: replyContent,
    };
    postReplyApi(pa).then((res) => {
      if (res === 200) {
        alert("댓글등록");
        searchReply();
      }
    });
  };

  //   // 댓글 리스트 가져오기
  //   useEffect(() => {
  //     getReplyList(3);
  //   }, []);

  //   const getReplyList = (bno) => {
  //     let param = {
  //       bno: bno,
  //     };
  //     getReplyListApi(param).then((res) => {
  //       if (typeof res === "object") {
  //         detail.setDetail(res);
  //         console.log(detail);
  //       }
  //     });
  //   };

  // 댓글 삭제
  const replyDeleteBtn = () => {
    let params = {
      rno: 3,
    };
    deleteReplyApi(params).then((res) => {
      if ((res.status = 200)) {
        alert("댓글삭제");
        searchReply();
      }
    });
  };

  // 글 수정
  const detailModifyBtn = () => {
    let para = {
      freeboard: {
        bno: 3,
        title: "",
        content: "",
        routes: "",
        attchedFile: [],
      },
    };
    putFreeModifyApi(para).then((res) => {
      if (res.status === 200) {
        alert("수정요");
        searchReply();
      }
    });
  };
  // 글 삭제
  const detailDeleteBtn = () => {
    let par = {
      bno: 3,
    };
    deleteFreeDeleteApi(par).then((res) => {
      if (res.status === 200) {
        alert("삭제삭제");
        searchReply();
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
          <div className="detail-title">{detail.title}</div>
          {commUtil.isNotEmpty(detail) && (
            <Editor
              style={{ height: "200px" }}
              onChange={setContent} // setter 넣기
              data={content ?? ""} //getter 넣기
              editor={setEditor}
              readOnly={detail.TrueFalse !== 1}
            />
          )}
        </div>
        {detail.TrueFalse === 1 && (
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
              onChange={onChaneReplyContent}
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
          <div className="replies" key={item.writer + item.content}>
            <div className="replies-writer">{item.writer}</div>
            <div className="replies-content">{item.content}</div>
            <div className="replies-date">{item.regDate}</div>
            {!item.deleteButton && (
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
