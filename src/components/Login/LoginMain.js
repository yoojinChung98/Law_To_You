import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../scss/Login.scss";
import LoginForm from "./LoginForm";

import commUtil from "../../util/commUtil";
import LoginSelector from "./LoginSelector";

const LoginMain = () => {
  const location = useLocation();
  const [loginMode, setLoginMode] = useState(location.state?.mode ?? null);

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
