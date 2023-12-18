const LoginSelector = ({ setMode }) => {
  return (
    <>
      <span
        className="login-client-entrance"
        onClick={() => {
          setMode("client");
        }}
      >
        의뢰인 로그인
      </span>
      <span
        className="login-lawyer-entrance"
        onClick={() => {
          setMode("lawyer");
        }}
      >
        변호사 로그인
      </span>
    </>
  );
};

export default LoginSelector;
