import styled from "styled-components";

const Root = styled.div`
	widht: 100%;
	height: 59px;

	display: flex;
	justify-content: flex-start;
	align-items: center;

	overflow-x: auto;
	white-space: nowrap;

	background-color: green;

&::-webkit-scrollbar {
  height: 8px;
}

&::-webkit-scrollbar-track {
  background: #FEFEFE;
}

&::-webkit-scrollbar-thumb {
	border: 2px solid #FEFEFE;
  border-radius: 40px;
  background-color: #7F858D;
}

&::-webkit-scrollbar-thumb:hover {
    background: #a0a4a8; /* Цвет ползунка при наведении */
}
`;

export default Root;