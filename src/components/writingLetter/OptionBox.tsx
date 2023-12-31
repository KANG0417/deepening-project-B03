import React, { useState } from "react";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "./Calendar";
import WritingField from "./WritingField";

const OptionBox = ({ letterIndex }: { letterIndex: string }) => {
  const initialTags = ["신년인사", "연인에게", "익명에게"];
  const [tags, setTags] = useState<string[]>(initialTags);
  const [isSendImmediate, setIsSendImmediate] = useState<boolean>(true);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // 바로보내기 or 예약보내기 버튼 활성화
  const SendToggleButton = (isSendImmediate: boolean) => {
    setIsSendImmediate(isSendImmediate);
    if (!isSendImmediate) {
      setSelectedDate(new Date());
    }
  };

  // 공개 or 비공개 버튼 활성화
  const ToggleButton = (isPublic: boolean) => {
    setIsPublic(isPublic);
  };

  // 태그 클릭 시 동작
  const TagHandler = (clickedTag: string) => {
    setSelectedTag((prevSelectedTag) =>
      prevSelectedTag === clickedTag ? null : clickedTag,
    );
  };

  // 보내기 버튼
  const SendInformationHandler = () => {
    const userInformation = {
      tags: selectedTag ? [selectedTag] : [],
      isSendImmediate,
      isPublic,
      selectedDate,
      letterIndex,
    };
    console.log(userInformation);
  };

  return (
    <>
      <SOptionBox>
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
        {isSendImmediate ? null : (
          <Calendar setSelectedDate={setSelectedDate} />
        )}
        <h3>공개/비공개</h3>
        <SPublicButton onClick={() => ToggleButton(true)} active={isPublic}>
          공개
        </SPublicButton>
        <SPublicButton onClick={() => ToggleButton(false)} active={!isPublic}>
          익명으로 공개
        </SPublicButton>
        <div></div>
        <SSendButton onClick={SendInformationHandler}>보내기</SSendButton>
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
  background-color: ${(props) => (props.active ? "#90c3ff" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
`;

const SSendButton = styled.button`
  border: 0.1px solid;
  width: 10vw;
`;

export default OptionBox;
