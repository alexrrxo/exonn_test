import React, { FC, MouseEvent, useCallback, useMemo, useState } from 'react'
import Root from "./components/Root"
import TabText from "./components/TabText"
import TabIcon from "./components/TabIcon";
import CustomTooltipComponent from "./components/Tooltip";
import { useTypedDispatch } from "../../../../../../redux/store";
import { lockTab, selectTab, Tab as TabType, unlockTab } from "../../../../../../redux/slices/tabs-slice";
import CloseButton from "../../../../../CloseButton";
import { Menu } from "@mui/material";
import ContextMenu from "./components/ContextMenu";

interface Props {
	tab: TabType;
	selected?: boolean;
	tooltip?: boolean;
	isDragging?: boolean
}

const Tab: FC<Props> = ({ tab, isDragging = false, tooltip = false, selected = false }) => {
	const dipatch = useTypedDispatch()

	const [anchorPosition, setAnchorPosition] = useState<null | { top: number, left: number }>(null);

  const handleRightClick = (event: MouseEvent<HTMLDivElement>, tab: TabType) => {
    event.preventDefault();
    setAnchorPosition({ top: event.clientY + 15, left: event.clientX + 10 });
		dipatch(selectTab(tab))
  };

  const handleClose = () => {
    setAnchorPosition(null);
  };

	const bgcolor = useMemo(() => {
		const draggingColor = "#7F858D"
		const selectedColor = "#F4F7F9"
		const unselectedColor = "#FEFEFE"

		if(isDragging) return draggingColor
		if(selected) return selectedColor
		return unselectedColor
	}, [isDragging, selected])

	const textcolor = useMemo(() => {
		const draggingColor = "#FFF"
		const selectedColor = "#343434"
		const unselectedColor = "#7F858D"

		if(isDragging) return draggingColor
		if(selected) return selectedColor
		return unselectedColor
	}, [isDragging, selected])

	const linecolor = useMemo(() => {
		const lockedColor = "#7F858D"
		const selectedColor = "#4690E2"
		const unselectedColor = "transparent"

		if(tab.isLocked) return lockedColor;
		if(isDragging) return unselectedColor

		if(selected) return selectedColor;

		return unselectedColor;
	}, [selected, isDragging, tab.isLocked])

	const dispatch = useTypedDispatch();

	const unlockTabHandler = useCallback(() => {
		dispatch(unlockTab(tab))
	}, [dispatch])

	const [showClose, setShoweClose] = useState(false)

	const onShowClose = useCallback(() => {
		setShoweClose(true);
	}, [setShoweClose])

	const onHideClose = useCallback(() => {
		setShoweClose(false);
	}, [setShoweClose])

	const handleClick = useCallback((tab: TabType) => {
		if(tab.isLocked) {
			dispatch(unlockTab(tab))
		} else {
			dispatch(lockTab(tab))
		}
	}, [tab])

	const showTooltip = useMemo(() => {
		if(Boolean(anchorPosition) && tooltip) return false
		if(tooltip) return true
		return false

	}, [anchorPosition, tooltip])

	return (
			<CustomTooltipComponent tooltip={showTooltip}
				tooltipComponent={
					<Root
						borderRadius bgcolor={"#FFF"}
						linecolor={"#transparent"}
						pointerEvents="none"
					> 
						<TabIcon showText color={textcolor} name={tab.icon} />
						<TabText text={tab.title} textcolor={textcolor} />
				</Root>
				}
			>
				<div>
				<Root onContextMenu={(e) => handleRightClick(e, tab)} rightPadding={tab.isLocked} bgcolor={bgcolor} linecolor={linecolor} onMouseEnter={onShowClose} onMouseLeave={onHideClose}> 
					<TabIcon showText={!tooltip} color={textcolor} name={tab.icon} />
					{tab.showTitle && <TabText text={tab.title} textcolor={textcolor} />}
					{tab.isLocked && <CloseButton color="gray" visible={showClose} onClose={unlockTabHandler} />}
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