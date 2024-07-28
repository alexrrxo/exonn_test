import * as React from 'react';
import Menu from '@mui/material/Menu';
import Root from "./components/Root";
import Tab from "../Tab";
import styled from "styled-components";
import Icons from "../../../../../IconComponent";
import { useTypedSelector } from "../../../../../../redux/store";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTypedDispatch } from "../../../../../../redux/store";
import { setUnlockedTabs, setVisibleTabIds, Tab as TabType } from "../../../../../../redux/slices/tabs-slice";

const CustomMenu = styled(Menu)(({ theme }) => ({
  pointerEvents: "none",
  '& .MuiMenu-root': {
    marginRight: 0,
  },
}));

interface Props {
  open: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListButton: React.FC<Props> = ({ open, onChange }) => {
  const dispatch = useTypedDispatch();
  const { tabs, visibleTabsIds, selectedTab } = useTypedSelector(state => state.tabs);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
      onChange(false);
    } else {
      setAnchorEl(event.currentTarget);
      onChange(true);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    onChange(false);
  };

  const listTabs = React.useMemo(() => tabs.filter((tab) => !visibleTabsIds.includes(tab.id)), [tabs, visibleTabsIds]);

  return (
    <div>
      <Root onClick={handleClick} active={open}>
        <Icons name={anchorEl ? "up-arrow" : "down-arrow"} color={open ? "#FFF" : "black"} />
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
						{listTabs.map((tab, i) => (
							<Tab
								tab={tab}
								isDragging={false}
								tooltip={false}
								selected={selectedTab?.id === tab.id}
							/>
						))}
					</CustomMenu>
    </div>
  );
};
export default ListButton;
