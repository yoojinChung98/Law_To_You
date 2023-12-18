import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useState } from "react";
import "../scss/Bupbong.scss";

const Bupbong = () => {
  const [age, setAge] = useState("");
  return (
    <div>
      <div className="wrapper">
        <div className="title">법봉 조회/충전</div>
        <div className="info">
          <div className="own-wrapper">
            <span className="own label">
              <p>보유</p>
              <img src="/img/bupbong.svg" />
            </span>
            <span className="own-count">80개</span>
          </div>
          <div className="account-wrapper">
            <span className="account-num label">계좌번호</span>
            <div className="account-select">
              <Select
                value={age}
                // onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>--선택--</em>
                </MenuItem>
                <MenuItem value={10}>국민은행</MenuItem>
                <MenuItem value={20}>신한은행</MenuItem>
                <MenuItem value={30}>하나은행</MenuItem>
              </Select>
              <input
                className="account-input"
                placeholder="계좌번호를 입력해주세요"
              ></input>
              <Button className="input-btn">입력</Button>
            </div>
          </div>
        </div>
        <div className="box-wrapper">
          <div className="box">
            <div className="num">10개</div>
            <div className="price">10,000원</div>
          </div>
          <div className="box">
            <div className="num">50개</div>
            <div className="price">50,000원</div>
          </div>
          <div className="box">
            <div className="num">100개</div>
            <div className="price">100,000원</div>
          </div>
          <div className="box-input">
            <span>직접입력</span>
            <div>
              <input className="input"></input>
              <span className="unit">개</span>
            </div>
            <div>
              <input className="input"></input>
              <span className="unit">원</span>
            </div>
            <Button className="charge-btn">충전하기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bupbong;
