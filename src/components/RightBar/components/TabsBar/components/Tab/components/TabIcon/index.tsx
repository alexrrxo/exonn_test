import React, { FC } from 'react'
import {ReactComponent as Bank} from "../../../../../../../../icons/apps.svg"

interface Props {
	showText: boolean;
}

const TabIcon: FC<Props> = ({showText}) => {
	return (
		<div style={{marginRight: showText ? 10 : 0, height: 20}}>
			<div>
				<Bank width={16} height={16} color="red" />
			</div>
		</div>
	)
}

export default TabIcon;
