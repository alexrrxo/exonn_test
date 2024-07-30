import React, { FC, useCallback, useMemo, useState } from "react";
import Root from "./components/Root";
import Icons from "../../../../../../../IconComponent";
import Text from "./components/Text";
import { TabI } from "../../../../../../../../redux/slices/tabs-slice";
import { theme } from "../../../../../../../../utils";

interface Props {
	tab: TabI;
	onClick: (tab: TabI) => void;
}

const ContextMenu: FC<Props> = ({ tab, onClick }) => {
	const [isHovered, setIsHovered] = useState(false);

	const onHover = useCallback(() => {
		setIsHovered(true);
	},[setIsHovered]);

	const onUnhover = useCallback(() => {
		setIsHovered(false);
	},[setIsHovered]);

	const textcolor = useMemo(() => {
		const unselectedColor = theme.primaryGray;
		const hoveredColor = theme.primaryBlack;

		if(isHovered) return hoveredColor;

		return unselectedColor;
	}, [isHovered]);

	const text = useMemo(() => {
		const isPinned = tab.isLocked ? "pinned" : "unpinned";

		return `${tab.title + " " + isPinned}`;
	}, [tab.isLocked]);

	return (
		<Root onMouseEnter={onHover} onMouseLeave={onUnhover} onClick={() => onClick(tab)}>
			<Icons name="pin" color={textcolor} />
			<Text text={text} textcolor={textcolor}/>
		</Root>
	);
};

export default ContextMenu;
