import React, { useState } from "react";
import styled from "styled-components";

const WritingField = ({
  onLetterIndexChange,
}: {
  onLetterIndexChange: (text: string) => void;
}) => {
  const [letterIndex, setLetterIndex] = useState<string>("");

  const LetterIndexHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setLetterIndex(newText);
    onLetterIndexChange(newText); // 변경된 텍스트를 부모 컴포넌트로 전달
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
  width: 55%;
  height: 60vh;
  border: 1px solid;
  border-radius: 5px;
  resize: none;
`;

export default WritingField;
