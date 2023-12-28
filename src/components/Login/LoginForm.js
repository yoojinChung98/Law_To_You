import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoginApi } from "../../api/login/LoginApi";
import { KAKAO_AUTH_URL } from "../../config/kakao-config";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/userSlice";

import commUtil from "../../util/commUtil";
import "../scss/Login.scss";

const LoginForm = ({ mode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginForm, setLoginForm] = useState({
    id: "",
    password: "",
  });

  const CLIENT_MODE = "의뢰인";
  const LAWYER_MODE = "변호사";

  const idOnChangeEventHandler = (e) => {
    setLoginForm({ ...loginForm, id: e.target.value });
  };

  const passwordOnChangeEventHandler = (e) => {
    setLoginForm({ ...loginForm, password: e.target.value });
  };

  const loginBtnOnClick = () => {
    getLoginApi(loginForm).then((res) => {
      if (res.status === "200") {
        // 로그인 성공
        localStorage.setItem("accessToken", res.data.accessToken);
        const userInfo = { id: res.data.id, mode: res.data.authority };

        dispatch(setUser(userInfo));

        navigate("/");
      } else {
        // 로그인 실패
        setOpen(true);
      }
    });

    // login api 사용해야 함
    // if (
    //   loginForm.id === "jisu" &&
    //   loginForm.password === "1111" &&
    //   mode === "user"
    // ) {
    //   localStorage.setItem("accessToken", true);
    //   const userInfo = { id: "jisu", nickname: null, mode };

    //   dispatch(setUser(userInfo));
    //   // dispatch(setMode("user"));
    //   console.log(mode);
    //   navigate("/");
    // } else if (
    //   loginForm.id === "js" &&
    //   loginForm.password === "1111" &&
    //   mode === "lawyer"
    // ) {
    //   localStorage.setItem("accessToken", true);
    //   const userInfo = { id: "js", nickname: "jisu", mode };
    //   dispatch(setUser(userInfo));
    //   // dispatch(setMode("lawyer"));
    //   navigate("/");
    // } else {
    //   // login 실패 로직
    //   setOpen(true);
    // }
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

  // const join = `/join/?mode=${user}`;

  return (
    <>
      <div className="login-wrapper">
        <div className="login-header">
          {mode === "user" ? CLIENT_MODE : LAWYER_MODE} 로그인
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
              id="password"
              label="비밀번호"
              placeholder="비밀번호 입력"
              variant="standard"
              onChange={passwordOnChangeEventHandler}
              fullWidth
            />
          </div>
          <Button
            className="login-button"
            variant="contained"
            disabled={
              commUtil.isEmpty(loginForm.id) ||
              commUtil.isEmpty(loginForm.password)
            }
            onClick={loginBtnOnClick}
          >
            로그인
          </Button>
          <Button className="login-button" variant="contained">
            뒤로가기
          </Button>
          {mode === "user" && (
            <div className="login-btn-apis">
              <a href={KAKAO_AUTH_URL} target="_blank">
                <img
                  alt="kakaobtn"
                  src={require("../../assets/img/kakao_login_medium_narrow.png")}
                ></img>
              </a>
              <a>
                <img
                  alt="naverbtn"
                  src={require("../../assets/img/login-btn-naver-green.png")}
                ></img>
              </a>
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
