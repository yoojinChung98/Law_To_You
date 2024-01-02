import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deleteReplyApi, getReplyListApi } from '../../api/board/ReplyApi';
import { useAppSelector } from '../../store';
import Editor from '../common/Editor';

const BoardFreeReply = () => {
  const mode = useAppSelector((state) => state.user.mode);
  const nick = useAppSelector((state) => state.user.nick);
  const name = useAppSelector((state) => state.user.name);

  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState('');

  const replyDeleteBtn = () => {
    let params = {
      rno: '',
    };
    deleteReplyApi(params).then((res) => {
      if ((res.status = 200)) {
        alert('삭제');
      }
    });
  };
  const replyRegistBtn = () => {};

  // 글 상세
  const [detail, setDetail] = useState({});
  let param = {
    bno: 3,
  };
  useEffect(() => {
    getReplyListApi(param).then((res) => {
      if (typeof res === 'object') {
        detail.setDetail(res);
        console.log(detail);
      }
    });
  }, []);

  // 댓글
  const [reply, setReply] = useState({
    count: 0,
    replyList: [{}],
  });
  let params = {
    bno: 1,
  };
  useEffect(() => {
    getReplyListApi(params).then((res) => {
      if (typeof res === 'object') {
        reply.setReply(res);
        console.log(reply);
      }
    });
  }, []);

  return (
    <>
      <div className='board'>
        <div className='detail-wrapper'>
          <div className='detail-title'>{detail.title}</div>
          <Editor
            style={{ height: '300px' }}
            onChange={setContent} // setter 넣기
            detail={detail.content} //getter 넣기
            editor={setEditor}
            readOnly
          />
        </div>
        {detail.TrueFalse === '1' && (
          <div className='detail-button'>
            <Button
              className='detail-modify-button'
              variant='contained'
              //   onClick={detailModifyBtn}
            >
              수정
            </Button>
            <Button
              className='detail-delete-button'
              variant='contained'
              //   onClick={detailDeleteBtn}
            >
              삭제
            </Button>
          </div>
        )}
        <div className='reply-wrapper'>
          <div className='reply-writer'>{mode === 'user' ? nick : name}</div>
          <div className='reply-cb'>
            <input
              className='reply-content'
              placeholder='댓글을 입력해주세요'
            ></input>
            <Button
              className='reply-button'
              variant='contained'
              onClick={replyRegistBtn}
            >
              등록
            </Button>
          </div>
        </div>
        {reply.replyList.map((item) => (
          <div
            className='replies'
            key={item.writer + item.content}
          >
            <div className='replies-writer'>{item.writer}</div>
            <div className='replies-content'>{item.content}</div>
            <div className='replies-date'>{item.regDate}</div>
            {!item.deleteButton && (
              <Button
                className='reply-delete-button'
                variant='contained'
                onClick={replyDeleteBtn}
              >
                삭제
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default BoardFreeReply;
