import React, { FC } from "react"
import Root from "./components/Root"

interface Props {
	text: string;
	textcolor: string;
};

const Text: FC<Props> = ({ text, textcolor }) => {
	return (
		<Root textcolor={textcolor}>{text}</Root>
	);
};

export default Text;