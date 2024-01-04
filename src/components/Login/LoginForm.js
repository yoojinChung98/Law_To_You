import { Button, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '../../config/kakao-config';
import { NAVER_AUTH_URL } from '../../config/naver-config';
import { useAppDispatch } from '../../store';
import { setUser } from '../../store/userSlice';
import commUtil from '../../util/commUtil';
import '../scss/Login.scss';
import { API_BASE_URL } from '../../config/host-config';
import { useSelector } from 'react-redux';
const LoginForm = ({ mode, setMode }) => {
  const loggedUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loginForm, setLoginForm] = useState({
    id: '',
    password: '',
    reqAuthority: '',
  });

  const CLIENT_MODE = '의뢰인';
  const LAWYER_MODE = '변호사';

  const idOnChangeEventHandler = (e) => {
    setLoginForm({ ...loginForm, id: e.target.value });
  };

  const passwordOnChangeEventHandler = (e) => {
    setLoginForm({ ...loginForm, password: e.target.value });
  };

  const loginBtnOnClick = () => {
    fetchLogin();
  };

  const fetchLogin = async () => {
    const requestBody = {
      id: loginForm.id,
      password: loginForm.password,
      reqAuthority: mode,
    };

    const res = await fetch(API_BASE_URL + '/user/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (res.status === 200) {
      if (loggedUser.mode === 'master') {
        console.log(loggedUser.mode);
        console.log('master로그인');
        navigate('/joinList/');
        return;
      }
      const data = await res.json();
      localStorage.setItem('accessToken', data.accessToken);
      const userInfo = { id: data.id, name: data.name, mode: data.authority };
      if (data.authority === 'notApproval') {
        alert('미승인 상태의 변호사는 접근 권한이 제한될 수 있습니다.');
        userInfo.mode = 'lawyer';
      }
      dispatch(setUser(userInfo));
    } else {
      const text = await res.text();

      if (text === 'no-account') {
        alert('가입된 회원이 아닙니다.');
      } else if (text === 'wrong-password') {
        alert('비밀번호가 잘못되었습니다!');
      } else if (text === 'bad-request-authority') {
        alert(
          (mode === 'user' ? LAWYER_MODE : CLIENT_MODE + '으') +
            '로 로그인 해주십시오.'
        );
      }
    }

    navigate('/');
  };

  const goBack = () => {
    setMode(null);
    navigate('/login');
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleJoinSelector = () => {
    navigate('/join', { state: { mode: mode } });
  };

  return (
    <>
      <div className='login-wrapper'>
        <div className='login-header'>
          {mode === 'user' ? CLIENT_MODE : LAWYER_MODE} 로그인
        </div>
        <div className='login-form'>
          <div>
            <TextField
              id='id'
              label='아이디'
              placeholder='아이디 입력'
              variant='standard'
              onChange={idOnChangeEventHandler}
              fullWidth
            />
          </div>
          <div>
            <TextField
              id='password'
              label='비밀번호'
              placeholder='비밀번호 입력'
              variant='standard'
              onChange={passwordOnChangeEventHandler}
              fullWidth
              type='password'
            />
          </div>
          <Button
            className='login-button'
            variant='contained'
            disabled={
              commUtil.isEmpty(loginForm.id) ||
              commUtil.isEmpty(loginForm.password)
            }
            onClick={loginBtnOnClick}
          >
            로그인
          </Button>
          <Button
            className='login-button'
            variant='contained'
            onClick={goBack}
          >
            뒤로가기
          </Button>
          {mode === 'user' && (
            <div className='login-btn-apis'>
              <a href={KAKAO_AUTH_URL}>
                <img
                  alt='kakaobtn'
                  src={require('../../assets/img/kakao_login_medium_narrow.png')}
                ></img>
              </a>
              <a href={NAVER_AUTH_URL}>
                <img
                  alt='naverbtn'
                  src={require('../../assets/img/login-btn-naver-green.png')}
                ></img>
              </a>
            </div>
          )}
          <div className='navigate-join'>
            {/* <Link to={"/join?mode=" + mode}>회원가입</Link> */}
            {/* <Link to={`/join?mode=${mode}`}>회원가입</Link> */}
            <Button
              onClick={handleJoinSelector}
              className='Join-button'
              variant='contained'
            >
              회원가입
            </Button>
          </div>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>로그인 실패</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              아이디 또는 비밀번호가 일치하지 않습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              autoFocus
            >
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
export default LoginForm;
