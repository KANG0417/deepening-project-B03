import styled from "styled-components";
import { TDropDownProps } from "../../types/header";
import MenuButton from "../button/MenuButton";
import UserIcon from "../../assets/icons/userIcon.png";
import topChvronIcon from "../../assets/icons/topChevronIcon.png";
import bottomChvronIcon from "../../assets/icons/bottomChevronIcon.png";
import { useState } from "react";

const UserMenuDropDown = (props: TDropDownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { options, onOptionClick } = props;
  const topDropDown = isExpanded;
  const bottomDropDown = !isExpanded;

  const handleDropDownClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SDropDownContainer>
      <MenuButton
        type={"button"}
        addStyle={{ backgroundImage: `url(${UserIcon})` }}
        onClick={handleDropDownClick}
      />
      {topDropDown && <img src={`${topChvronIcon}`} alt="위쪽화살표아이콘" />}
      {bottomDropDown && (
        <img src={`${bottomChvronIcon}`} alt="아래쪽화살표아이콘" />
      )}
      {isExpanded && (
        <SDropDownList>
          {options.map((option) => (
            <li onClick={() => onOptionClick(option)} key={option}>
              {option}
            </li>
          ))}
        </SDropDownList>
      )}
    </SDropDownContainer>
  );
};

export default UserMenuDropDown;

const SDropDownContainer = styled.div`
  position: absolute;
  top: 11rem;
  right: 15rem;
  width: 120px;
  padding: 15px 0 15px 0;
  border-radius: 15px;
  background-color: var(--white);
  border: 2.5px solid var(--header-color);
  font-size: 1.5rem;
`;

const SDropDownList = styled.ul`
  li {
    text-align: center;
    font-weight: 600;
    padding: 5px 0 5px 0;
  }
  li:hover {
    color: var(--white);
    cursor: pointer;
    background-color: var(--button-background);
  }
`;
