import React, { useCallback, useState, useRef, useEffect, useMemo } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import Root from "./components/Root";
import Tab from "./components/Tab";
import Button from "./components/ListButton";
import TabsContainer from "./components/TabsContainer";
import { useTypedDispatch, useTypedSelector } from "../../../../redux/store";
import { setTabs, selectTab, TabI, setLockedTabs, setVisibleTabIds } from "../../../../redux/slices/tabs-slice";
import Space from "./components/Space";
import { theme } from "../../../../utils";
import { Link } from "react-router-dom";

const TabsBar = () => {
	const dispatch = useTypedDispatch();
	const {tabs, lockedTabs, selectedTab} = useTypedSelector(state => state.tabs);
	const [canUpdateTabsIds, setCanUpdateTabsIds] = useState(true);

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const [isShowList, setIsShowList] = useState(false);
	const [isShowButton, setIsShowButton] = useState(true); 
	
	const lineRef = useRef<HTMLDivElement>(null);

	const tabContainerHeight = useMemo(() => {
		if(isShowList && isShowButton) return "48px";
		if(!isShowList && isShowButton) return "56px";
		if(!isShowButton) return "48px"
	}, [isShowList, isShowButton]);

	const onDragStart = useCallback(() => {
		setCanUpdateTabsIds(false);
	}, []);

  const onDragEndLocked = useCallback((result: DropResult) => {
		setCanUpdateTabsIds(true);
		if (!result.destination) return;
	
		const reorderedTabs = Array.from(lockedTabs);
		const [removed] = reorderedTabs.splice(result.source.index, 1);
		reorderedTabs.splice(result.destination.index, 0, removed);
	
		dispatch(setLockedTabs(reorderedTabs));
	}, [lockedTabs, dispatch]);
	
	const onDragEndUnlocked = useCallback((result: DropResult) => {
		setCanUpdateTabsIds(true);
		if (!result.destination) return;
	
		const reorderedTabs = Array.from(tabs);
		const [removed] = reorderedTabs.splice(result.source.index, 1);
		reorderedTabs.splice(result.destination.index, 0, removed);
	
		dispatch(setTabs(reorderedTabs));
	}, [tabs, dispatch]);

	const onSelectTab = useCallback((tab: TabI) => {
		if(tab){
			dispatch(selectTab(tab));
		}
	}, []);

	useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

	useEffect(() => {
		setCanUpdateTabsIds(true);
		setIsShowList(false);
	}, [windowWidth]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visibleEntries = entries.filter(entry => entry.isIntersecting);
				const visibleTabsIds = visibleEntries.map((entry) => entry.target?.attributes.getNamedItem("data-rbd-draggable-id")?.value);
				
				if(isShowList && canUpdateTabsIds) {
					dispatch(setVisibleTabIds(visibleTabsIds));
				}
			},
			{
				root: lineRef.current?.children[1],
				threshold: 0.1 
			}
		);

		if(isShowList) {
			lineRef.current?.children[1]?.scrollTo({
				left: 0,
			});

			const items = lineRef?.current?.children[1]?.childNodes;
			items?.forEach((item: any) => observer.observe(item));
		}
    return () => {
      observer.disconnect();
    };
  }, [isShowList, tabs, lineRef, lockedTabs, canUpdateTabsIds, windowWidth]);

	useEffect(() => {
    if (lineRef?.current && !isShowList) {
				setTimeout(() => {
				const tabsScrollWidth = lineRef?.current?.children[1]?.scrollWidth as any;
				const tabsWidth = lineRef?.current?.children[1]?.clientWidth as any;

				const hasHScroll = tabsScrollWidth - 2 > tabsWidth;

				setIsShowButton(hasHScroll)
			}, 0)
    } else {
			setIsShowButton(true)
		}
  }, [windowWidth]);

	console.log("isShowButton", isShowButton)
	console.log("isShowList", isShowList)

  return (
    <Root ref={lineRef}>
			<div>
				<DragDropContext onDragEnd={onDragEndLocked} onBeforeDragStart={onDragStart}>
					<Droppable direction="horizontal" droppableId="droppable-0">
						{(provided) => (
							<TabsContainer
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={{height: 48, borderRight: `1px solid ${theme.grayDivider}`}}
							>
								{lockedTabs.map((tab, i) => (
									<Draggable key={tab.id} draggableId={tab.id} index={i}
									>
										{(provided, snapshot) => (
											<div
												ref={provided.innerRef}
												onClick={() => onSelectTab(tab)}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
											>
												<Link to={tab.title}>
													<Tab
														tab={tab}
														isDragging={snapshot.isDragging}
														tooltip={!tab.showTitle}
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
				</DragDropContext>
				{(!isShowList && isShowButton) && <Space />}
			</div>
      <DragDropContext onDragEnd={onDragEndUnlocked} onBeforeDragStart={onDragStart}>
        <Droppable direction="horizontal" droppableId="droppable-1">
          {(provided) => (
            <TabsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
							hideScroll={isShowList}
							style={{height: tabContainerHeight}}
            >
							{tabs.map((tab, i) => (
                <Draggable key={tab.id} draggableId={tab.id} index={i}
								isDragDisabled={tab.isLocked}
								>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
											onClick={() => onSelectTab(tab)}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
											<Link to={tab.title}>
												<Tab
													tab={tab}
													isDragging={snapshot.isDragging}
													tooltip={!tab.showTitle}
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
      </DragDropContext>
      {isShowButton && <Button onSelectTab={onSelectTab} open={isShowList} onChange={setIsShowList} />}
    </Root>
  );
};

export default TabsBar;
