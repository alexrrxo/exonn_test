import styled from "styled-components";

const Root = styled.div<{textcolor: string}>`
	color: ${(props) => (props.textcolor || "#7F858D")};

	font-family: Poppins;
	font-size: 14px;
	font-weight: 500;
	line-height: 16.1px;

	space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	cursor: pointer;
	user-select: none;
`;

export default Root;