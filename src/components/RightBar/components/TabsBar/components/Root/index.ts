import styled from "styled-components";

const Root = styled.div`
	position: relative;

	width: 100%;
	height: 100%;

	display: grid;
  grid-template-columns: auto 1fr 32px; 

&::-webkit-scrollbar {
  height: 8px;
}

&::-webkit-scrollbar-track {
  background: #FEFEFE;
}

&::-webkit-scrollbar-thumb {
	border: 2px solid #FEFEFE;
  border-radius: 40px;
  background-color: #7F858D66;
}

&::-webkit-scrollbar-thumb:hover {
    background: #a0a4a8; /* Цвет ползунка при наведении */
}
`;

export default Root;