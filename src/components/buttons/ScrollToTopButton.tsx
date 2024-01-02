import React, { useCallback, useEffect, useRef, RefObject } from "react";
import styled from "styled-components";
import upIcon from "../../assets/icons/topChevronIcon.png";

const ScrollToTopButton = () => {
  const scrollToTopBtnRef: RefObject<HTMLButtonElement> = useRef(null);
  const handleScroll = () => {
    if (!scrollToTopBtnRef.current) return;
    if (window.scrollY > 150) {
      scrollToTopBtnRef.current.style.scale = "1";
    } else {
      scrollToTopBtnRef.current.style.scale = "0";
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScrollToTop = useCallback(() => {
    if (scrollToTopBtnRef.current) {
      document.documentElement.scrollTop = 0;
    }
  }, []);
  return (
    <SScrollToTopButton
      ref={scrollToTopBtnRef}
      onClick={handleScrollToTop}
    ></SScrollToTopButton>
  );
};
export default ScrollToTopButton;

const SScrollToTopButton = styled.button`
  background-image: url(${upIcon});
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 50px;
  height: 50px;
  padding: 5px;
  border-radius: 50%;
  border: none;
  color: var(--button-background);
  background-color: var(--header-color);
  box-shadow: 0px 4px 23px 5px rgba(0, 0, 0, 0.05);
  transition: 0.2s ease-in-out;
  scale: 0;
  cursor: pointer;
  &:hover {
    scale: 1.2;
  }
`;
