import React from "react";
import { useState } from "react";
import styled from "styled-components";

import "react-datepicker/dist/react-datepicker.css";
import Calendar from "./Calendar";

const OptionBox = () => {
  return (
    <SOptionBox>
      <Calendar />
      <h3>공개/비공개</h3>
      <SPublicButton>공개</SPublicButton>
      <SPublicButton>익명으로 공개</SPublicButton>
      <h3>발신할 곳</h3>
      <input placeholder="보낼곳을 적어주세요"></input>
    </SOptionBox>
  );
};

const SOptionBox = styled.div`
  border: 1px solid;
  width: 30%;
  height: 60vh;
`;

const SPublicButton = styled.button`
  border: 0.1px solid;
`;
export default OptionBox;
