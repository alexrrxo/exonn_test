import styled from "styled-components";
import { theme } from "../../../../../../../../utils";

const Root = styled.div`
	& > div:not(:last-child) > * > * {
			border-bottom: 1px solid ${theme.grayDivider};
		}
`;

export default Root;
