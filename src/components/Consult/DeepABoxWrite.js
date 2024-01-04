import { Button, Input } from '@mui/material';
import React, { useRef, useState } from 'react';
import './DeepABoxWrite.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../config/host-config';

const DeepABoxWrite = ({ consultNum }) => {
  const loggedUser = useSelector((state) => state.user);
  const navigate = useNavigate();
  const BASE_URL = API_BASE_URL;

  const [attachedFile, setAttachedFile] = useState([]); // 파일
  const afOnChangeEventHandler = (e) => {
    setAttachedFile({ attachedFile: e.target.files[0] });
  };
  const fileInput = useRef(null);

  // 짧은 답변 textarea 태그 내부값을 가져오기 위한 useRef
  const detailAnsRef = useRef(null);

  const regist = async () => {
    let params = {
      consultNum: consultNum,
      detailedAns: detailAnsRef.current.value,
    };
    console.log('params의 값은: ', params);

    // let formData = new FormData();

    // let files = document.getElementById('files').files;

    // const paramsJsonBlob = new Blob([JSON.stringify(params)], {
    //   type: 'application/json',
    // });
    // formData.append('detailedAnswer', paramsJsonBlob);

    // for (let file of files) {
    //   console.log('file: ', file);
    //   formData.append('files', file);
    // }

    let res = await fetch(`${BASE_URL}/answer/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(params),
    });

    if (res.status == 200) {
      alert('답변 등록이 완료되었습니다.');
      window.location.reload();
    } else {
      // 변호사가 아니거나 등록한 적이 없다면 여기 컴포넌트가 안뜨도록해서... 이게.. 왜... 에러가 뜨는지 확인해봐야함.
      alert('하나의 질문엔 하나의 답변만 달 수 있습니다.');
    }
  };

  return (
    <>
      <div className='consult-a-box'>
        <div className='consult-aw-title-area'>
          <h3 className='h32'>상세한 답변을 남겨주세요</h3>
        </div>

        <textarea
          className='consult-aw-content-area'
          placeholder='기존에 입력했던 일반 상담의 내용과 일관성을 띈 자세한 답변을 남겨주세요.
          7일 이내 등록을 완료하지 않을 시, 일반 상담 답변 채택은 취소되며 더이상 깊은 상담의 답변을 남기실 수 없습니다.
          깊은 상담 답변을 등록한 뒤에는 내용을 수정할 수 없습니다.
          등록이 완료되고 나면 일반 상담 답변 등록 시 입력했던 법봉의 개수만큼 법봉을 지급받으실 수 있습니다.'
          ref={detailAnsRef}
        ></textarea>

        <div className='consult-preview-area'>
          {/* <span>첨부파일</span>
          <div className='preview-box'>
            <input
              ref={fileInput}
              type='file'
              id='files'
              multiple
              onChange={afOnChangeEventHandler}
            ></input>
          </div> */}
          {/* 조건부 렌더링 필요: 글을 작성한 사용자 본인에게만 보여줘야함 && 답변이 하나도 달리지 않아야 함 */}
          <Button
            className='consult-adopt-btn'
            variant='contained'
            onClick={() => regist()}
          >
            등록하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default DeepABoxWrite;
