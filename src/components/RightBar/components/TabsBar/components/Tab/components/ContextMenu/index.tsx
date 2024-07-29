import React, { FC } from 'react'
import Root from "./components/Root";
import Icons from "../../../../../../../IconComponent";
import Text from "./components/Text";
import { Tab as TabType } from "../../../../../../../../redux/slices/tabs-slice";

interface Props {
	tab: TabType
	onClick: (tab: TabType) => void;
}

const ContextMenu: FC<Props> = ({ tab, onClick }) => {
	return (
		<Root onClick={() => onClick(tab)}>
			<Icons name="pin" color={tab.isLocked ? "#343434" : "gray"} />
			<Text text={tab.title} textcolor={tab.isLocked ? "#343434" : "gray"}/>
		</Root>
	)
}

export default ContextMenu;
