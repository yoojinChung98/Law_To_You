import { Button } from "@mui/material";
import React from "react";
import "../scss/Board.scss";

const CounselWrite = () => {
  const counselregisthandler = () => {
    //     (이름: “consulting”)
    // {
    // title: title,
    // content: content,
    // largeSection: 이혼,
    // },
    // (이름: “files”)
    // List<Multipart> multipartFiles,
    //       accessToken: {
    //         Authorization: localStorage.getItem("accessToken"),
    //       },
  };
  const counselcancelhandler = () => {};
  return (
    <div className="form-layout">
      <div className="form-title">
        <span>제목</span>
        <input placeholder="상담 제목을 입력해주세요"></input>
      </div>
      <div className="form-faq-category">
        <span>분류</span>
        <input></input>
        <Button variant="contained" className="faq-browse">
          법률 백문백답 보러가기
        </Button>
      </div>
      <div className="form-content">
        <span>내용</span>
        <input
          placeholder="상담 내용을 입력해주세요
상담 내용 등록 시 법봉 1개가 차감되며 등록 이후 수정이 불가능한 점 유의해주세요.
변호사 답변 채택 후, 깊은 상담을 이어갈 시 상담 내용은 1회 수정 가능합니다."
        ></input>
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
  );
};

export default CounselWrite;
