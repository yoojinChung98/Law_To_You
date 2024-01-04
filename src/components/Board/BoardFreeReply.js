import { Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  deleteFreeDeleteApi,
  getFreeDetailApi,
  putFreeModifyApi,
} from '../../api/board/FreeBoardApi';
import {
  deleteReplyApi,
  getReplyListApi,
  postReplyApi,
} from '../../api/board/ReplyApi';
import { useAppDispatch, useAppSelector } from '../../store';
import commUtil from '../../util/commUtil';
import Editor from '../common/Editor';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../config/host-config';
const BoardFreeReply = () => {
  const dispatch = useAppDispatch;

  const loggedUser = useSelector((state) => state.user);
  const navigate = useNavigate();

  const mode = useAppSelector((state) => state.user.mode);
  const id = loggedUser.id;
  const name = loggedUser.name;

  // dispatch(setUser({}));

  const [queryParams] = useSearchParams();
  const bno = queryParams.get('bno') ?? null;

  const editorRef = useRef(null);

  const [detail, setDetail] = useState({});
  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState('');

  const searchDetail = () => {
    const params = { bno };
    getFreeDetailApi(params)
      .then((res) => {
        setDetail(res);
        setContent(res.content);
        searchReply();
        console.log(mode);
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log(error);
        if (bno === '1') {
          setDetail({
            trueFalse: 1,
            title: '제목',
            content: '<p>안녕하세요<strong>변호사</strong>에요</p>',
            writer: '작성자',
            routes: [],
            regDate: '23.1.1',
          });
          setContent('<p>안녕하세요<strong>변호사</strong>에요</p>');
        } else {
          setDetail({
            trueFalse: 0,
            title: '두번째 제목',
            content: '<p>안녕하세요<strong>변호사</strong>아님</p>',
            writer: '작성자두번째',
            routes: [],
            regDate: '23.1.1',
          });
          setContent('<p>안녕하세요<strong>변호사</strong>아님</p>');
        }
        searchReply();
      });
  };

  // 댓글 리스트 가져오기
  const [reply, setReply] = useState({
    count: '',
    replyList: [],
  });

  const searchReply = () => {
    const params = { page: 1, size: 10, bno };
    getReplyListApi(params)
      .then((res) => {
        setReply(res);
      })
      .catch((error) => {
        // dummy
        setReply({
          count: 2,
          replyList: [
            {
              lawyerId: 'aaa',
              userId: 'ddd',
              content: 'ㅋㅋ',
              writer: 'ddd',
              regDate: '23.12.7',
              deleteButton: true,
            },
            {
              lawyerId: 'bbb',
              userId: 'eee',
              content: '퓨ㅠㅠ',
              writer: 'eee',
              regDate: '23.12.7',
              deleteButton: true,
            },
            {
              lawyerId: 'ccc',
              userId: 'fff',
              content: 'ㅎㅎ',
              writer: 'fff',
              regDate: '23.12.7',
              deleteButton: true,
            },
          ],
        });
      });
  };

  const [replyContent, setReplyContent] = useState({
    content: '',
  });
  const [rno, setRno] = useState({ rno: '' });

  // 댓글 등록
  const onChangeReplyContent = (e) => {
    setReplyContent(e.target.value);
  };

  let params = {
    bno: Number(bno),
    content: replyContent,
  };
  const replyRegistBtn = () => {
    if (replyContent === '') {
      alert('내용을 입력해주세요!');
      return;
    }

    postReplyApi(params).then((res) => {
      if (typeof res === 'object') {
        alert('댓글이 등록되었습니다.');
        setReplyContent(res);
        setRno(res);
        document.querySelector('.reply-content').value = '';
        searchReply();
      }
      return;
    });
  };

  // 댓글 삭제
  const replyDeleteBtn = async (e) => {
    const number = Number(e.target.value);
    console.log(number);
    console.log(typeof number);
    const res = await fetch(`${API_BASE_URL}/reply?rno=` + number, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
    });

    if (res.status === 200) {
      alert('댓글이 삭제되었습니다.');
      document.querySelector('.reply-content').value = '';
      searchReply();
    } else {
      alert('댓글 삭제에 실패했습니다.');
    }
  };

  // 글 수정
  const detailModifyBtn = () => {
    let params = {
      freeboard: {
        bno: 3,
        title: '',
        content: '',
        routes: '',
        attchedFile: [],
      },
    };
    putFreeModifyApi(params).then((res) => {
      if (res.status === 200) {
        alert('게시글이 수정되었습니다.');
        searchReply();
      }
    });
  };
  // 글 삭제
  const detailDeleteBtn = () => {
    let param = {
      bno: bno,
    };
    deleteFreeDeleteApi(param).then((res) => {
      if (typeof res === 'string') {
        alert('게시글이 삭제되었습니다.');
        searchReply();
        navigate('/free');
      }
    });
  };

  useEffect(() => {
    searchDetail();
  }, []);

  return (
    <>
      <div className='board'>
        <div className='detail-wrapper'>
          <div className='detail-title'>{detail.title}</div>
          {commUtil.isNotEmpty(detail) && (
            <Editor
              style={{ height: '200px' }}
              onChange={setContent} // setter 넣기
              data={content ?? ''} //getter 넣기
              editor={setEditor}
              readOnly={detail.trueFalse !== 1}
            />
          )}
        </div>
        {detail.trueFalse === 1 && (
          <div className='detail-button'>
            <Button
              className='detail-modify-button'
              variant='contained'
              onClick={detailModifyBtn}
            >
              수정
            </Button>
            <Button
              className='detail-delete-button'
              variant='contained'
              onClick={detailDeleteBtn}
            >
              삭제
            </Button>
          </div>
        )}
        <div className='reply-wrapper'>
          <div className='reply-writer'>{name}</div>
          <div className='reply-cb'>
            <input
              className='reply-content'
              onChange={onChangeReplyContent}
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
            // key={item.rno + item.content}
            key={item.rno}
          >
            <div className='replies-writer'>{item.writer}</div>
            <div className='replies-content'>{item.content}</div>
            <div className='replies-date'>{item.regDate}</div>
            {item.deleteButton && (
              <Button
                className='reply-delete-button'
                variant='contained'
                onClick={replyDeleteBtn}
                value={item.rno}
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
