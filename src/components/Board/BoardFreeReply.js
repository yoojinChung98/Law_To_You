// import { Button } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { getFreeDetailApi } from "../../api/board/FreeBoardApi";
// import { getReplyListApi } from "../../api/board/ReplyApi";
// import { useAppSelector } from "../../store";
// import Editor from "../common/Editor";

// function GetData() {
//   const [data, setData] = useState({});
//   let params = {
//     bno: "3",
//   };

//   useEffect(() => {
//     getFreeDetailApi(params).then((res) => {
//       if (res.status === 200) {
//         setData(res.data);
//         console.log(res.data);
//       }
//     });
//   }, []);
//   return data;
// }

// function GetReply() {
//   const [reply, setReply] = useState({});
//   let params = {
//     bno: 1,
//   };

//   useEffect(() => {
//     getReplyListApi(params).then((res) => {
//       if (res.status === 200) {
//         setReply(res.data);
//         console.log(res.data);
//       }
//     });
//   }, []);

//   const item = reply?.replyList?.map((item) => (
//     <div className="replies" key={item.writer + item.content}>
//       <div className="replies-writer">{item.writer}</div>
//       <div className="replies-content">{item.content}</div>
//       <div className="replies-date">{item.regDate}</div>
//       if(!{item.deleteButton})
//       {
//         <Button className="reply-delete-button" variant="contained">
//           삭제
//         </Button>
//       }
//     </div>
//   ));
//   return item;
// }

// const BoardFreeReply = () => {
//   const mode = useAppSelector((state) => state.user.mode);
//   const nick = useAppSelector((state) => state.user.nick);
//   const name = useAppSelector((state) => state.user.name);

//   const [editor, setEditor] = useState(null);
//   const [content, setContent] = useState("");

//   const data = GetData();
//   const reply = GetReply();

//   return (
//     <>
//       <div className="board">
//         <div className="detail-wrapper">
//           <div className="detail-title">{data.title}</div>
//           <Editor
//             style={{ height: "300px" }}
//             onChange={setContent} // setter 넣기
//             data={data.content} //getter 넣기
//             editor={setEditor}
//             readOnly
//           />
//         </div>
//         if({data.TrueFalse} === "1")
//         {
//           <div className="detail-button">
//             <Button
//               className="detail-modify-button"
//               variant="contained"
//               onClick={replyModifyBtn}
//             >
//               수정
//             </Button>
//             <Button
//               className="detail-delete-button"
//               variant="contained"
//               onClick={replyDeleteBtn}
//             >
//               삭제
//             </Button>
//           </div>
//         }
//         <div className="reply-wrapper">
//           <div className="reply-writer">{mode === "user" ? nick : name}</div>
//           <div className="reply-cb">
//             <input
//               className="reply-content"
//               placeholder="댓글을 입력해주세요"
//             ></input>
//             <Button
//               className="reply-button"
//               variant="contained"
//               onClick={replyRegistBtn}
//             >
//               등록
//             </Button>
//           </div>
//         </div>
//         {reply}
//       </div>
//     </>
//   );
// };

// export default BoardFreeReply;
