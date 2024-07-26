import React, { ReactElement, FC } from 'react';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/system';

// Создаем стилизованный компонент Tooltip
const CustomTooltip = styled(({ className, ...props }: TooltipProps & { className?: string }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
		padding: 0,
    color: '#333',
    fontSize: 14,
		border: "1px solid #AEB6CE33",
    backgroundColor: '#f0f0f0',
		borderRadius: "6px"
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#f0f0f0', // Цвет стрелки
  },
}));

interface CustomTooltipComponentProps {
  children: ReactElement;
}

const CustomTooltipComponent: FC<CustomTooltipComponentProps> = ({children }) => {
  return (
    <CustomTooltip title={children} >
			{children}
		</CustomTooltip>
  );
};

export default CustomTooltipComponent;
