import styled from "styled-components";

interface Props {
	bgcolor?: string;
	linecolor?: string;
	isDragging?: boolean;
}

const Root = styled.div<Props>`
	position: relative;

	margin: 0px 15px;
	margin-right: ${props => props.isDragging ? "10px" : "15px"};

	padding-left: ${props => props.isDragging ? "5px" : "0px"};
	padding-right: 0px;

	height: 48px;

	display: flex;
	justify-content: space-between;
	align-items: center;

	background-color: ${props => props.bgcolor};

	cursor: pointer;
`;

export default Root;