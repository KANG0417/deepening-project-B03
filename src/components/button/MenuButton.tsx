import styled, { css, keyframes } from "styled-components";
import { TMenuButtonProps } from "../../types/header";

const MenuButton = (props: TMenuButtonProps) => {
  const { type, addStyle = {}, onClick } = props;

  return <SMenuButton type={type} $addStyle={addStyle} onClick={onClick} />;
};

export default MenuButton;

const jelly = keyframes`
  	from,to {
		-webkit-transform: scale(1,1);
		transform: scale(1,1)
	}
	25% {
		-webkit-transform: scale(.9,1.1);
		transform: scale(.9,1.1)
	}
	50% {
		-webkit-transform: scale(1.1,.9);
		transform: scale(1.1,.9)
	}
	75% {
		-webkit-transform: scale(.95,1.05);
		transform: scale(.95,1.05)
	}
`;

const SMenuButton = styled.button<any>`
  background-color: var(--button-background);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 8px;
  ${(props) => {
    return css`
      background-image: ${props.$addStyle.backgroundImage};
    `;
  }};
  &:hover {
    animation: ${jelly} 0.5s 1;
  }
`;
