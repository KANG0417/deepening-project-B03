import React, { useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "./Calendar";
import { TWritingProps } from "../../types/letter";

const OptionBox = () => {
  // // 바로보내기 or 예약보내기 버튼 활성화
  // const SendToggleButton = (isSendImmediate: boolean) => {
  //   setIsSendImmediate(isSendImmediate);
  //   if (!isSendImmediate) {
  //     setSelectedDate(new Date());
  //   }
  // };

  // // 공개 or 비공개 버튼 활성화
  // const ToggleButton = (isPublic: boolean) => {
  //   setIsPublic(isPublic);
  // };

  // // 태그 클릭 시 동작
  // const TagHandler = (clickedTag: string) => {
  //   setSelectedTag((prevSelectedTag) =>
  //     prevSelectedTag === clickedTag ? null : clickedTag,
  //   );
  // };

  // 보내기 버튼

  return (
    <>
      <SOptionBox>
        {/* <SButtonText>태그를 선택해주세요</SButtonText>
        <div>
          {tags.map((tag) => (
            <SPublicButton
              key={tag}
              onClick={() => TagHandler(tag)}
              active={selectedTag === tag}
            >
              {tag}
            </SPublicButton>
          ))}
        </div>
        <SButtonText>보내는 날짜를 선택해주세요</SButtonText>
        <SButtonGroup>
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
        </SButtonGroup>
        {isSendImmediate ? null : (
          <Calendar setSelectedDate={setSelectedDate} />
        )}
        <SButtonText>공개/비공개를 선택해주세요</SButtonText>
        <SButtonGroup>
          <SPublicButton onClick={() => ToggleButton(true)} active={isPublic}>
            공개
          </SPublicButton>
          <SPublicButton onClick={() => ToggleButton(false)} active={!isPublic}>
            익명으로 공개
          </SPublicButton>
        </SButtonGroup>
        <SSendButton onClick={SendInformationHandler}>보내기</SSendButton> */}
      </SOptionBox>
    </>
  );
};

const SOptionBox = styled.div`
  padding-top: 3%;
  border: 1px solid;
  border-radius: 5px;
  width: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5%;
  flex-wrap: wrap; /* 추가: 요소가 여러 행에 걸쳐 표시되도록 설정 */
`;

const SButtonGroup = styled.div`
  display: flex;
  gap: 5%; /* 각 버튼 사이의 간격 조절 */

  /* 수정된 부분: 바로보내기, 예약보내기와 공개, 익명으로 공개가 같은 선상에 위치하도록 설정 */
  & > button {
    width: 10vw;
    height: 5vh;
    margin-bottom: 5%;
  }
`;

const SPublicButton = styled.button<{ active: boolean }>`
  width: 5vw;
  height: 5vh;
  margin: 0 10px 0 10px;
  border: 0.1px solid;
  border-radius: 15px;
  background-color: ${(props) => (props.active ? "#90c3ff" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  &:hover {
    background-color: #90c3ff;
    color: #fff;
  }
`;

const SSendButton = styled.button`
  border: 0.1px solid;
  border-radius: 15px;
  width: 10vw;
  height: 5vh;
  &:hover {
    background-color: #90c3ff;
    color: #fff;
  }
`;

const SButtonText = styled.h3`
  font-size: 15px;
`;
export default OptionBox;
