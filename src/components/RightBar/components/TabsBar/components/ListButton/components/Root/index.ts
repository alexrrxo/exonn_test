import styled from "styled-components";

interface Props {
	active?: boolean;
}
const Root = styled.button<Props>`
	padding: 20.7px 11px;

	display: flex;
	justify-content: center;
	align-items: center;

	border: none;

	background-color: ${props => props.active ? "#4690E2" : "#FFFFFF"};
	border-bottom: 1px solid #AEB6CE33;

	cursor: pointer;
`;

export default Root;