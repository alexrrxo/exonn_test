import styled from "styled-components";

interface Props {
	active?: boolean;
}
const Root = styled.button<Props>`
	padding: 21px 11px;

	display: flex;
	justify-content: center;
	align-items: center;

	border: none;

	background-color: ${props => props.active ? "#4690E2" : "#FFFFFF"};

	cursor: pointer;
`;

export default Root;