import styled from "styled-components";
import MenuButton from "../buttons/MenuButton";
import UserIcon from "../../assets/icons/userIcon.png";
import topChvronIcon from "../../assets/icons/topChevronIcon.png";
import bottomChvronIcon from "../../assets/icons/bottomChevronIcon.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";

const MYPAGE = "마이페이지";
const LOGOUT = "로그아웃";
const OPTIONS = [MYPAGE, LOGOUT];

const UserMenuDropDown = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dropMenuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleDropDownClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleOutsideClose = (event: any) => {
      if (
        isExpanded &&
        dropMenuRef.current &&
        !dropMenuRef.current.contains(event.target)
      ) {
        console.log(event.target, event.currentTarget, dropMenuRef.current);
        setIsExpanded(false);
      }
    };
    document.addEventListener("click", handleOutsideClose);
    return () => document.removeEventListener("click", handleOutsideClose);
  }, [isExpanded]);

  const onOptionClick = async (option: string) => {
    switch (option) {
      case MYPAGE:
        return navigate("/mypage");
      case LOGOUT:
        return navigate("/login");
      default:
        alert("관리자에게 문의하세요");
        break;
    }
  };

  return (
    <>
      <SMenuContainer onClick={handleDropDownClick} ref={dropMenuRef}>
        <MenuButton
          type={"button"}
          addStyle={{ backgroundImage: `url(${UserIcon})` }}
        />
        <img src={isExpanded ? topChvronIcon : bottomChvronIcon} alt="화살표" />
      </SMenuContainer>
      {isExpanded && (
        <SDropDownContainer>
          <SDropDownList>
            {OPTIONS.map((option) => (
              <li
                onClick={() => {
                  setIsExpanded(false);
                  onOptionClick(option);
                }}
                key={option}
              >
                {option}
              </li>
            ))}
          </SDropDownList>
        </SDropDownContainer>
      )}
    </>
  );
};

export default UserMenuDropDown;

const SMenuContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SDropDownContainer = styled.div`
  position: absolute;
  top: 7rem;
  /* right: 25rem; */
  width: 120px;
  padding: 15px 0 15px 0;
  border-radius: 15px;
  color: var(--button-background);
  background-color: var(--white);
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.05);
  font-size: 1.5rem;
`;

const SDropDownList = styled.ul`
  li {
    text-align: center;
    font-weight: 600;
    padding: 5px 0 5px 0;
    transition: all 0.5s ease;
  }
  li:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;
