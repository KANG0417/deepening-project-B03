import React from "react";
import styled from "styled-components";
const WritingField = () => {
  return <STextArea placeholder="글을 작성해주세요(1000자 제한)" />;
};

const STextArea = styled.textarea`
  width: 30%;
  height: 60vh;
  resize: none;
`;

export default WritingField;
