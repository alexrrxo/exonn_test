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
	
	visibility: ${props => props.visible ? "visible" : "hidden"};

	background-color: transparent;
`;

export default Root;