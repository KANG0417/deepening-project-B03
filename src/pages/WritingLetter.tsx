import React, { useState } from "react";
import styled from "styled-components";
import WritingField from "../components/writingLetter/WritingField";
import OptionBox from "../components/writingLetter/OptionBox";

const WritingLetter = () => {
  const [letterIndex, setLetterIndex] = useState<string>("");

  // WritingField에서 편지내용 전달 텍스트
  const handleLetterIndexChange = (text: string): void => {
    setLetterIndex(text);
  };

  return (
    <>
      <FieldContainer>
        <WritingField onLetterIndexChange={handleLetterIndexChange} />
        <OptionBox letterIndex={letterIndex} />
      </FieldContainer>
    </>
  );
};

const FieldContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  width: 75%;
  height: 90%;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 10vw;
`;

export default WritingLetter;
