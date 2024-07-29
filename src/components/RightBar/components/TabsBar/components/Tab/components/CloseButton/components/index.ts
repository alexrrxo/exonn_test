import styled from "styled-components";

interface Props {
	visible: boolean;
}
const Root = styled.div<Props>`
	width: 34px;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
	
	opacity: ${props => props.visible ? "1" : "0"};

	background-color: transparent;
`;

export default Root;