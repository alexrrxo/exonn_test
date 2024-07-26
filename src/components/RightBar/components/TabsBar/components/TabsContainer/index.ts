import styled from "styled-components";

const TabsContainer = styled.div`
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: flex-start;
	align-items: center;

	overflow-x: auto;
	white-space: nowrap;

	background-color: #FFF;

	overflow-y: hidden;

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
    background: #a0a4a8;
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

export default TabsContainer;