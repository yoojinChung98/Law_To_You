import React from 'react';
import './OnlineWrite.css';
import { useState } from 'react';
import { GrGallery } from 'react-icons/gr';
import { remove } from 'resolve-url-loader/lib/file-protocol';
import { useNavigate } from 'react-router-dom';

const OnlineWrite = () => {
  const [isTitleInputClicked, setIsTitleInputClicked] = useState(false);
  const [isGroupInputClicked, setIsGroupInputClicked] = useState(false);
  const [isContextInputClicked, setIsContextInputClicked] = useState(false);

  const navigate = useNavigate();

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
      <div className='onlinewrite'>
        <div className='menu'>
          <div className='menudisign' />
          <i className='title'>제목</i>
          <i className='group'>분류</i>
          <i className='context'>내용</i>
          <i className='file'>첨부파일</i>
        </div>

        <div className='contextinput'>
          <textarea
            className='contextinputplaceholder'
            onFocus={() => {
              setIsContextInputClicked(true);
            }}
            onBlur={() => {
              setIsContextInputClicked(false);
            }}
            placeholder={
              isContextInputClicked === true
                ? ''
                : ` 상담 내용을 입력해주세요.
 상담 내용 등록 시 법봉 1개가 차감되며 등록 이후 수정이 불가능한 점 유의해주세요.
 변호사 답변 채택 후, 깊은 상담을 이어갈 시 상담 내용은 1회 수정 가능합니다.`
            }
          ></textarea>
        </div>
        <div className='titleinput'>
          <input
            className='titleinputplaceholder'
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
        <div className='groupinput'>
          <select
            className='groupinputplaceholder'
            onFocus={() => {
              setIsGroupInputClicked(true);
            }}
            onBlur={() => {
              setIsGroupInputClicked(false);
            }}
          >
            <option
              value=''
              disabled
              selected
            >
              {isGroupInputClicked === true ? '' : '대분류'}
            </option>
            <option value='가정법률'>가정법률</option>
            <option value='교통/운전'>교통/운전</option>
            <option value='국가 및 지자체'>국가 및 지자체</option>
            <option value='국방/보훈'>국방/보훈</option>
            <option value='근로/노동'>근로/노동</option>
            <option value='금융/금전'>금융/금전</option>
            <option value='무역/출입국'>무역/출입국</option>
            <option value='문화/여가생활'>문화/여가생활</option>
            <option value='민형사/소송'>민형사/소송</option>
            <option value='복지'>복지</option>
            <option value='사업'>사업</option>
            <option value='사회안전/범죄'>사회안전/범죄</option>
            <option value='소비자'>소비자</option>
            <option value='아동청소년/교육'>아동청소년/교육</option>
            <option value='정보통신/기술'>정보통신/기술</option>
            <option value='창업'>창업</option>
            <option value='환경/에너지'>환경/에너지</option>
          </select>
        </div>
        <div className='answerbtn'>
          <button
            className='answerdesign'
            autoFocus={true}
            id='reg_button'
          />
          <button
            className='answerlinkbutton'
            onClick={() => {
              navigate('/faq');
            }}
          >
            법률 백문백답 보러가기
          </button>
        </div>
        <button className='registerbtn'>등록하기</button>
        <div className='main'>
          <i className='maintext'>온라인 상담</i>
          <div className='information'>
            <p className='p3'>{`<사용자에게 안내할 온라인상담 게시판 설명>`}</p>
            <p className='p3'>
              상담받고 싶은 내용을 입력하여 여러 전문 변호사에게 브리핑을 받아볼
              수 있습니다.
            </p>
            <p className='p3'>
              질문에 달린 브리핑 중 마음에 드는 답변을 하나 골라 해당 변호사와
              더욱 깊은 상담을 나누실 수 있습니다.
            </p>
            <p className='p3'>
              온라인 상담 등록 시, 법봉 1개가 차감되며 답변마다 요구되는 법봉의
              개수는 달라질 수 있습니다.
            </p>
          </div>

          <div className='informationline' />
        </div>
        <button
          className='registerbtn'
          onClick={() => {
            navigate('/counsel');
          }}
        >
          <div className='registerbtntext'>등록하기</div>
        </button>

        <button
          className='cancelbtn'
          onClick={() => {
            navigate('/counsel');
          }}
        >
          <div className='cancelbtntext'>취소하기</div>
        </button>

        <div>
          <label
            htmlFor='input-file'
            className='OOTDWrite-input-file2'
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

export default OnlineWrite;
