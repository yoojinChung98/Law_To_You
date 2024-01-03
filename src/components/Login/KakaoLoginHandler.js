import React, { useEffect } from 'react';
import { API_BASE_URL } from '../../config/host-config';
import { useAppDispatch } from '../../store';
import { setUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

const KakaoLoginHandler = () => {
  const dispatch = useAppDispatch();
  const redirection = useNavigate();
  console.log(
    '사용자가 동의화면을 통해 필수 정보 동의 후 Kakao 서버에서 redirect를 진행함!'
  );
  const REQUEST_URL = API_BASE_URL + '/user';

  // URL에서 쿼리스트링으로 전달된 인가 코드를 얻어오는 방법.
  const code = new URL(window.location.href).searchParams.get('code');
  console.log('code: ', code);

  useEffect(() => {
    // 컴포넌트가 렌더링 될 때, 인가 코드를 백엔드로 전송하는 fetch 요청
    const kakaoLogin = async () => {
      const res = await fetch(REQUEST_URL + '/kakaoLogin?code=' + code);
      console.log('카카오 로그인 요청 들어옴!');

      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem('accessToken', data.accessToken);
        const userInfo = { id: data.id, name: data.name, mode: data.authority };
        dispatch(setUser(userInfo));
      }

      redirection('/');
    };
    kakaoLogin();
  }, []);

  return <div>KakaoLoginHandler</div>;
};

export default KakaoLoginHandler;
