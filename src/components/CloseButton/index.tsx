import React, { FC, useCallback, useState } from 'react'
import Root from "./components";
import Icons from "../IconComponent";

interface Props {
	visible: boolean;
	color: string;
	onClose: () => void;
}

const CloseButton: FC<Props> = ({onClose, color, visible}) => {
	const [isHovered, setIsHovered] = useState(false);

	const onHover = useCallback(() => {
		setIsHovered(true)
	},[setIsHovered])

	const onUnhover = useCallback(() => {
		setIsHovered(false)
	},[setIsHovered])

	return (
		<Root visible={visible} onClick={onClose} onMouseEnter={onHover} onMouseLeave={onUnhover}>
			<Icons name="close" color={isHovered ? "#EE3F3E" : color} />
		</Root>
	)
}

export default CloseButton;
