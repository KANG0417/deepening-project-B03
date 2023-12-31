import React, { useState } from "react";
import styled from "styled-components";

const WritingField = ({
  onLetterIndexChange,
}: {
  onLetterIndexChange: (text: string) => void;
}) => {
  const [letterIndex, setLetterIndex] = useState<string>("");

  const LetterIndexHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLetterIndex(e.target.value);
    onLetterIndexChange(e.target.value);
    console.log(letterIndex);
  };

  return (
    <>
      <STextArea
        onChange={LetterIndexHandler}
        placeholder="글을 작성해주세요(1000자 제한)"
      />
    </>
  );
};

const STextArea = styled.textarea`
  width: 30%;
  height: 60vh;
  resize: none;
`;

export default WritingField;
