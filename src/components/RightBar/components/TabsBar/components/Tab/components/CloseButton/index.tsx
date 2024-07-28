import React, { FC, useCallback, useState } from 'react'
import Root from "./components";
import Icons from "../../../../../../../IconComponent";

interface Props {
	color: string;
	onClose: () => void;
}

const CloseButton: FC<Props> = ({onClose, color}) => {
	const [isHovered, setIsHovered] = useState(false);

	const onHover = useCallback(() => {
		setIsHovered(true)
	},[setIsHovered])

	const onUnhover = useCallback(() => {
		setIsHovered(false)
	},[setIsHovered])

	return (
		<Root onClick={onClose} onMouseEnter={onHover} onMouseLeave={onUnhover}>
			<Icons name="close" color={isHovered ? "#EE3F3E" : color} />
		</Root>
	)
}

export default CloseButton;
