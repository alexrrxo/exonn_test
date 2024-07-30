import styled from "styled-components";
import { theme } from "../../../../utils";

const Space = styled.div`
	width: 100%;
	height: 100%;

	background-color: ${theme.primaryWhite};

	border-left: 1px solid ${theme.grayDivider};
	border-bottom: 1px solid ${theme.grayDivider};
`;

export default Space;