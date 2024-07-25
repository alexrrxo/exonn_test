import React, { ReactElement, FC } from 'react';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/system';

// Создаем стилизованный компонент Tooltip
const CustomTooltip = styled(({ className, ...props }: TooltipProps & { className?: string }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f0f0f0', // Цвет фона
    color: '#333', // Цвет текста
    fontSize: 14,
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
    <CustomTooltip title={children} arrow>
			{children}
		</CustomTooltip>
  );
};

export default CustomTooltipComponent;
