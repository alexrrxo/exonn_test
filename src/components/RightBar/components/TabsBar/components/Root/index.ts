import styled from "styled-components";

const Root = styled.div`
	position: relative;

	width: 100%;
	height: 100%;

	display: grid;
  grid-template-columns: 1fr 32px; 

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

& > div:not(:first-child)::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 10px;
    width: 0; 
    border-left: 1px solid #AEB6CE33;
  }
`;

export default Root;