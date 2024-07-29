import styled from "styled-components";

interface Props {
	hideScroll?: boolean;
}
const TabsContainer = styled.div<Props>`
	position: relative;

	width: 100%;
	height: 100%;

	display: flex;
	justify-content: flex-start;
	align-items: center;

	overflow-x: ${props => props.hideScroll ? "hidden" : "auto"};
	white-space: nowrap;

	background-color: #F1F5F8;

	overflow-y: hidden;

	& > div:not(:last-child) > * > * {
		& :before {
			content: '';
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 10px;
			width: 0; 
			border-left: 1px solid #AEB6CE33;
  	}
	}

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
`;

export default TabsContainer;