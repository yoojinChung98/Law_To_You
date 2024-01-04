import { Button, Input } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getEmailDuplicateApi,
  getIdDuplicateApi,
  getNickDuplicateApi,
  postLawyerJoinApi,
  postMailAuthCheckApi,
  postMailSendApi,
  postUserJoinApi,
} from '../../api/login/JoinApi';
import commUtil from '../../util/commUtil';
import '../scss/Join.scss';

const JoinForm = ({ mode, setMode, joinMethod }) => {
  // console.log(mode);
  // const mode = useLocation().state.mode;
  const navigate = useNavigate();

  const [joinForm, setJoinForm] = useState({
    id: '',
    nick: '', // (의로인)
    name: '', // (변호사)
    pw: '',
    pwcheck: '',
    email: '',
    cnum: '',
  });

  const [pwvalid, setPwvalid] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);
  const [usableId, setUsableId] = useState(false);
  const [usableNick, setUsableNick] = useState(false);
  const [usableEmail, setUsableEmail] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false); // 이메일 인증번호 버튼
  const [isAuthChecked, setIsAuthChecked] = useState(false); // 이메일 인증번호 확인 버튼
  const [isJoinTrue, setIsJoinTrue] = useState(false); // 회원가입 빈칸 여부 확인
  const CLIENT_MODE = '의뢰인';
  const LAWYER_MODE = '변호사';

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
    setJoinForm({ ...joinForm, ac: e.target.files[0] });
  };
  const arnOnChangeEventHandler = (e) => {
    setJoinForm({ ...joinForm, arn: e.target.value });
  };

  const idCheck = (e) => {
    e.preventDefault();

    let params = {
      id: joinForm.id,
    };
    getIdDuplicateApi(params).then((res) => {
      if (res) {
        // 아이디 중복 검사 성공
        alert('이미 사용중인 아이디 입니다.');
        setUsableId(false);
        setIsJoinTrue();
      } else {
        // 아이디 중복 검사 실패
        // 응답 받은 메세지 그대로 출력
        alert('사용 가능한 아이디 입니다.');
        setUsableId(true);
      }
    });
  };

  const nickCheck = (e) => {
    e.preventDefault();

    let params = {
      nickname: joinForm.nick,
    };

    getNickDuplicateApi(params).then((res) => {
      if (typeof res === 'object') {
        // 닉네임 중복 검사 성공
        alert('이미 사용중인 닉네임 입니다.');
        setUsableNick(false);
      } else {
        // 닉네임 중복 검사 실패
        // 응답 받은 메세지 그대로 출력
        alert('사용 가능한 닉네임 입니다.');
        setUsableNick(true);
      }
    });
  };

  const emailSend = (e) => {
    alert('인증번호가 전송 되었습니다.');
    setIsEmailSent(true);
    e.preventDefault();

    let params = {
      email: joinForm.email,
    };

    postMailSendApi(params)
      .then((res) => {
        if (res === 'object') {
          console.log('res인증번호감', res);
          setIsSend(true);
        }

        // 인증번호가 감
      })
      .catch((error) => {
        console.log('res인증번호감 else', error);
        alert('이메일을 제대로 작성해 주세요');
        setIsEmailSent(false);
      });
  };

  const emailAuthCheck = (e) => {
    e.preventDefault();

    let params = {
      email: joinForm.email,
      authNum: joinForm.cnum,
    };

    postMailAuthCheckApi(params).then((res) => {
      if (res === 'ok') {
        console.log(res);
        alert('인증이 완료되었습니다.');
        setIsAuthChecked(true);
        // 인증 성공
      } else {
        alert('인증번호를 다시 확인해 주세요');
        // 에러메세지
      }
    });
  };

  useEffect(() => {
    var regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    console.log(joinForm.pw, regExp.test(joinForm.pw));
    if (!regExp.test(joinForm.pw)) {
      setPwvalid(false);
    } else {
      setPwvalid(true);
    }
  }, [joinForm.pw]);

  useEffect(() => {
    if (joinForm.pw != joinForm.pwcheck) {
      setPwCheck(false);
    } else {
      setPwCheck(true);
    }
  }, [joinForm.pwcheck]);

  const emailCheck = (e) => {
    e.preventDefault();

    let params = {
      email: joinForm.email,
    };
    console.log(joinForm.email);

    getEmailDuplicateApi(params).then((res) => {
      if (res) {
        // 이메일 중복 검사 성공
        alert('이미 사용중인 이메일 입니다.');
        setUsableEmail(false);
      } else {
        // 이메일 중복 검사 실패
        // 응답 받은 메세지 그대로 출력
        alert('사용 가능한 이메일 입니다.');
        console.log(res);
        setUsableEmail(true);
      }
    });
  };

  const fileInput = useRef(null);

  const uploadBtnOnClick = (e) => {
    fileInput.current.click();
    if (!fileInput.isEmpty) {
    }
  };

  const joinBtnOnClick = () => {
    const joinApi = mode === 'user' ? postUserJoinApi : postLawyerJoinApi;

    let params = {};
    if (mode === 'user') {
      // 사용자
      params = {
        id: joinForm.id,
        password: joinForm.pw,
        nickname: joinForm.nick,
        email: joinForm.email,
        joinMethod: 'web',
      };
    } else {
      // 변호사

      params = new FormData();

      params.append('attachedFile', joinForm.ac);

      const lawyer = {
        lawyerId: joinForm.id,
        lawyerPw: joinForm.pw,
        name: joinForm.name,
        email: joinForm.email,
        lawyerNum: joinForm.cnum,
      };

      const paramsJsonBlob = new Blob([JSON.stringify(lawyer)], {
        type: 'application/json',
      });
      params.append('lawyer', paramsJsonBlob);

      console.log(params);
    }

    joinApi(params)
      .then((res) => {
        if (res.status === 400) {
          console.log('joinApi 들어와짐?', res);
          res.text().then((data) => {
            console.log('회원가입 클릭 data', data);
            navigate('/login');
          });
        } else {
          console.log('joinApi 들어와짐?', res);
          res.text().then((data) => {
            console.log('회원가입 클릭 data', data);
            navigate('/login');
          });
          // 회원가입 실패
          // 응답 받은 메세지 그대로 출력
        }
        // if (res) {
        //   // 회원가입 성공
        //   navigate('/');
        // } else {
        //   // 회원가입 실패
        //   // 응답 받은 메세지 그대로 출력
        // }
      })
      .catch((error) => {
        console.log('에러?');
        console.log(error);
        navigate('/login');
      });
  };

  return (
    <div className='join-wrapper'>
      <div className='join-header'>
        {mode === 'user' ? CLIENT_MODE : LAWYER_MODE} 회원가입
      </div>
      <div className='join-form'>
        <div>
          <div>아이디</div>
          <Input
            id='id'
            name='id'
            onChange={idOnChangeEventHandler}
            placeholder='아이디 입력'
          />
          <Button
            className='input-button'
            variant='contained'
            disabled={commUtil.isEmpty(joinForm.id)}
            onClick={idCheck}
          >
            중복확인
          </Button>
        </div>

        {mode === 'user' ? (
          <div>
            <div>닉네임</div>
            <Input
              id='nick'
              name='nick'
              onChange={nickOnChangeEventHandler}
              placeholder='닉네임 입력'
            />
            <Button
              className='input-button'
              variant='contained'
              disabled={commUtil.isEmpty(joinForm.nick)}
              onClick={nickCheck}
            >
              중복확인
            </Button>
          </div>
        ) : (
          <div>
            <div>이름</div>
            <Input
              id='name'
              name='name'
              onChange={nameOnChangeEventHandler}
              placeholder='이름 입력'
            />
          </div>
        )}
        <div>
          <div>비밀번호</div>
          <Input
            id='pw'
            name='pw'
            type='password'
            onChange={pwOnChangeEventHandler}
            placeholder='비밀번호 입력'
          />
          {!pwvalid && commUtil.isNotEmpty(joinForm.pw) && (
            <p id='pwvalid'>
              특수문자, 문자, 숫자 포함 8~15자리 이내로 작성하세요.
            </p>
          )}
        </div>
        <div>
          <div>비밀번호 확인</div>
          <Input
            id='pwcheck'
            name='pwcheck'
            type='password'
            onChange={pwcheckOnChangeEventHandler}
            placeholder='비밀번호 확인'
          />
          {!pwCheck && commUtil.isNotEmpty(joinForm.pwcheck) && (
            <p id='pwcheck'>비밀번호가 일치하지 않습니다.</p>
          )}
        </div>
        <div>
          <div>이메일</div>
          <Input
            id='email'
            name='email'
            onChange={emailOnChangeEventHandler}
            placeholder='이메일 입력'
          />
          {!usableEmail ? (
            <Button
              className='input-button'
              variant='contained'
              disabled={commUtil.isEmpty(joinForm.email)}
              onClick={emailCheck}
            >
              중복확인
            </Button>
          ) : (
            <Button
              className='input-button'
              variant='contained'
              disabled={isEmailSent}
              onClick={emailSend}
            >
              인증번호 전송
            </Button>
          )}
        </div>
        <div>
          <div>인증번호</div>
          <Input
            id='cnum'
            name='cnum'
            onChange={cnumOnChangeEventHandler}
            placeholder='인증번호 확인'
          />
          <Button
            className='input-button'
            variant='contained'
            disabled={isAuthChecked || commUtil.isEmpty(joinForm.cnum)}
            onClick={emailAuthCheck}
          >
            인증번호 확인
          </Button>
        </div>

        {mode === 'lawyer' && (
          <>
            <div>
              <div>변호사증</div>
              <Input
                id='ac'
                name='ac'
                ref={fileInput}
                accept='image/*'
                onChange={acOnChangeEventHandler}
                type='file'
              />
              {/* <Button
                className="input-button"
                variant="contained"
                onClick={uploadBtnOnClick}
              >
                첨부하기
              </Button> */}
            </div>
            <div>
              <div>변호사 등록번호</div>
              <Input
                id='arn'
                name='arn'
                onChange={arnOnChangeEventHandler}
                placeholder='변호사 등록번호 입력'
              />
            </div>
          </>
        )}

        {mode === 'user' ? (
          <Button
            className='join-button'
            variant='contained'
            disabled={
              commUtil.isEmpty(joinForm.id) ||
              commUtil.isEmpty(joinForm.nick) ||
              commUtil.isEmpty(joinForm.pw) ||
              commUtil.isEmpty(joinForm.pwcheck) ||
              commUtil.isEmpty(joinForm.email) ||
              commUtil.isEmpty(joinForm.cnum) ||
              !usableId ||
              !usableNick ||
              !pwvalid ||
              !usableEmail
            }
            onClick={joinBtnOnClick}
          >
            회원가입
          </Button>
        ) : (
          <Button
            className='join-button'
            variant='contained'
            disabled={
              commUtil.isEmpty(joinForm.id) // ||
              // commUtil.isEmpty(joinForm.name) ||
              // commUtil.isEmpty(joinForm.pw) ||
              // commUtil.isEmpty(joinForm.pwcheck) ||
              // commUtil.isEmpty(joinForm.email) ||
              // commUtil.isEmpty(joinForm.cnum) ||
              // commUtil.isEmpty(joinForm.ac) ||
              // commUtil.isEmpty(joinForm.arn) ||
              // !usableId ||
              // !usableNick ||
              // !pwvalid ||
              // !usableEmail
            }
            onClick={joinBtnOnClick}
          >
            회원가입
          </Button>
        )}
      </div>
    </div>
  );
};

export default JoinForm;
