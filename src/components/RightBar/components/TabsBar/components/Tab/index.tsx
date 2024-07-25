import React, { FC } from 'react'
import Root from "./components/Root"
import TabText from "./components/TabText"
import TabIcon from "./components/TabIcon";
import CustomTooltipComponent from "../Tooltip";

interface Props {
	showText: boolean;
	selected?: boolean;
	text: string;
	tooltip?: boolean;
}

const Tab: FC<Props> = ({ tooltip = false, showText = true, selected = false, text }) => {
	return (
		tooltip ? 
			<CustomTooltipComponent>
				<Root selected={selected}> 
					<TabIcon showText={showText} />
					{showText && <TabText selected={selected} text={text} />}
				</Root>
			</CustomTooltipComponent> 
			: 
			<Root selected={selected}> 
				<TabIcon showText={showText} />
				{showText && <TabText selected={selected} text={text} />}
			</Root>
	)
}

export default Tab