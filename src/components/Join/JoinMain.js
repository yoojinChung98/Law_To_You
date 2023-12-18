import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../scss/Join.scss";
import JoinForm from "./JoinForm";

import commUtil from "../../util/commUtil";
import JoinSelector from "./JoinSelector";

const JoinMain = () => {
  const location = useLocation();
  const [joinMode, setJoinMode] = useState(location.state?.mode ?? null);

  return (
    <>
      <div className="join">
        {commUtil.isEmpty(joinMode) ? (
          <JoinSelector setMode={setJoinMode} />
        ) : (
          <JoinForm mode={joinMode} setMode={setJoinMode} />
        )}
      </div>
    </>
  );
};

export default JoinMain;
