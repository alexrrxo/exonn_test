import React, { ReactElement, FC } from "react";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/system';
import { theme } from "../../../../../../../../utils";

const CustomTooltip = styled(({ className, ...props }: TooltipProps & { className?: string }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
		padding: 0,
    color: '#333',
    fontSize: 14,
		border: `1px solid ${theme.grayDivider}`,
    backgroundColor: '#f0f0f0',
		borderRadius: "6px"
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#f0f0f0',
  },
}));

interface CustomTooltipComponentProps {
	tooltip?: boolean;
  children: ReactElement;
	tooltipComponent: ReactElement;
}

const CustomTooltipComponent: FC<CustomTooltipComponentProps> = ({children, tooltip, tooltipComponent}) => {
  return (
    <CustomTooltip title={tooltip ? tooltipComponent : ""} >
			{children}
		</CustomTooltip>
  );
};

export default CustomTooltipComponent;
