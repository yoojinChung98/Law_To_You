import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/host-config';
import { useAppSelector } from '../../store';
import '../scss/Bupbong.scss';

const Bupbong = (effect, deps) => {
  const URL = API_BASE_URL;
  const token = 'Bearer ' + localStorage.getItem('accessToken');

  const [bank, setBank] = useState(''); // 은행 선택
  const [accountNumber, setAccountNumber] = useState(''); // 계좌번호
  const [userCount, setUserCount] = useState(0); // 보유 법봉

  const fetchUserCount = async () => {
    // 보유 법봉 불러오기

    await fetch(`${URL}/mypage/hammer`, {
      headers: {
        'content-type': 'application/json',
        Authorization: token,
      },
    }).then((res) => {
      res.text().then((data) => {
        setUserCount(data + '개 남았습니다.');
      });
    });
  };

  const mode = useAppSelector((state) => state.user.mode);

  const [hammer, setHammer] = useState(0);

  // selete태그 선택
  const handleChange = (event) => {
    setBank(event.target.value);
  };

  // 계좌번호 숫자만 쓸 수 있게
  const handlerValueChange = (event) => {
    const { value } = event.target;
    const formattedValue = value.replace(/[^0-9-]/g, '');
    event.target.value = formattedValue;
    setAccountNumber(event.target.value);
  };
  // 직접입력란에 음수값 설정x
  const handlerInputChange = (event) => {
    let value = Number(event.target.value);

    if (value < 0) {
      value = 0;
    }
    setHammer(value);
  };

  // 계좌 번호 확인 메서드
  function handleButtonClick(e) {
    alert(
      `(${bank}) \n계좌번호: ${accountNumber} \n\n(해당 계좌번호로 3일 후 입금처리 됩니다.)`
    );
  }

  //================사용자 기준 마이페이지 법봉 충전 화면=============================

  const onClickPayment = async (event) => {
    const { IMP } = window;

    const amountStr = event.currentTarget.getAttribute('data-amount');
    const name = event.currentTarget.getAttribute('product-name');
    const value = event.currentTarget.getAttribute('data-value');

    const amount = parseInt(amountStr.replace(/,/g, ''), 10);

    IMP.init([['imp42507411']]);
    const datas = {
      pg: 'tosspayment',
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      name: name,
      amount: amount,
      custom_data: value,
      buyer_email: '',
    };

    await IMP.request_pay(datas, async (response) => {
      const { success, error_msg } = response;
      if (success) {
        alert('결제 성공');
        window.location.reload();
        try {
          await fetch(`${URL}/mypage/charge?hammer=${value}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
              Authorization: token,
            },
          }).then((res) => {
            if (res.status === 200) {
              res.text().then((data) => {
                alert(data);
              });
            } else {
              console.error('서버로부터 실패 응답:', res);
            }
          });
        } catch (error) {
          console.log('캐치에러');
          error('서버 통신 중 오류 발생:', error);
        }
      } else {
        if (hammer <= 0) {
          alert('수량을 제대로 입력해주세요.');
          return;
        }
        console.log('결제실패');
        alert(`${error_msg}`);
      }
    });

    setHammer(`${datas.custom_data.value}`);
  };
  // 가상 결제 창
  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'http://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  // 보유 법봉
  useEffect(() => {
    fetchUserCount();
  }, []);
  // ================================사용자 끝 ==============================================

  // ==================변호사 기준 마이페이지 환전 화면====================
  const onClickExchange = async (event) => {
    const LawValue = event.currentTarget.getAttribute('data-value');

    const isConfirmed = window.confirm(
      `법봉 ${LawValue}개를 환전 하시겠습니까?`
    );

    if (isConfirmed && LawValue > 0) {
      try {
        await fetch(`${URL}/mypage/refund?hammer=${LawValue}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            Authorization: token,
          },
        }).then((res) => {
          if (res.status === 200) {
            res.text().then((data) => {
              alert(data);
              window.location.reload();
            });
          } else if (res.status === 400) {
            res.text().then((data) => {
              alert(data);
            });
          } else {
            console.error('서버로부터 실패 응답:', res);
          }
        });
      } catch (error) {
        console.log('캐치에러');
        error('서버 통신 중 오류 발생:', error);
      }
    }
  };

  return (
    <div>
      <div className='wrapper'>
        <div className='title'>
          법봉 조회/{mode === 'user' ? '충전' : '환급'}
        </div>

        <div className='info'>
          <div className='own-wrapper'>
            <span className='own label'>
              <p>보유</p>
              <img src='/img/bupbong.svg' />
            </span>
            <span className='own-count'>{userCount}</span>
          </div>
          {mode === 'lawyer' && (
            <div className='account-wrapper'>
              <span className='account-num label'>계좌번호</span>
              <div className='account-select'>
                <Select
                  value={bank}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value=''>
                    <em>--선택--</em>
                  </MenuItem>
                  <MenuItem value='국민은행'>국민은행</MenuItem>
                  <MenuItem value='신한은행'>신한은행</MenuItem>
                  <MenuItem value='하나은행'>하나은행</MenuItem>
                </Select>
                <input
                  className='account-input'
                  type='tel'
                  placeholder='계좌번호를 입력해주세요'
                  onChange={handlerValueChange}
                ></input>
                <Button
                  className='input-btn'
                  onClick={handleButtonClick}
                >
                  입력
                </Button>
              </div>
            </div>
          )}
        </div>
        <div className='box-wrapper'>
          <div
            className='box'
            onClick={mode === 'user' ? onClickPayment : onClickExchange}
            data-amount='12000'
            data-value={10}
            product-name='법봉 10개'
          >
            <div className='num'>10개</div>
            <div className='price'>12,000원</div>
          </div>
          <div
            className='box'
            onClick={mode === 'user' ? onClickPayment : onClickExchange}
            data-value={30}
            data-amount='36000'
            product-name='법봉 30개'
          >
            <div className='num'>30개</div>
            <div className='price'>36,000원</div>
          </div>
          <div
            className='box'
            onClick={mode === 'user' ? onClickPayment : onClickExchange}
            data-value={50}
            data-amount='60000'
            product-name='법봉 50개'
          >
            <div className='num'>50개</div>
            <div className='price'>60,000원</div>
          </div>
          <div className='box-input'>
            <span>직접입력</span>
            <div>
              <input
                className='input'
                type='number'
                min='0'
                onChange={handlerInputChange}
              ></input>
              <span className='unit'>개</span>
            </div>
            <div>
              <span className='unit'>총 {hammer * 1200}원</span>
            </div>
            {mode === 'user' ? (
              <Button
                className='charge-btn'
                onClick={onClickPayment}
                data-amount={hammer * 1200}
                data-value={hammer}
                product-name={'법봉 ' + [hammer] + '개'}
                type='submit'
              >
                충전하기
              </Button>
            ) : (
              <Button
                className='charge-btn'
                onClick={onClickExchange}
                data-amount={hammer * 1200}
                data-value={hammer}
                product-name={'법봉 ' + [hammer] + '개'}
                type='submit'
              >
                환급하기
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bupbong;
