import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ScrollOnTheTop = () => {
  const [toggleBtn, setToggleBtn] = useState<boolean>(true);

  const handleScroll = () => {
    const { scrollY } = window;

    scrollY > 200 ? setToggleBtn(true) : setToggleBtn(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClickGoToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return toggleBtn ? (
    <SScrollButton onClick={handleClickGoToTop}>맨위로</SScrollButton>
  ) : null;
};

export default ScrollOnTheTop;

const SScrollButton = styled.button`
  position: absolute;
  border: 1px solid red;
`;
