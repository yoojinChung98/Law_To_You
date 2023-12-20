import { Button } from "@mui/material";
import React, { useState } from "react";
import Editor from "../common/Editor";

const BoardFreeReply = () => {
  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState(
    `
  바람피다 걸리면 용서해달라 싹싹 빌어도 모자랄판에, 되려 "마침 잘
  됐다"며 당당하게 이혼해달라고 요구해온다는 조금은 황당한 이야기,
  들어는 보셨나요? 간통죄 폐지로 바람/외도/간통/불륜에 한치의 부끄러움도
  느끼지 못하고, 오히려 적반하장격으로 상대방에게 이혼해달라고
  종용해오는 일이 현실에서는 참 많이도 발생합니다.부부 중 일방의 외도로
  협의이혼을 결정한 경우 협의이혼이야 당사자들 사이 자율적으로 정한
  문제이기에 제3자가 왈가왈부할 것은 아니지만, 유책자만이 이혼은 원하고,
  나머지 타방 배우자가 그러한 상황에서까지 가정을 지키고 싶어하는
  경우라면 이혼을 원하는 유책배우자로서는 부득이 재판상이혼을 청구할
  수밖에 없을텐데요.
  `
  );
  return (
    <>
      <div className="board">
        <div className="detail-wrapper">
          <div className="detail-title">
            남편의 바람으로 합의 이혼 시 자녀의 양육권
          </div>
          {/* <div className="detail-content">
          바람피다 걸리면 용서해달라 싹싹 빌어도 모자랄판에, 되려 "마침 잘
          됐다"며 당당하게 이혼해달라고 요구해온다는 조금은 황당한 이야기,
          들어는 보셨나요? 간통죄 폐지로 바람/외도/간통/불륜에 한치의 부끄러움도
          느끼지 못하고, 오히려 적반하장격으로 상대방에게 이혼해달라고
          종용해오는 일이 현실에서는 참 많이도 발생합니다.부부 중 일방의 외도로
          협의이혼을 결정한 경우 협의이혼이야 당사자들 사이 자율적으로 정한
          문제이기에 제3자가 왈가왈부할 것은 아니지만, 유책자만이 이혼은 원하고,
          나머지 타방 배우자가 그러한 상황에서까지 가정을 지키고 싶어하는
          경우라면 이혼을 원하는 유책배우자로서는 부득이 재판상이혼을 청구할
          수밖에 없을텐데요.
        </div> */}
          <Editor
            style={{ height: "300px" }}
            onChange={setContent} // setter 넣기
            data={content} //getter 넣기
            editor={setEditor}
            readOnly
          />
        </div>
        <div className="detail-button">
          <Button className="detail-modify-button" variant="contained">
            수정
          </Button>
          <Button className="detail-delete-button" variant="contained">
            삭제
          </Button>
        </div>
        <div className="reply-wrapper">
          <div className="reply-writer">이제현</div>
          <div className="reply-cb">
            <input
              className="reply-content"
              placeholder="댓글을 입력해주세요"
            ></input>
            <Button className="reply-button" variant="contained">
              등록
            </Button>
          </div>
        </div>

        {[1, 2, 3].map(function () {
          return (
            <div className="replies">
              <div className="replies-writer">정유진</div>
              <div className="replies-content">
                남편 불륜, 아내 불륜의 경우에 1차적으로 남편 또는 아내에게 이혼
                및 위자료를 청구할 수 있습니다. 남편 불륜, 아내 불륜의 경우에
                1차적으로 남편 또는 아내에게 이혼 및 위자료를 청구할 수
                있습니다.
              </div>
              <div className="replies-date">2023.12.14</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default BoardFreeReply;
