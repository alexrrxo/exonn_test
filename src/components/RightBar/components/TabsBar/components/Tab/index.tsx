import React, { FC, useCallback, useMemo, useState } from 'react'
import Root from "./components/Root"
import TabText from "./components/TabText"
import TabIcon from "./components/TabIcon";
import CustomTooltipComponent from "../Tooltip";
import { useTypedDispatch } from "../../../../../../redux/store";
import { lockTab, Tab as TabType, unlockTab } from "../../../../../../redux/slices/tabs-slice";
import CloseButton from "./components/CloseButton";

interface Props {
	tab: TabType;
	selected?: boolean;
	tooltip?: boolean;
	isDragging?: boolean
}

const Tab: FC<Props> = ({ tab, isDragging = false, tooltip = false, selected = false }) => {
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

	const lockTabHandler = useCallback(() => {
		dispatch(lockTab(tab))
	}, [dispatch])

	const [showClose, setShoweClose] = useState(false)

	const onShowClose = useCallback(() => {
		setShoweClose(true);
	}, [setShoweClose])

	const onHideClose = useCallback(() => {
		setShoweClose(false);
	}, [setShoweClose])

	return (
		tooltip ? 
			<CustomTooltipComponent>
				<Root rightPadding={tab.isLocked} bgcolor={bgcolor} linecolor={linecolor} onDoubleClick={lockTabHandler} onMouseEnter={onShowClose} onMouseLeave={onHideClose}> 
					<TabIcon showText={tab.showTitle} color={textcolor} name={tab.icon} />
					{tab.showTitle && <TabText text={tab.title} textcolor={textcolor} />}
					{tab.isLocked && <CloseButton color="gray" visible={showClose} onClose={unlockTabHandler} />}
				</Root>
			</CustomTooltipComponent> 
			: 
			<Root rightPadding={tab.isLocked} bgcolor={bgcolor} linecolor={linecolor} onDoubleClick={lockTabHandler} onMouseEnter={onShowClose} onMouseLeave={onHideClose}> 
				<TabIcon showText={tab.showTitle} color={textcolor} name={tab.icon}/>
				{tab.showTitle && <TabText text={tab.title} textcolor={textcolor} />}
				{tab.isLocked && <CloseButton color="gray" visible={showClose} onClose={unlockTabHandler} />}
			</Root>
	)
}

export default Tab