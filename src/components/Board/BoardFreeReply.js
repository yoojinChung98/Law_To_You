import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import { setUser } from "../../store/userSlice";
import commUtil from "../../util/commUtil";
import Editor from "../common/Editor";
const dispatch = useAppDispatch;

const BoardFreeReply = () => {
  const navigate = useNavigate();

  const mode = useAppSelector((state) => state.user.mode);
  // const nick = useAppSelector((state) => state.user.nickname);
  const name = useAppSelector((state) => state.user.name);
  dispatch(setUser({}));

  const [queryParams] = useSearchParams();
  const bno = queryParams.get("bno") ?? null;

  const editorRef = useRef(null);

  const [detail, setDetail] = useState({});
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
        // console.log(reply);
        searchReply();
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
  });
  // 댓글 등록
  const onChangeReplyContent = (e) => {
    // console.log(e.target.value);
    setReplyContent(e.target.value);
  };

  let params = {
    bno: Number(bno),
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
    let params = {
      freeboard: {
        bno: 3,
        title: "",
        content: "",
        routes: "",
        attchedFile: [],
      },
    };
    putFreeModifyApi(params).then((res) => {
      if (res.status === 200) {
        alert("수정요");
        searchReply();
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
        // searchReply();
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
          <div className="detail-title">{detail.title}</div>
          {commUtil.isNotEmpty(detail) && (
            <Editor
              style={{ height: "200px" }}
              onChange={setContent} // setter 넣기
              data={content ?? ""} //getter 넣기
              editor={setEditor}
              readOnly={detail.trueFalse !== 1}
            />
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
            {/* <div className="replies-writer">{item.writer}</div> */}
            <div className="replies-content">{item.content}</div>
            {/* <div className="replies-date">{item.regDate}</div> */}
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
