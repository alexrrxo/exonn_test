import styled from "styled-components";
import { theme } from "../../../../../../../../utils";

const Root = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: 6px;
	background-color: ${theme.primaryWhite};
`;

export default Root;