import React from "react";
import styled from "styled-components";
import { TWritingProps } from "../../types/letter";

const LetterContent = ({ setLetterContent }: TWritingProps) => {
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
      <SLetterContent
        onChange={handleChangeLetterContent}
        placeholder="글을 작성해주세요(1000자 제한)"
      />
    </>
  );
};
// };

const SLetterContent = styled.textarea`
  width: 55%;
  height: 60vh;
  border: 1px solid;
  border-radius: 5px;
  resize: none;
`;

export default LetterContent;
