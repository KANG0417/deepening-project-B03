import styled from "styled-components";
import MenuButton from "../button/MenuButton";
import WriteIcon from "../../assets/icons/writingIcon.png";
import { useNavigate } from "react-router-dom";
import UserMenuDropDown from "../dropDownList/UserMenuDropDown";

const Header = () => {
  const navigate = useNavigate();

  const handleWriteMoveClick = () => {
    navigate("/write");
  };

  const handleGoToHomeClick = () => {
    navigate("/");
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
            <UserMenuDropDown />
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
