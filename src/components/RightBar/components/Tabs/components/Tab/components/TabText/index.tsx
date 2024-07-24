import React, { FC } from 'react'
import Root from "./components/Root"

interface Props {
	textColor: string;
}

const TabText: FC<Props> = ({ textColor }) => {
	return (
		<Root color={textColor}>index</Root>
	)
}

export default TabText