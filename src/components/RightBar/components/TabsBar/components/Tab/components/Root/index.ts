import styled from "styled-components";
import { theme } from "../../../../../../../../utils";

interface Props {
	bgColor?: string;
	linecolor?: string;
	rightPadding?: boolean;
	borderRadius?: boolean;
	pointerEvents?: string;
}

const Root = styled.div<Props>`
	position: relative;

	padding: 15px 20px;

	height: 48px;

	display: flex;
	justify-content: flex-start;
	align-items: center;

	background-color: ${props => props.bgColor};

	cursor: pointer;

	border-radius: ${props => props.borderRadius ? "6px" : "0px"};

	border-bottom: 1px solid ${theme.grayDivider};
	
	pointer-events: ${props => props.pointerEvents || "auto"};

	&::before {
		content: "";
		position: absolute;
		top: 0px;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: ${props => props.linecolor};
		border-radius: 1px 1px 0px 0px;
	}
`;

export default Root;