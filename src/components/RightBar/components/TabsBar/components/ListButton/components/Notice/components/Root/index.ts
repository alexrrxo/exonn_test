import styled from "styled-components";
import { theme } from "../../../../../../../../../../utils";

const Root = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	padding: 20px 15px;

	color: ${theme.primaryBlack};

	font-family: Poppins;
	font-size: 14px;
	font-weight: 500;
	line-height: 16.1px;

	space: nowrap;
	white-space: nowrap;

	cursor: pointer;
	user-select: none;
`;

export default Root;