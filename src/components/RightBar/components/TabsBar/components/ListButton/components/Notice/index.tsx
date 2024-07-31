import React, { FC } from "react";
import Root from "./components/Root";

interface Props {
	text: string;
};

const Notice: FC<Props> = ({text}) => {
	return (
		<Root>{text}</Root>
	);
};

export default Notice;
