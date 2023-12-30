import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <SFooterWrapper>
      <SFooterTitle>ⓒ copyright 2023 Letters</SFooterTitle>
    </SFooterWrapper>
  );
};

export default Footer;

const SFooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 203px;
  background-color: var(--button-background);
`;

const SFooterTitle = styled.h2`
  font-size: 2rem;
`;
