import React, { FC, useCallback, useMemo, useState } from 'react'
import Root from "./components/Root"
import TabIcon from "./components/TabIcon"
import TabText from "./components/TabText"
import { Tab as TabType } from "../../../../../../../../redux/slices/tabs-slice"
import CloseButton from "../../../../../../../CloseButton"

interface Props {
	tab: TabType;
	selected?: boolean;
	isDragging?: boolean
}

const Tab: FC<Props> = ({ tab, isDragging = false, selected = false }) => {
	const bgcolor = useMemo(() => {
		const draggingColor = "#7F858D"
		const selectedColor = "#FEFEFE"
		const unselectedColor = "#FEFEFE"

		if(isDragging) return draggingColor
		if(selected) return selectedColor
		return unselectedColor
	}, [isDragging, selected])

	const textcolor = useMemo(() => {
		const draggingColor = "#FFF"
		const selectedColor = "#4690E2"
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

	return (
		<Root isDragging={isDragging} bgcolor={bgcolor} linecolor={linecolor}> 
				<div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
					<TabIcon showText={tab.showTitle} color={textcolor} name={tab.icon}/>
					{tab.showTitle && <TabText text={tab.title} textcolor={textcolor} />}
				</div>
				<CloseButton color="gray" visible={!isDragging} onClose={() => ""} />
			</Root>
	)
}

export default Tab;
