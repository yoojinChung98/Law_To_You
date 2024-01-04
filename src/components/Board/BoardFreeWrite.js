import { Button } from '@mui/material';
import Input from '@mui/material/Input';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postFreeWriteApi } from '../../api/board/FreeBoardApi';
import Editor from '../common/Editor';
import '../scss/Board.scss';

const BoardFreeWrite = () => {
  const navigate = useNavigate();

  const [editor, setEditor] = useState(null);
  const [content, setContent] = useState(''); // 본문
  const [title, setTitle] = useState(''); // 제목
  const [attachedFile, setAttachedFile] = useState([]); // 파일
  const afOnChangeEventHandler = (e) => {
    setAttachedFile({ attachedFile: e.target.files[0] });
  };
  const fileInput = useRef(null);

  const postBtnOnClick = () => {
    let param = {
      title: title,
      content: content,
    };

    let formData = new FormData();

    let files = document.getElementById('attachedFile').files;
    for (let x = 0; x < files.length; x++) {
      formData.append('attachedFile', files[x]);
    }

    // for (let i = 0; i < attachedFile.length; i++) {
    //   formData.append("attachedFile", attachedFile[i]);
    // }
    // formData.append("attachedFile", attachedFile);
    // saveFormData.forEach(function (item: any))

    formData.append(
      'freeboard',
      new Blob([JSON.stringify(param)], { type: 'application/json' })
    );

    // params.append("freeboards", param);
    postFreeWriteApi(formData).then((res) => {
      console.log(res);
      if (typeof res === 'object') {
        navigate('/free');
      } else {
      }
    });
  };
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  // const afOnChangeEventHandler = (e) => {
  //   setAttachedFile(e.target.files[0]);
  // };

  return (
    <div className='board'>
      <div className='board-header'>
        <span>글 작성하기</span>
      </div>
      <div className='write-form'>
        <input
          className='write-title'
          placeholder='제목을 입력하세요'
          value={title}
          onChange={onChangeTitle}
        />
        {/* <div className="write-style">
          <Icon icon="ph:text-b-bold" width="30" height="30" />
          <Icon icon="ph:text-b" width="30" height="30" />
          <Icon icon="ph:text-b-light" width="30" height="30" />
        </div>
        <textarea className="write-content" placeholder="본문을 입력하세요" /> */}
        <Editor
          height={'270px'}
          onChange={setContent} // setter 넣기
          data={content} //getter 넣기
          editor={setEditor}
        />
      </div>
      <input
        style={{
          position: 'relative',
          top: '80px',
          right: '600px',
        }}
        id='attachedFile'
        ref={fileInput}
        onChange={afOnChangeEventHandler}
        type='file'
        multiple
      />
      <div className='button-wrapper'>
        <Button
          className='regist-button'
          variant='contained'
          onClick={postBtnOnClick}
        >
          등록
        </Button>
        <Button
          className='cancel-button'
          variant='contained'
          onClick={() => {
            navigate('/free');
          }}
        >
          취소
        </Button>
      </div>
    </div>
  );
};

export default BoardFreeWrite;
