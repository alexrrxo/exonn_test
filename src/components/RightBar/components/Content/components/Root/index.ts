import styled from "styled-components";
import { theme } from "../../../../../../utils";

const Root = styled.div`
	padding: 20px;

	width: 100%;
	height: 100%;

	border-left: 1px solid ${theme.grayDivider};

	background-color: ${theme.secondaryGray};
`;

export default Root;