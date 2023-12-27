import styled from "styled-components";
import MenuButton from "../button/MenuButton";
import WriteIcon from "../../assets/icons/writingIcon.png";

import { useNavigate } from "react-router";
import UserMenuDropDown from "../dropDownList/UserMenuDropDown";

const Header = () => {
  const navigate = useNavigate();

  const handleWriteMoveClick = () => {
    navigate("/write");
  };

  const handleGoToHomeClick = () => {
    navigate("/");
  };

  const onOptionClick = (option: string) => {
    if (option === "마이페이지") {
      navigate("/write");
    }
    if (option === "로그아웃") {
      alert("로그아웃");
    }
  };

  return (
    <SHeaderWrapper>
      <SHeaderContainer>
        <SHeaderTitle onClick={handleGoToHomeClick}>익명의 편지함</SHeaderTitle>
        <SMenuBar>
          <li>
            <MenuButton
              type={"button"}
              addStyle={{ backgroundImage: `url(${WriteIcon})` }}
              onClick={handleWriteMoveClick}
            />
          </li>
          <li>
            <UserMenuDropDown
              options={["마이페이지", "로그아웃"]}
              onOptionClick={(option) => onOptionClick(option)}
            />
          </li>
        </SMenuBar>
      </SHeaderContainer>
    </SHeaderWrapper>
  );
};

export default Header;

const SHeaderWrapper = styled.header`
  width: 100%;
  height: 150px;
  background-image: linear-gradient(
    to top,
    var(--white) 50%,
    var(--header-color) 50%
  );
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const SHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

const SHeaderTitle = styled.h1`
  font-size: 4rem;
  margin: 0 0 0 650px;
  cursor: pointer;
`;

const SMenuBar = styled.ul`
  display: flex;
  justify-content: center;
`;
