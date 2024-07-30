import styled from "styled-components";
import { theme } from "../../../../../../../../../../utils";

interface Props {
	textcolor: string;
	reduceWidth?: boolean;
}

const Root = styled.div<Props>`
	color: ${(props) => (props.textcolor || theme.primaryGray)};

	width: ${props => props.reduceWidth ? "calc(100% - 36px)" : "100%" };

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