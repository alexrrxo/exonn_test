import React, { FC } from 'react'
import Root from "./components/Root"
import TabText from "./components/TabText"
import TabIcon from "./components/TabIcon";

interface Props {
	textColor: string;
	showText: boolean;
}

const Tab: FC<Props> = ({ textColor, showText = true }) => {
	return (
		<Root>
			<TabIcon />
			{showText && <TabText textColor={textColor} />}
		</Root>
	)
}

export default Tab