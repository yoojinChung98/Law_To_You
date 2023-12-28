import React, { useEffect } from "react";
import { API_BASE_URL } from "../../config/host-config";

const KakaoLoginHandler = () => {
  const REQUEST_URL = API_BASE_URL + USERK;

  // URL에서 쿼리스트링으로 전달된 인가 코드를 얻어오는 방법.
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    // 컴포넌트가 렌더링 될 때, 인가 코드를 백엔드로 전송하는 fetch 요청
    const kakaoLogin = async () => {
      const res = await fetch(REQUEST_URL + "/kakaoLogin?code=" + code);
    };

    kakaoLogin();
  }, []);

  return <div>KakaoLoginHandler</div>;
};

export default KakaoLoginHandler;
