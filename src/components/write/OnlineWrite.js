import React from 'react';
import './OnlineWrite.css';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { useState } from 'react';
import { GrGallery } from 'react-icons/gr';

const OnlineWrite = () => {
  const [isTitleInputClicked, setIsTitleInputClicked] = useState(false);
  const [isGroupInputClicked, setIsGroupInputClicked] = useState(false);
  const [isContextInputClicked, setIsContextInputClicked] = useState(false);

  const [myImage, setMyImage] = useState([]);

  const addImage = (e) => {
    const nowSelectImageList = e.target.files;
    const nowImageURLList = [...myImage];
    for (let i = 0; i < nowSelectImageList.length; i += 1) {
      const nowImageUrl = URL.createObjectURL(nowSelectImageList[i]);
      nowImageURLList.push(nowImageUrl);
    }
    setMyImage(nowImageURLList);
  };
  return (
    <>
      <Header />
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
          <input
            className='groupinputplaceholder'
            onFocus={() => {
              setIsGroupInputClicked(true);
            }}
            onBlur={() => {
              setIsGroupInputClicked(false);
            }}
            placeholder={isGroupInputClicked === true ? '' : '  중분류/대분류'}
          ></input>
        </div>
        <div className='answerbtn'>
          <button
            className='answerdesign'
            autoFocus={true}
            id='reg_button'
          />
          <button className='answerlinkbutton'>법률 백문백답 보러가기</button>
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
        <button className='registerbtn'>
          <div className='registerbtntext'>등록하기</div>
        </button>

        <button className='cancelbtn'>
          <div className='cancelbtntext'>취소하기</div>
        </button>

        <div>
          <label
            htmlFor='input-file'
            className='OOTDWrite-input-file'
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
            <img
              key={index}
              src={imageUrl}
              alt={`Image-${index}`}
              style={{
                maxWidth: '100px',
                maxHeight: '100px',
                transform: 'translate(-350px, 650px)',
              }}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OnlineWrite;
