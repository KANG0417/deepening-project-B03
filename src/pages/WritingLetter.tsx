import React from "react";
import styled from "styled-components";
import WritingField from "../components/writingLetter/WritingField";
import OptionBox from "../components/writingLetter/OptionBox";

const WritingLetter = () => {
  return (
    <>
      <FieldContainer>
        <WritingField
          onLetterIndexChange={function (text: string): void {
            throw new Error("Function not implemented.");
          }}
        />
        <OptionBox />
      </FieldContainer>
    </>
  );
};

const FieldContainer = styled.div`
  background-color: #fff; /* Set a white background */
  border: 1px solid #ddd; /* Add a border for a paper-like appearance */
  padding: 20px; /* Add some padding */
  width: 50%; /* Adjust the width as needed */
  margin: 20px auto; /* Center the letter on the page */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
  display: flex;
  gap: 10vw;
`;

export default WritingLetter;
