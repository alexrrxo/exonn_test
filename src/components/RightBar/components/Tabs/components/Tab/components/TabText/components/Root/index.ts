import styled from "styled-components";

const Root = styled.div<{color: string}>`
	color: ${(props) => (props.color || "#7F858D")};

	font-family: Poppins;
	font-size: 14px;
	font-weight: 500;
	line-height: 16.1px;

	cursor: pointer;
	user-select: none;
`;

export default Root;