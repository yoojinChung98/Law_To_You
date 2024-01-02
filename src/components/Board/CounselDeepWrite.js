import Button from "@mui/material/Button";
import React from "react";
import "../scss/Board.scss";

const CounselDeepWrite = () => {
  const counselregisthandler = () => {
    //     (이름: “detailedConsulting”)
    // {
    // consultNum: 상담번호
    // title: title,
    // content: content
    // },
    // (이름: “files”)
    // List<Multipart> multipartFiles,
    // * 헤더에 토큰 담아서 보내주세요
    // 배열에 첨부파일 경로 보내주시면 됩니다
    // → formData객체 활용할 것
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
          <input placeholder="상담 제목을 입력해주세요"></input>
        </div>
        <div className="form-content">
          <span>내용</span>
          <input placeholder="깊은 상담 내용을 입력해주세요."></input>
        </div>
        <div className="form-attach">
          <span>첨부파일</span>
          <input></input>
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

export default CounselDeepWrite;
