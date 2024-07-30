import React, { FC } from "react"
import Root from "./components/Root"

interface Props {
	text: string;
	textcolor: string;
	reduceWidth?: boolean;
}

const TabText: FC<Props> = ({ text, textcolor, reduceWidth = false }) => {
	return (
		<Root textcolor={textcolor} reduceWidth={reduceWidth}>{text}</Root>
	);
};

export default TabText;