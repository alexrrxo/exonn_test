import React, { FC } from 'react'
import Icons, { IconNameType } from "../../../../../../../../../IconComponent";

interface Props {
	showText: boolean;
	name: IconNameType;
	color?: string;
}

const TabIcon: FC<Props> = ({showText, name, color}) => {
	return (
		<div style={{marginRight: showText ? 10 : 0, height: 20}}>
			<div>
				<Icons name={name} color={color} />
			</div>
		</div>
	)
}

export default TabIcon;
