import styled from "styled-components";

interface Props {
	bgcolor?: string;
	linecolor?: string;
	rightPadding?: boolean;
	borderRadius?: boolean;
	pointerEvents?: string;
}

const Root = styled.div<Props>`
	position: relative;

	padding: 15px 20px;

	padding-right: ${props => !props.rightPadding ? "15px" : "0px"};

	height: 48px;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${props => props.bgcolor};

	cursor: pointer;

	border-radius: ${props => props.borderRadius ? "6px" : "0px"};

	border-bottom: 1px solid #AEB6CE33;
	
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