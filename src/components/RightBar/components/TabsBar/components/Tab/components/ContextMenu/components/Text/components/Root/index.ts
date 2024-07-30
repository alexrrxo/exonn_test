import styled from "styled-components";
import { theme } from "../../../../../../../../../../../../utils";

const Root = styled.div<{textcolor: string}>`
	margin-left: 10px;

	color: ${(props) => (props.textcolor || theme.primaryGray)};

	font-family: Poppins;
	font-size: 14px;
	font-weight: 500;
	line-height: 16.1px;

	space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	cursor: pointer;
	user-select: none;
`;

export default Root;