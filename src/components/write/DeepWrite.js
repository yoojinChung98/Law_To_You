import React from 'react';
// import './DeepWrite.css';

import { useState } from 'react';
import { GrGallery } from 'react-icons/gr';

const DeepWrite = () => {
  const [isTitleInputClicked, setIsTitleInputClicked] = useState(false);
  const [isGroupInputClicked, setIsGroupInputClicked] = useState(false);
  const [isContextInputClicked, setIsContextInputClicked] = useState(false);

  const [myImage, setMyImage] = useState([]);
  // 선택된 이미지 상태 추가
  const [selectedImage, setSelectedImage] = useState(null);

  const addImage = (e) => {
    const nowSelectImageList = e.target.files;
    const nowImageURLList = [...myImage];
    for (let i = 0; i < nowSelectImageList.length; i += 1) {
      const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
      nowImageURLList.push(nowImageUrl);
    }
    setMyImage(nowImageURLList);
  };

  // 이미지 삭제 함수 추가
  const removeImage = (index) => {
    const newImageList = [...myImage];
    newImageList.splice(index, 1);
    setMyImage(newImageList);
  };

  return (
    <>
      <div className='deepwrite3'>
        <div className='menu3'>
          <div className='menudisign3' />
          <i className='title3'>제목</i>
          <i className='group3'>내용</i>
          <i className='file3'>첨부파일</i>
        </div>

        <div className='contextinput3'>
          <textarea
            className='contextinputplaceholder3'
            onFocus={() => {
              setIsContextInputClicked(true);
            }}
            onBlur={() => {
              setIsContextInputClicked(false);
            }}
            placeholder={
              isContextInputClicked === true ? '' : ` 상담 내용을 입력해주세요.`
            }
          ></textarea>
        </div>
        <div className='titleinput3'>
          <input
            className='titleinputplaceholder3'
            onFocus={() => {
              setIsTitleInputClicked(true);
            }}
            onBlur={() => {
              setIsTitleInputClicked(false);
            }}
            placeholder={
              isTitleInputClicked === true ? '' : '  상담 제목을 입력해주세요.'
            }
          ></input>
        </div>

        {/* <div>
          <input
            type='file'
            onChange={handleFileChange}
          />
          <button onClick={handleUpload}>Upload</button>
        </div> */}

        <button className='registerbtn3'>등록하기</button>
        <div className='main3'>
          <i className='maintext3'>깊은 상담</i>
          <div className='information3'>
            <p className='p33'>
              온라인 상담 글의 내용이 변경되었다면 이곳에서 수정하실 수
              있습니다.
            </p>
            <p className='p33'>
              자세한 정보를 제공해주시면 보다 심도 있는 상담을 받으실 수
              있습니다.
            </p>
            <p className='p33'>
              깊은 상담 등록 후, 더 이상의 수정은 불가능하며 변호사가 요구한
              만큼의 법봉이 차감됩니다.
            </p>
            <p className='p33'>
              7일내 답변이 달리지 않으면 차감된 법봉은 자동 환불 처리됩니다.
            </p>
          </div>
          <div className='informationline3' />
        </div>
        <button className='registerbtn3'>
          <div className='registerbtntext3'>등록하기</div>
        </button>

        <button className='cancelbtn3'>
          <div className='cancelbtntext3'>취소하기</div>
        </button>

        <div>
          <label
            htmlFor='input-file'
            className='OOTDWrite-input-file3'
          >
            <GrGallery />
            첨부파일 등록
            <input
              type='file'
              multiple='multiple'
              id='input-file'
              style={{ display: 'none' }}
              accept='.jpg, .jpeg, .png'
              onChange={addImage}
            />
          </label>

          {myImage.map((imageUrl, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                display: 'inline-block',
                margin: '10px',
                transform: 'translate(-200px, 645px)',
              }}
            >
              <img
                src={imageUrl}
                alt={`Image-${index}`}
                style={{
                  maxWidth: '95px',
                  maxHeight: '95px',
                }}
              />
              <button
                className='ImageDelete'
                onClick={() => removeImage(index)}
                style={{
                  backgroundColor: 'var(--light-brown)',
                  border: 'none',
                  color: 'white',
                  textAlign: 'center',
                }}
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DeepWrite;
