import React from "react";
import styled from "styled-components";
import { TWritingProps } from "../../types/letter";

const LetterEditer = ({ setLetterTitle, setLetterContent }: TWritingProps) => {
  const handleChangeLetterTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;

    if (setLetterTitle !== null && setLetterTitle !== undefined) {
      setLetterTitle(newTitle);
    }
  };

  const handleChangeLetterContent = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const newContent = e.target.value;

    if (setLetterContent !== null && setLetterContent !== undefined) {
      setLetterContent(newContent);
    }
  };

  return (
    <>
      <SLetterTitle
        type="text"
        onChange={handleChangeLetterTitle}
        placeholder="편지 제목을 입력해주세요"
      />
      <SLetterContent
        onChange={handleChangeLetterContent}
        placeholder="편지 내용을 작성해주세요(1000자 제한)"
      />
    </>
  );
};
// };

const SLetterTitle = styled.input`
  width: 78%;
  padding: 10px;
`;

const SLetterContent = styled.textarea`
  width: 80%;
  height: 60vh;
  border: 1px solid;
  border-radius: 5px;
  resize: none;
`;

export default LetterEditer;
