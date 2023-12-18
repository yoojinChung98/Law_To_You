import { Button, Input } from "@mui/material";
import React, { useState } from "react";
import commUtil from "../../util/commUtil";
import "../scss/Join.scss";

const JoinForm = ({ mode, setMode }) => {
  // const mode = useLocation().state.mode;

  const [joinForm, setJoinForm] = useState({
    id: "",
    nick: "",
    name: "",
    pw: "",
    pwcheck: "",
    email: "",
    cnum: "",
  });

  const CLIENT_MODE = "의뢰인";
  const LAWYER_MODE = "변호사";

  const idOnChangeEventHandler = (e) => {
    setJoinForm({ ...joinForm, id: e.target.value });
  };

  const nickOnChangeEventHandler = (e) => {
    setJoinForm({ ...joinForm, nick: e.target.value });
  };
  const nameOnChangeEventHandler = (e) => {
    setJoinForm({ ...joinForm, name: e.target.value });
  };
  const pwOnChangeEventHandler = (e) => {
    setJoinForm({ ...joinForm, pw: e.target.value });
  };
  const pwcheckOnChangeEventHandler = (e) => {
    setJoinForm({ ...joinForm, pwcheck: e.target.value });
  };
  const emailOnChangeEventHandler = (e) => {
    setJoinForm({ ...joinForm, email: e.target.value });
  };
  const cnumOnChangeEventHandler = (e) => {
    setJoinForm({ ...joinForm, cnum: e.target.value });
  };
  const acOnChangeEventHandler = (e) => {
    setJoinForm({ ...joinForm, ac: e.target.value });
  };
  const arnOnChangeEventHandler = (e) => {
    setJoinForm({ ...joinForm, arn: e.target.value });
  };

  return (
    <div className="join-wrapper">
      <div className="join-header">
        {mode === "client" ? CLIENT_MODE : LAWYER_MODE} 회원가입
      </div>
      <div className="join-form">
        <div>
          <div>아이디</div>
          <Input
            id="id"
            onChange={idOnChangeEventHandler}
            placeholder="아이디 입력"
          />
          <Button
            className="input-button"
            variant="contained"
            disabled={commUtil.isEmpty(joinForm.id)}
          >
            중복확인
          </Button>
        </div>

        {mode === "client" ? (
          <div>
            <div>닉네임</div>
            <Input
              id="nick"
              onChange={nickOnChangeEventHandler}
              placeholder="닉네임 입력"
            />
            <Button
              className="input-button"
              variant="contained"
              disabled={commUtil.isEmpty(joinForm.nick)}
            >
              중복확인
            </Button>
          </div>
        ) : (
          <div>
            <div>이름</div>
            <Input
              id="name"
              onChange={nameOnChangeEventHandler}
              placeholder="이름 입력"
            />
            <Button
              className="input-button"
              variant="contained"
              disabled={commUtil.isEmpty(joinForm.name)}
            >
              중복확인
            </Button>
          </div>
        )}

        <div>
          <div>비밀번호</div>
          <Input
            id="pw"
            onChange={pwOnChangeEventHandler}
            placeholder="비밀번호 입력"
          />
        </div>
        <div>
          <div>비밀번호 확인</div>
          <Input
            id="pwcheck"
            onChange={pwcheckOnChangeEventHandler}
            placeholder="비밀번호 확인"
          />
        </div>
        <div>
          <div>이메일</div>
          <Input
            id="email"
            onChange={emailOnChangeEventHandler}
            placeholder="이메일 입력"
          />
          <Button
            className="input-button"
            variant="contained"
            disabled={commUtil.isEmpty(joinForm.email)}
          >
            인증번호 전송
          </Button>
        </div>
        <div>
          <div>인증번호</div>
          <Input
            id="cnum"
            onChange={cnumOnChangeEventHandler}
            placeholder="인증번호 확인"
          />
          <Button
            className="input-button"
            variant="contained"
            disabled={commUtil.isEmpty(joinForm.cnum)}
          >
            인증번호 확인
          </Button>
        </div>

        {mode === "lawyer" && (
          <>
            <div>
              <div>변호사증</div>
              <Input id="ac" onChange={acOnChangeEventHandler} />
              <Button
                className="input-button"
                variant="contained"
                disabled={commUtil.isEmpty(joinForm.ac)}
              >
                첨부하기
              </Button>
            </div>
            <div>
              <div>변호사 등록번호</div>
              <Input
                id="arn"
                onChange={arnOnChangeEventHandler}
                placeholder="변호사 등록번호 입력"
              />
            </div>
          </>
        )}

        {mode === "client" ? (
          <Button
            className="join-button"
            variant="contained"
            disabled={
              commUtil.isEmpty(joinForm.id) ||
              commUtil.isEmpty(joinForm.nick) ||
              commUtil.isEmpty(joinForm.pw) ||
              commUtil.isEmpty(joinForm.pwcheck) ||
              commUtil.isEmpty(joinForm.email) ||
              commUtil.isEmpty(joinForm.cnum) ||
              commUtil.isEmpty(joinForm.ac) ||
              commUtil.isEmpty(joinForm.arn)
            }
            //   onClick={loginBtnOnClick}
          >
            회원가입
          </Button>
        ) : (
          <Button
            className="join-button"
            variant="contained"
            disabled={
              commUtil.isEmpty(joinForm.id) ||
              commUtil.isEmpty(joinForm.name) ||
              commUtil.isEmpty(joinForm.pw) ||
              commUtil.isEmpty(joinForm.pwcheck) ||
              commUtil.isEmpty(joinForm.email) ||
              commUtil.isEmpty(joinForm.cnum) ||
              commUtil.isEmpty(joinForm.ac) ||
              commUtil.isEmpty(joinForm.arn)
            }
            //   onClick={loginBtnOnClick}
          >
            회원가입
          </Button>
        )}
      </div>
    </div>
  );
};

export default JoinForm;
