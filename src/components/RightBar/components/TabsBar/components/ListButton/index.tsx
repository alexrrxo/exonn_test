import React,{ useCallback, useEffect, useMemo } from "react";
import Root from "./components/Root";
import Tab from "./components/Tab";
import Icons from "../../../../../IconComponent";
import { useTypedSelector } from "../../../../../../redux/store";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useTypedDispatch } from "../../../../../../redux/store";
import { setTabs, TabI } from "../../../../../../redux/slices/tabs-slice";
import Space from "./components/Space";
import TabsContainer from "./components/TabsContainer";
import { theme } from "../../../../../../utils";
import CustomMenu from "./components/CustomMenu";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  onChange: React.Dispatch<React.SetStateAction<boolean>>;
	onSelectTab: (tab: TabI) => void;
};

const ListButton: React.FC<Props> = ({ open, onChange, onSelectTab }) => {
  const dispatch = useTypedDispatch();
  const { tabs, visibleTabsIds, selectedTab } = useTypedSelector(state => state.tabs);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const listTabs = useMemo(() => tabs.filter((tab) => !visibleTabsIds.includes(tab.id)), [tabs, visibleTabsIds]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		if (anchorEl) {
			setAnchorEl(null);
			onChange(false);
		} else {
			setAnchorEl(event.currentTarget);
			onChange(true);
		}
	}, [anchorEl, onChange]);
	
	const handleClose = useCallback(() => {
		setAnchorEl(null);
		onChange(false);
	}, [onChange]);
	
	const onDragEnd = useCallback((result: DropResult) => {
		if (!result.destination) return;
	
		const newTabs = Array.from(listTabs);
		const [removed] = newTabs.splice(result.source.index, 1);
		newTabs.splice(result.destination.index, 0, removed);
	
		const firstTabs = tabs.filter((tab) => visibleTabsIds.includes(tab.id));
		const data = [...firstTabs, ...newTabs];
	
		dispatch(setTabs(data));
	}, [listTabs, tabs, visibleTabsIds, dispatch]);

	useEffect(() => {
		if(!open) {
			setAnchorEl(null);
		}
	}, [open]);

  return (
    <div>
      <Root onClick={handleClick} active={open}>
        <Icons name={anchorEl ? "up-arrow" : "down-arrow"} color={open ? theme.primaryWhite : theme.primaryBlack} />
      </Root>
			{!open && <Space />}
      <DragDropContext onDragEnd={onDragEnd}>
        <CustomMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          marginThreshold={0}
        >
          <Droppable droppableId="droppable-list-button">
            {(provided) => (
              <TabsContainer ref={provided.innerRef} {...provided.droppableProps}>
                {listTabs.map((tab, i) => (
                  <Draggable key={tab.id} draggableId={tab.id} index={i}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
												onClick={() => onSelectTab(tab)}
                      >
												<Link to={tab.title}>
													<Tab
														tab={tab}
														isDragging={snapshot.isDragging}
														selected={selectedTab?.id === tab.id}
													/>
												</Link>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TabsContainer>
            )}
          </Droppable>
        </CustomMenu>
      </DragDropContext>
    </div>
  );
};

export default ListButton;
