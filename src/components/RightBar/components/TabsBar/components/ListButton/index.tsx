import * as React from 'react';
import Menu from '@mui/material/Menu';
import Root from "./components/Root";
import Tab from "../Tab";
import styled from "styled-components";
import Icons from "../../../../../IconComponent";

const CustomMenu = styled(Menu)(({ theme }) => ({
  '& .MuiMenu-root': {
    marginRight: 0,
  },
}));

export default function ListButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Root onClick={handleClick}>
    		<Icons name={anchorEl ? "up-arrow" : "down-arrow"} color={open ? "black" : "#FFF"} />
    	</Root>
      <CustomMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
				marginThreshold={0}
				
      >
        <Tab tab={{} as any} />
        <Tab tab={{} as any} />
        <Tab tab={{} as any} />
      </CustomMenu>
    </div>
  );
}