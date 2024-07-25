import React, { FC } from 'react'
import Root from "./components/Root"

interface Props {
	selected: boolean;
	text: string;
}

const TabText: FC<Props> = ({ selected, text }) => {
	return (
		<Root selected={selected}>{text}</Root>
	)
}

export default TabText