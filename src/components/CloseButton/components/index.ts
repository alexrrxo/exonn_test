import { position } from './../../../../node_modules/@types/stylis/index.d';
import styled from "styled-components";
import { theme } from "../../../utils";

interface Props {
	visible: boolean;
	position?: string;
	justifyContent?: string;
}
const Root = styled.div<Props>`
	position: ${props => props.position || "relative"};

	right: 0;

	width: 36px;
	height: 100%;

	display: flex;
	justify-content: ${props => props.justifyContent || "center"};
	align-items: center;
	
	visibility: ${props => props.visible ? "visible" : "hidden"};

	background-color: ${theme.transparent};
`;

export default Root;