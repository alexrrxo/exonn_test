import styled from "styled-components";

const Root = styled.div<{selected?: boolean}>`
	position: relative;

	padding: 15px 20px;

	height: 48px;

	display: flex;
	justify-content: center;
	align-items: center;

	background-color: ${props => props.selected ? '#F1F5F8' : '#FEFEFE'};

	cursor: pointer;
`;

export default Root;