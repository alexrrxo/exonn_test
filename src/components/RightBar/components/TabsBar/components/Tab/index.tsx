import React, { FC, MouseEvent, useCallback, useMemo, useState } from 'react'
import Root from "./components/Root"
import TabText from "./components/TabText"
import TabIcon from "./components/TabIcon";
import CustomTooltipComponent from "./components/Tooltip";
import { useTypedDispatch } from "../../../../../../redux/store";
import { lockTab, selectTab, TabI, unlockTab } from "../../../../../../redux/slices/tabs-slice";
import CloseButton from "../../../../../CloseButton";
import { Menu } from "@mui/material";
import ContextMenu from "./components/ContextMenu";
import { theme } from "../../../../../../utils";

interface Props {
	tab: TabI;
	selected?: boolean;
	tooltip?: boolean;
	isDragging?: boolean
}

const Tab: FC<Props> = ({ tab, isDragging = false, tooltip = false, selected = false }) => {
	const dispatch = useTypedDispatch()

	const [isHovered, setIsHovered] = useState(false);
	const [anchorPosition, setAnchorPosition] = useState<null | { top: number, left: number }>(null);

  const handleRightClick = useCallback((event: MouseEvent<HTMLDivElement>, tab: TabI) => {
		event.preventDefault();
		setAnchorPosition({ top: event.clientY + 15, left: event.clientX + 10 });
		dispatch(selectTab(tab));
	}, [dispatch]);
	
	const handleClose = useCallback(() => {
		setAnchorPosition(null);
	}, []);

	const bgColor = useMemo(() => {
		const draggingColor = theme.primaryGray
		const selectedColor = theme.thirdGray
		const unselectedColor = theme.secondaryWhite
		const hoveredColor = theme.thirdGray

		if(isDragging) return draggingColor
		if(selected) return selectedColor
		if(isHovered) return hoveredColor
		return unselectedColor
	}, [isDragging, selected, isHovered])

	const textcolor = useMemo(() => {
		const draggingColor = theme.primaryWhite
		const selectedColor = theme.primaryBlack;
		const unselectedColor = theme.primaryGray
		const hoveredColor = theme.primaryBlack

		if(isDragging) return draggingColor
		if(selected) return selectedColor
		if(isHovered) return hoveredColor

		return unselectedColor
	}, [isDragging, selected, isHovered])

	const linecolor = useMemo(() => {
		const lockedColor = theme.primaryGray
		const selectedColor = theme.primaryBlue
		const unselectedColor = theme.transparent

		if(tab.isLocked) return lockedColor;
		if(isDragging) return unselectedColor

		if(selected) return selectedColor;

		return unselectedColor;
	}, [selected, isDragging, tab.isLocked])

	const isReduceWidth = useMemo(() => {
		if(isDragging) return false;
		if(tab.isLocked && isHovered) return true;
	}, [isHovered, tab.isLocked, isDragging]);

	const unlockTabHandler = useCallback(() => {
		dispatch(unlockTab(tab))
	}, [dispatch])

	const [showClose, setShoweClose] = useState(false)

	const mouseEnterHandler = useCallback(() => {
		setShoweClose(true);
		setIsHovered(true)
	}, [setShoweClose, setIsHovered])

	const mouseLeaveHandler = useCallback(() => {
		setShoweClose(false);
		setIsHovered(false)
	}, [setShoweClose, setIsHovered])

	const handleClick = useCallback((tab: TabI) => {
		if(tab.isLocked) {
			dispatch(unlockTab(tab))
		} else {
			dispatch(lockTab(tab))
		}
	}, [tab])

	const showTooltip = useMemo(() => {
		if(isDragging) return false;
		if(Boolean(anchorPosition) && tooltip) return false
		if(tooltip) return true
		return false

	}, [anchorPosition, tooltip, isDragging])

	return (
			<CustomTooltipComponent tooltip={showTooltip}
				tooltipComponent={
					<Root
						borderRadius bgColor={theme.primaryWhite}
						linecolor={theme.transparent}
						pointerEvents="none"
					> 
						<TabIcon showText color={textcolor} name={tab.icon} />
						<TabText text={tab.title} textcolor={textcolor} />
				</Root>
				}
			>
				<div>
				<Root 
					rightPadding={tab.isLocked}
					bgColor={bgColor}
					linecolor={linecolor}
					onContextMenu={(e) => handleRightClick(e, tab)}
					onMouseEnter={mouseEnterHandler}
					onMouseLeave={mouseLeaveHandler}
				> 
					<TabIcon showText={!tooltip} color={textcolor} name={tab.icon} />
					{tab.showTitle && <TabText reduceWidth={isReduceWidth} text={tab.title} textcolor={textcolor} />}
					{isReduceWidth && <CloseButton position={"absolute"} color={theme.primaryGray} visible={showClose} onClose={unlockTabHandler} />}
				</Root>
					<Menu
						open={Boolean(anchorPosition)}
						anchorReference="anchorPosition"
						anchorPosition={anchorPosition ? { top: anchorPosition.top, left: anchorPosition.left } : undefined}
						onClose={handleClose}
					>
						<ContextMenu onClick={handleClick} tab={tab}/>
					</Menu>
				</div>
			</CustomTooltipComponent> 
	)
}

export default Tab