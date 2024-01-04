import React, { useEffect, useState } from 'react';
import './UserModify.scss';
import { API_BASE_URL } from '../../config/host-config';
import { useNavigate } from 'react-router-dom';

const UserModify = () => {
  const redirection = useNavigate();

  const BASE_URL = API_BASE_URL;

  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const storageInfo = localStorage.getItem('userInfo');

  const requestHeader = {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };

  const [isEventOccurred, setEventOccurred] = useState(false);

  const [userInfo, setUserInfo] = useState({
    id: '',
    nickname: '',
    email: '',
  });

  // 상태변수로 회원 정보 수정 입력값 관리
  const [userValue, setUserValue] = useState({
    password: '',
    nickname: '',
  });

  // 검증 메세지 상태변수 관리
  const [message, setMessage] = useState({
    password: '',
    pwCheck: '',
    nickname: '',
  });

  // 검증 완료 체크 상태변수 관리
  const [correct, setCorrect] = useState({
    password: false,
    pwCheck: false,
    nickname: false,
  });

  // 검증된 데이터를 각각의 상태변수에 저장하는 함수
  const saveInputState = ({ key, inputValue, flag, msg }) => {
    // 입력값 세팅
    inputValue !== 'check' &&
      setUserValue((oldVal) => {
        return { ...oldVal, [key]: inputValue };
      });

    // 메세지 세팅
    setMessage((oldMsg) => {
      return { ...oldMsg, [key]: msg };
    });

    // 입력값 검증 상태 세팅
    setCorrect((oldCorrect) => {
      return { ...oldCorrect, [key]: flag };
    });
  };

  // 패스워드 입력창 체인지 이벤트 핸들러
  const passwordHandler = (e) => {
    document.getElementById('new-password-check').value = '';

    setMessage({ ...message, pwCheck: '' });
    setCorrect({ ...correct, pwCheck: false });

    const inputValue = e.target.value;
    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    let msg;
    let flag = false;
    if (!inputValue) {
      msg = '비밀번호는 필수입니다.';
    } else if (!pwRegex.test(inputValue)) {
      msg = '8자 이상의 영문, 숫자, 특수문자를 포함해주세요.';
    } else {
      msg = '사용 가능한 비밀번호 입니다.';
      flag = true;
    }

    saveInputState({
      key: 'password',
      inputValue,
      msg,
      flag,
    });
  };

  // 비밀번호 확인란 체인지 이벤트 핸들러
  const pwCheckHandler = (e) => {
    let msg;
    let flag = false;

    if (!e.target.value) {
      msg = '비밀번호 확인란은 필수입니다.';
    } else if (userValue.password !== e.target.value) {
      msg = '패스워드가 일치하지 않습니다.';
    } else {
      msg = '패스워드가 일치합니다.';
      flag = true;
    }

    saveInputState({
      key: 'pwCheck',
      inputValue: 'check',
      msg,
      flag,
    });
    setEventOccurred(true);
  };

  // 닉네임 중복 체크 서버 통신 함수
  const fetchDuplicateNickname = (nickname) => {
    let msg = '',
      flag = false;

    fetch(`${BASE_URL}/user/checkName?nickname=${nickname}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((json) => {
        if (json) {
          msg = '닉네임이 중복되었습니다.';
        } else {
          msg = '사용 가능한 닉네임입니다.';
          flag = true;
        }
        saveInputState({
          key: 'nickname',
          inputValue: nickname,
          msg,
          flag,
        });
      })
      .catch((err) => {
        console.log('서버 통신이 원활하지 않습니다.');
      });
  };

  // 닉네임 이메일 입력창 체인지 이벤트 핸들러
  const nicknameHandler = (e) => {
    const inputValue = e.target.value;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '닉네임은 필수값입니다!';
    } else {
      fetchDuplicateNickname(inputValue);
    }

    saveInputState({
      key: 'nickname',
      inputValue,
      msg,
      flag,
    });
    setEventOccurred(true);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/mypage`, {
      method: 'GET',
      headers: requestHeader,
    })
      .then((res) => {
        if (res.status === 200) return res.json();
        else if (res.status === 403) {
          alert('로그인이 필요한 서비스입니다.');
          redirection('/login/');
          return;
        } else {
          alert('관리자에게 문의하세요!');
          redirection('/');
        }
        return;
      })
      .then((json) => {
        if (json) setUserInfo(json);
        console.log(json);
      });
  }, [userValue.nickname]);

  // 모두 검증에 통과했는지 여부 검사
  const isValid = () => {
    if (isEventOccurred) {
      for (const key in correct) {
        const flag = correct[key];
        if (!flag) return false;
      }
    }
    return true;
  };

  // 회원 정보 수정 처리 서버 요청
  const fetchUserModi = async () => {
    const requestBody = {
      id: `${userInfo.id}`,
      password: `${userValue.password}`,
      nickname: `${userValue.nickname}`,
    };
    const res = await fetch(`${BASE_URL}/mypage/update`, {
      method: 'PUT',
      headers: requestHeader,
      body: JSON.stringify(requestBody),
    });

    if (res.status === 200) {
      alert('회원 정보가 수정되었습니다!');
      window.location.reload();
      return;
    } else {
      alert('서버와의 통신이 원활하지 않습니다!');
      redirection('/');
      return;
    }
  };

  // 수정 버튼 클릭 이벤트 핸들러
  const modiButtonClickHandler = (e) => {
    // e.preventDefault();

    if (isEventOccurred) {
      if (isValid()) {
        fetchUserModi();
        return;
      } else {
        alert('입력란을 다시 확인해주세요!');
        return;
      }
    }
    fetchUserModi();
    return;
  };

  // 회원 탈퇴 처리 함수
  const withdrawUser = async () => {
    const res = await fetch(`${BASE_URL}/mypage`, {
      method: 'DELETE',
      headers: requestHeader,
    });

    if (res.status === 200) {
      localStorage.clear();
      alert('회원 탈퇴 처리되었습니다.');
      window.location.href = '/';
      return;
    } else {
      alert('서버와의 통신이 원활하지 않습니다!');
      redirection('/');
      return;
    }
  };

  return (
    <>
      <section className='user-modify-section'>
        <div className='userModify'>
          <div class='titlebox'>회원 정보</div>
          <form>
            <table className='table'>
              <tbody className='m-control'>
                <tr>
                  <td className='m-title id'>ID</td>
                  <td>
                    <input
                      className='formBox inputBox userId-input'
                      name='userId'
                      defaultValue={userInfo.id}
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td className='m-title password'>새 비밀번호</td>
                  <td>
                    <input
                      className='formBox inputBox password-input'
                      type='password'
                      label='비밀번호'
                      onChange={passwordHandler}
                    />
                    <span
                      className='msg password'
                      style={
                        correct.password ? { color: 'green' } : { color: 'red' }
                      }
                    >
                      {message.password}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className='m-title pwCheck'>새 비밀번호 확인</td>
                  <td>
                    <input
                      className='formBox inputBox pwCheck-input'
                      type='password'
                      label='비밀번호 확인'
                      id='new-password-check'
                      onChange={pwCheckHandler}
                    />
                    <span
                      className='msg pwCheck'
                      style={
                        correct.pwCheck ? { color: 'green' } : { color: 'red' }
                      }
                    >
                      {message.pwCheck}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className='m-title nickname'>닉네임</td>
                  <td>
                    <input
                      className='formBox inputBox nickname-input'
                      label='닉네임'
                      onChange={nicknameHandler}
                      defaultValue={userInfo.nickname}
                    />
                    <span
                      className='msg nickname'
                      style={
                        correct.nickname ? { color: 'green' } : { color: 'red' }
                      }
                    >
                      {message.nickname}
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className='m-title email'>이메일</td>
                  <td>
                    <input
                      className='formBox inputBox email-input'
                      disabled
                      defaultValue={userInfo.email}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

          <div className='m-control-foot'>
            <button
              className='btn modify'
              id='modifyBtn'
              onClick={modiButtonClickHandler}
            >
              수정
            </button>
            <button
              className='btn withdrawal'
              id='withdrawal'
              onClick={withdrawUser}
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserModify;
