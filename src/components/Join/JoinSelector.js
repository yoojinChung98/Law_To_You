const JoinSelector = ({ setMode }) => {
  return (
    <>
      <span
        className="login-client-entrance"
        onClick={() => {
          setMode("client");
        }}
      >
        의뢰인으로 회원가입
      </span>
      <span
        className="login-lawyer-entrance"
        onClick={() => {
          setMode("lawyer");
        }}
      >
        변호사로 회원가입
      </span>
    </>
  );
};

export default JoinSelector;
