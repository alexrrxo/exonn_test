import styled from "styled-components";
import { theme } from "../../../../../../utils";

const Root = styled.div`
	position: relative;

	width: 100%;
	height: 100%;

	display: grid;
  grid-template-columns: auto 1fr 32px;

	background-color: ${theme.thirdGray};

&::-webkit-scrollbar {
  height: 8px;
}

&::-webkit-scrollbar-track {
  background: ${theme.secondaryWhite};
}

&::-webkit-scrollbar-thumb {
	border: 2px solid ${theme.secondaryWhite};
  border-radius: 40px;
  background-color: ${theme.primaryGray};
}

&::-webkit-scrollbar-thumb:hover {
	background: #a0a4a8;
}
`;

export default Root;