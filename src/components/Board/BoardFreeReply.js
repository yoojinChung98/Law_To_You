import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  deleteFreeDeleteApi,
  putFreeModifyApi,
} from "../../api/board/FreeBoardApi";
import {
  deleteReplyApi,
  getReplyListApi,
  postReplyApi,
} from "../../api/board/ReplyApi";
import { useAppSelector } from "../../store";
import Editor from "../common/Editor";

const BoardFreeReply = () => {
  const mode = useAppSelector((state) => state.user.mode);
  const nick = useAppSelector((state) => state.user.nick);
  const name = useAppSelector((state) => state.user.name);

  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState("");

  // 댓글 등록
  const replyRegistBtn = () => {
    let pa = {
      reply: {},
    };
    postReplyApi(pa).then((res) => {
      if (res === 200) {
        alert("댓글등록");
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

  // 댓글 리스트 가져오기
  const [reply, setReply] = useState({
    count: 0,
    replyList: [],
  });
  let params = {
    bno: 1,
  };
  useEffect(() => {
    getReplyListApi(params).then((res) => {
      if (typeof res === "object") {
        reply.setReply(res);
        console.log(reply);
      }
    });
  }, []);

  // 댓글 삭제
  const replyDeleteBtn = () => {
    let params = {
      rno: 3,
    };
    deleteReplyApi(params).then((res) => {
      if ((res.status = 200)) {
        alert("댓글삭제");
      }
    });
  };

  // 글 상세 ...
  const [detail, setDetail] = useState({});
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
      }
    });
  };

  return (
    <>
      <div className="board">
        <div className="detail-wrapper">
          <div className="detail-title">{detail.title}</div>
          <Editor
            style={{ height: "300px" }}
            onChange={setContent} // setter 넣기
            detail={detail.content ?? ""} //getter 넣기
            editor={setEditor}
            readOnly
          />
        </div>
        {detail.TrueFalse === "1" && (
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
          <div className="reply-writer">{mode === "user" ? nick : name}</div>
          <div className="reply-cb">
            <input
              className="reply-content"
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
        ;
      </div>
    </>
  );
};

export default BoardFreeReply;
