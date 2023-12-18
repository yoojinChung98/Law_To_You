import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import commUtil from "../../util/commUtil";
import "../scss/Login.scss";

const LoginForm = ({ mode, setMode }) => {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    id: "",
    pw: "",
  });

  const CLIENT_MODE = "의뢰인";
  const LAWYER_MODE = "변호사";

  const idOnChangeEventHandler = (e) => {
    setLoginForm({ ...loginForm, id: e.target.value });
  };

  const pwOnChangeEventHandler = (e) => {
    setLoginForm({ ...loginForm, pw: e.target.value });
  };

  const loginBtnOnClick = () => {
    // login api 사용해야 함
    if (loginForm.id === "jisu" && loginForm.pw === "1111") {
      localStorage.setItem("accessToken", true);
      navigate("/");
    } else {
      // login 실패 로직
      setOpen(true);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoinSelector = () => {
    navigate("/join", { state: { mode: mode } });
  };

  // const join = `/join/?mode=${client}`;

  return (
    <>
      <div className="login-wrapper">
        <div className="login-header">
          {mode === "client" ? CLIENT_MODE : LAWYER_MODE} 로그인
        </div>
        <div className="login-form">
          <div>
            <TextField
              id="id"
              label="아이디"
              placeholder="아이디 입력"
              variant="standard"
              onChange={idOnChangeEventHandler}
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="pw"
              label="비밀번호"
              placeholder="비밀번호 입력"
              variant="standard"
              onChange={pwOnChangeEventHandler}
              fullWidth
            />
          </div>
          <Button
            className="login-button"
            variant="contained"
            disabled={
              commUtil.isEmpty(loginForm.id) || commUtil.isEmpty(loginForm.pw)
            }
            onClick={loginBtnOnClick}
          >
            로그인
          </Button>
          <Button
            className="login-button"
            variant="contained"
            onClick={() => {
              setMode(null);
            }}
          >
            뒤로가기
          </Button>
          {mode === "client" && (
            <div className="login-btn-apis">
              <img src="/img/login-btn-naver-green.png" alt="naver login" />
              <img src="/img/kakao_login_medium_narrow.png" alt="naver login" />
            </div>
          )}
          <div className="navigate-join">
            {/* <Link to={"/join?mode=" + mode}>회원가입</Link> */}
            {/* <Link to={`/join?mode=${mode}`}>회원가입</Link> */}
            <button onClick={handleJoinSelector}>회원가입</button>
          </div>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">로그인 실패</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              아이디 또는 비밀번호가 일치하지 않습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default LoginForm;
