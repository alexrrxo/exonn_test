import React, { FC, useCallback, useState } from "react";
import Root from "./components";
import Icons from "../IconComponent";
import { theme } from "../../utils";

interface Props {
	visible: boolean;
	color: string;
	onClose: () => void;
	position?: string;
	justifyContent?: string;
}

const CloseButton: FC<Props> = ({onClose, color, visible, position, justifyContent}) => {
	const [isHovered, setIsHovered] = useState(false);

	const onHover = useCallback(() => {
		setIsHovered(true)
	},[setIsHovered])

	const onUnhover = useCallback(() => {
		setIsHovered(false)
	},[setIsHovered])

	return (
		<Root justifyContent={justifyContent} position={position} visible={visible} onClick={onClose} onMouseEnter={onHover} onMouseLeave={onUnhover}>
			<Icons name="close" color={isHovered ? theme.primaryRed : color} />
		</Root>
	)
}

export default CloseButton;
