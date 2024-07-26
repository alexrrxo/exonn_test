import React, { FC, useCallback, useMemo } from 'react'
import Root from "./components/Root"
import TabText from "./components/TabText"
import TabIcon from "./components/TabIcon";
import CustomTooltipComponent from "../Tooltip";
import { useTypedDispatch } from "../../../../../../redux/store";
import { Tab as TabType, unlockTab } from "../../../../../../redux/slices/tabs-slice";

interface Props {
	tab: TabType;
	showText: boolean;
	selected?: boolean;
	text: string;
	tooltip?: boolean;
	isDragging?: boolean
	isLocked?: boolean;
}

const Tab: FC<Props> = ({ tab, isLocked = false, isDragging = false, tooltip = false, showText = true, selected = false, text }) => {
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

		if(isLocked) return lockedColor;
		if(isDragging) return unselectedColor

		if(selected) return selectedColor;

		return unselectedColor;
	}, [selected, isDragging, isLocked])

	const dispatch = useTypedDispatch();

	const unlockTabHandler = useCallback(() => {
		dispatch(unlockTab(tab))
	}, [dispatch])

	return (
		tooltip ? 
			<CustomTooltipComponent>
				<Root bgcolor={bgcolor} linecolor={linecolor}> 
					<TabIcon showText={showText} />
					{showText && <TabText text={text} textcolor={textcolor} />}
				</Root>
			</CustomTooltipComponent> 
			: 
			<Root bgcolor={bgcolor} linecolor={linecolor}> 
				<TabIcon showText={showText} />
				{showText && <TabText text={text} textcolor={textcolor} />}
				{isLocked && <button onClick={unlockTabHandler}>X</button>}
			</Root>
	)
}

export default Tab