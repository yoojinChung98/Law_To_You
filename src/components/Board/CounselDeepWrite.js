import Button from '@mui/material/Button';
import React, { useRef, useState } from 'react';
import { putDeepRegistApi } from '../../api/board/CounselWriteApi';
import '../scss/Board.scss';
import { useNavigate, useParams } from 'react-router-dom';

const CounselDeepWrite = () => {
  // 요청 경로에 묻어있는 param 값을 함께 받아옴 (변수명 수정 금지. 수정 시 Route 함께 수정)
  let { consultNum } = useParams();
  consultNum = parseInt(consultNum, 10);

  const navigate = useNavigate();

  const [data, setData] = useState({
    consultNum: consultNum,
    title: '',
    content: '',
  });

  const fileOnChangeEventHandler = (e) => {
    setData({ ...data, file: e.target.files[0] });
  };

  const fileInput = useRef(null);
  const cTitlRef = useRef();
  const cContRef = useRef();

  const counselregisthandler = () => {
    let params = {
      consultNum: consultNum,
      title: cTitlRef.current.value,
      content: cContRef.current.value,
    };

    console.log('data.consultNum', data.consultNum);

    let formData = new FormData();
    // let fileList = [];

    let files = document.getElementById('files').files;

    formData.append(
      'detailedConsulting',
      new Blob([JSON.stringify(params)], { type: 'application/json' })
    );

    // for (let x = 0; x < files.length; x++) {
    //   fileList.push(files[x]);
    // }
    for (let file of files) {
      console.log('file: ', file);
      formData.append('files', file);
    }

    // formData.append(
    //   'files',
    //   new Blob([JSON.stringify(fileList)], { type: 'application/json' })
    // );

    putDeepRegistApi(formData).then((res) => {
      console.log('res는 : ', res);

      if (typeof res === 'object') {
        alert('깊은 상담 등록이 완료되었습니다.');
        navigate('/mycounsel/');
      } else {
        //
      }
    });
  };

  const counselcancelhandler = () => {};
  return (
    <div className='board'>
      <div className='board-header'>
        <span>깊은 상담</span>
        <div>
          깊은 상담입니다 ~~ 상담받고 싶은 내용을 입력하여 여러 전문 변호사에게
          브리핑을 받아볼 수 있습니다. 질문에 달린 브리핑 중 마음에 드는 답변을
          하나 골라 해당 변호사와 더욱 깊은 상담을 나누실 수 있습니다. 온라인
          상담 등록 시, 법봉 1개가 차감되며 답변마다 요구되는 법봉의 개수는
          달라질 수 있습니다.
        </div>
      </div>
      <div className='form-layout'>
        <div className='form-title'>
          <span>제목</span>
          <input
            placeholder='상담 제목을 입력해주세요'
            ref={cTitlRef}
          ></input>
        </div>
        <div className='form-content'>
          <span>내용</span>
          <textarea
            placeholder='깊은 상담 내용을 입력해주세요.'
            ref={cContRef}
          ></textarea>
        </div>
        <div className='form-attach'>
          <span>첨부파일</span>
          <input
            ref={fileInput}
            type='file'
            id='files'
            multiple
            onChange={fileOnChangeEventHandler}
          ></input>
        </div>
        <div className='counsel-btn'>
          <Button
            className='counsel-regist-btn'
            onClick={counselregisthandler}
          >
            등록하기
          </Button>
          <Button
            className='counsel-cancel-btn'
            onClick={counselcancelhandler}
          >
            취소하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CounselDeepWrite;
