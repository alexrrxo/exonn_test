import styled from "styled-components";
import { theme } from "../../../../../../../../utils";

interface Props {
	active?: boolean;
}
const Root = styled.button<Props>`
	padding: 20.7px 11px;

	display: flex;
	justify-content: center;
	align-items: center;

	border: none;

	background-color: ${props => props.active ? theme.primaryBlue : theme.secondaryWhite};
	border-bottom: 1px solid ${theme.grayDivider};

	cursor: pointer;
`;

export default Root;