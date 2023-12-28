import React from "react";
import styled from "styled-components";
import WritingField from "../components/writingLetter/WritingField";
import OptionBox from "../components/writingLetter/OptionBox";

const WritingLetter = () => {
  return (
    <>
      <FieldContainer>
        <WritingField />
        <OptionBox />
      </FieldContainer>
    </>
  );
};

const FieldContainer = styled.div`
  display: flex;
  gap: 10vw;
`;
export default WritingLetter;
