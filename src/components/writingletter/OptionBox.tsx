import React, { useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "./Calendar";

const OptionBox = () => {
  const [isSendImmediate, setIsSendImmediate] = useState<boolean>(true);
  const [isImmediate, setIsImmediate] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>("");

  //바로보내기 or 예약보내기 버튼 활성화
  const SendToggleButton = (isSendImmediate: boolean) => {
    setIsSendImmediate(isSendImmediate);
  };
  //공개 or 비공개 버튼 활성화
  const ToggleButton = (isImmediate: boolean) => {
    setIsImmediate(isImmediate);
  };

  const inputTextHandler = (e: any) => {
    setInputText(e.target.value);
    console.log(inputText);
  };
  return (
    <>
      <SOptionBox>
        <SPublicButton
          onClick={() => SendToggleButton(true)}
          active={isSendImmediate}
        >
          바로보내기
        </SPublicButton>
        <SPublicButton
          onClick={() => SendToggleButton(false)}
          active={!isSendImmediate}
        >
          예약보내기
        </SPublicButton>
        {isSendImmediate ? null : <Calendar />}
        <h3>공개/비공개</h3>
        <SPublicButton onClick={() => ToggleButton(true)} active={isImmediate}>
          공개
        </SPublicButton>
        <SPublicButton
          onClick={() => ToggleButton(false)}
          active={!isImmediate}
        >
          익명으로 공개
        </SPublicButton>
        <div>
          <h3>발신할 곳</h3>
          <input
            onChange={inputTextHandler}
            placeholder="보낼곳을 적어주세요"
          />
        </div>
        <SSendButton>보내기</SSendButton>
      </SOptionBox>
    </>
  );
};

const SOptionBox = styled.div`
  border: 1px solid;
  width: 30%;
  height: 60vh;
`;

const SPublicButton = styled.button<{ active: boolean }>`
  border: 0.1px solid;
  background-color: ${(props) => (props.active ? "#00f" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
`;

const SSendButton = styled.button`
  border: 0.1px solid;
  width: 10vw;
`;
export default OptionBox;
