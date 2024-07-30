import React, { FC, useCallback, useState } from "react";
import Root from "./components";
import Icons from "../../../../../../../IconComponent";
import { theme } from "../../../../../../../../utils";

interface Props {
	visible: boolean;
	color: string;
	onClose: () => void;
};

const CloseButton: FC<Props> = ({onClose, color, visible}) => {
	const [isHovered, setIsHovered] = useState(false);

	const onHover = useCallback(() => {
		setIsHovered(true);
	},[setIsHovered]);

	const onUnhover = useCallback(() => {
		setIsHovered(false);
	},[setIsHovered]);

	return (
		<Root visible={visible} onClick={onClose} onMouseEnter={onHover} onMouseLeave={onUnhover}>
			<Icons name="close" color={isHovered ? theme.primaryRed : color} />
		</Root>
	);
};

export default CloseButton;
