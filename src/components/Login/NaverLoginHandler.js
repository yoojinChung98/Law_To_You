import React, { useEffect } from 'react';
import { API_BASE_URL } from '../../config/host-config';
import { setUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';

const NaverLoginHandler = () => {
  const dispatch = useAppDispatch();
  const REQUEST_URL = API_BASE_URL + '/user/naverLogin';
  const redirect = useNavigate();

  // URL에서 쿼리스트링으로 전달된 인가 코드를 얻어오는 방법.
  const code = new URL(window.location.href).searchParams.get('code');
  const state = new URL(window.location.href).searchParams.get('state');

  useEffect(() => {
    // 컴포넌트가 렌더링 될 때, 인가 코드를 백엔드로 전송하는 fetch 요청
    const naverLogin = async () => {
      try {
        const resoponse = await fetch(
          `${REQUEST_URL}?code=${code}&state=${state}`
        );

        const data = await resoponse.json();

        localStorage.setItem('accessToken', data.accessToken);

        const userInfo = { id: data.id, name: data.name, mode: data.authority };
        console.log(userInfo.mode);
        console.log(userInfo.name);
        console.log(userInfo.id);
        dispatch(setUser(userInfo));

        redirect('/');
      } catch (error) {
        console.error('로그인 에러:', error);
      }
    };

    if (code && state) {
      naverLogin();
    }
  }, [code, state, redirect]);

  return <div>naverLoginHandler</div>;
};

export default NaverLoginHandler;
