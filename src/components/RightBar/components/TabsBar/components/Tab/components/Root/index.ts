import styled from "styled-components";

interface Props {
	bgcolor?: string;
	linecolor?: string;
}

const Root = styled.div<Props>`
	position: relative;

	padding: 15px 20px;

	padding-right: 0px;

	height: 48px;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${props => props.bgcolor};
	border-radius: 6px;

	cursor: pointer;
		
	&::before {
		content: "";
		position: absolute;
		top: 4px;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: ${props => props.linecolor};
		border-radius: 1px 1px 0px 0px;
	}
`;

export default Root;