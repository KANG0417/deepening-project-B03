import styled from "styled-components";
import MenuButton from "../button/MenuButton";
import WriteIcon from "../../assets/icons/writingIcon.png";
import { useNavigate } from "react-router-dom";
import UserMenuDropDown from "../dropDownList/UserMenuDropDown";
import logo from "../../assets/logos/logo.png";

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
        <SHeaderTitle onClick={handleGoToHomeClick}></SHeaderTitle>
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
  height: 88px;
  background-color: var(--header-color);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const SHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 846px;
`;

const SHeaderTitle = styled.div`
  background-image: url(${logo});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 150px;
  height: 60px;
  cursor: pointer;
`;

const SMenuBar = styled.ul`
  display: flex;
  justify-content: center;
`;
