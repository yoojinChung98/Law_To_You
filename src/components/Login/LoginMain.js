import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getKakaoApi } from "../../api/login/LoginApi";
import { useAppDispatch } from "../../store";
import { setUser } from "../../store/userSlice";
import commUtil from "../../util/commUtil";
import "../scss/Login.scss";
import LoginForm from "./LoginForm";
import LoginSelector from "./LoginSelector";

const LoginMain = () => {
  const [queryParams] = useSearchParams();
  const [loginMode, setLoginMode] = useState(queryParams.get("mode") ?? null);
  const code = queryParams.get("code") ?? null;
  const type = queryParams.get("type") ?? null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (code && type === "kakao") {
      console.log(code);
      const param = { code };
      getKakaoApi(param).then((res) => {
        const user = {
          id: res.id,
          mode: res.authority,
          name: res.name,
          nickname: res.name,
        };
        dispatch(setUser(user));
        localStorage.setItem("accessToken", res.accessToken);
        navigate("/");
      });
    }
  }, []);
  return (
    <>
      <div className="login">
        {commUtil.isEmpty(loginMode) ? (
          <LoginSelector setMode={setLoginMode} />
        ) : (
          <LoginForm mode={loginMode} setMode={setLoginMode} />
        )}
      </div>
    </>
  );
};

export default LoginMain;
