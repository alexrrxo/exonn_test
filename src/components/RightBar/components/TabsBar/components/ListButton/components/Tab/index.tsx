import React, { FC, useCallback, useMemo, useState } from 'react'
import Root from "./components/Root"
import TabIcon from "./components/TabIcon"
import TabText from "./components/TabText"
import { TabI } from "../../../../../../../../redux/slices/tabs-slice"
import CloseButton from "../../../../../../../CloseButton"
import { theme } from "../../../../../../../../utils"

interface Props {
	tab: TabI;
	selected?: boolean;
	isDragging?: boolean
}

const Tab: FC<Props> = ({ tab, isDragging = false, selected = false }) => {
	const [isHovered, setIsHovered] = useState(false)

	const onHover = useCallback(() => {
		setIsHovered(true)
	},[setIsHovered])

	const onUnhover = useCallback(() => {
		setIsHovered(false)
	},[setIsHovered])

	const bgColor = useMemo(() => {
		const draggingColor = theme.primaryGray
		const selectedColor = theme.secondaryWhite
		const unselectedColor = theme.secondaryWhite

		if(isDragging) return draggingColor
		if(selected) return selectedColor
		return unselectedColor
	}, [isDragging, selected, isHovered])

	const textcolor = useMemo(() => {
		const draggingColor = theme.primaryWhite
		const selectedColor = theme.primaryBlue
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

	return (
		<Root
			isDragging={isDragging}
			bgColor={bgColor}
			linecolor={linecolor}
			onMouseEnter={onHover}
			onMouseLeave={onUnhover}
		> 
				<div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
					<TabIcon showText color={textcolor} name={tab.icon}/>
					<TabText text={tab.title} textcolor={textcolor} />
				</div>
				<CloseButton justifyContent="flex-end" color={theme.primaryGray} visible={!isDragging} onClose={() => ""} />
			</Root>
	)
}

export default Tab;
