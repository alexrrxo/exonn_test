import React, { useCallback, useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Root from "./components/Root";
import Tab from "./components/Tab";
import Button from "./components/ListButton";
import TabsContainer from "./components/TabsContainer";
import { useTypedDispatch, useTypedSelector } from "../../../../redux/store";
import { setTabs, selectTab, TabI, setLockedTabs, setVisibleTabIds } from "../../../../redux/slices/tabs-slice";
import Space from "./components/Space";

const TabsBar = () => {
	const dispatch = useTypedDispatch()
	const {tabs, lockedTabs, selectedTab} = useTypedSelector(state => state.tabs);

  const [pendingDragId, setPendingDragId] = useState<string | null>(null);
	
  const timeoutRef = useRef<any>(null);

	const [canUpdateTabsIds, setCanUpdateTabsIds] = useState(true)

  const onDragEndLocked = (result: DropResult) => {
		setCanUpdateTabsIds(true)
    clearTimeout(timeoutRef.current);
    setPendingDragId(null);

    if (!result.destination) return;

    const reorderedTabs = Array.from(lockedTabs);
    const [removed] = reorderedTabs.splice(result.source.index, 1);
    reorderedTabs.splice(result.destination.index, 0, removed);

    dispatch(setLockedTabs(reorderedTabs));
  };

  const onDragEndUnlocked = (result: DropResult) => {
		setCanUpdateTabsIds(true)
    clearTimeout(timeoutRef.current);
    setPendingDragId(null);

    if (!result.destination) return;

    const reorderedTabs = Array.from(tabs);
    const [removed] = reorderedTabs.splice(result.source.index, 1);
    reorderedTabs.splice(result.destination.index, 0, removed);

    dispatch(setTabs(reorderedTabs));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, draggableId: string) => {
		e.preventDefault()
		e.stopPropagation()

    setTimeout(() => {
      setPendingDragId(draggableId);
    }, 2000);
  };

  const handleTouchEnd = () => {
    clearTimeout(timeoutRef.current);
		setPendingDragId(null)
  };

  const handleTouchMove = () => {
    clearTimeout(timeoutRef.current);
  };

	const onSelectTab = useCallback((tab: TabI) => {
		if(tab){
			dispatch(selectTab(tab))
		}
	}, [])

	const lineRef = useRef<HTMLDivElement>(null)
	const [isShowList, setIsShowList] = useState(false);


	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

	useEffect(() => {
		setCanUpdateTabsIds(true);
		setIsShowList(false)
	}, [windowWidth])

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
			})

			const items = lineRef?.current?.children[1]?.childNodes;
			items?.forEach((item: any) => observer.observe(item));
		}

    return () => {
      observer.disconnect();
    };
  }, [isShowList, tabs, pendingDragId, lineRef, lockedTabs, canUpdateTabsIds]);

	const onDragStart = useCallback(() => {
		setCanUpdateTabsIds(false)
	}, []);

  return (
    <Root ref={lineRef}>
			<div>
				<DragDropContext onDragEnd={onDragEndLocked} onBeforeDragStart={onDragStart}>
					<Droppable direction="horizontal" droppableId="droppable-0">
						{(provided) => (
							<TabsContainer
								{...provided.droppableProps}
								ref={provided.innerRef}
								style={{height: 48, borderRight: "1px solid #AEB6CE33"}}
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
												onTouchStart={(e) => handleTouchStart(e, tab.id)}
												onTouchEnd={handleTouchEnd}
												onTouchMove={handleTouchMove}
											>
												<Tab
													tab={tab}
													isDragging={snapshot.isDragging}
													tooltip={i === 3}
													selected={selectedTab?.id === tab.id}
												/>
											</div>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</TabsContainer>
						)}
					</Droppable>
				</DragDropContext>
				{!isShowList && <Space />}
			</div>
      <DragDropContext onDragEnd={onDragEndUnlocked} onBeforeDragStart={onDragStart}>
        <Droppable direction="horizontal" droppableId="droppable-1">
          {(provided) => (
            <TabsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
							hideScroll={isShowList}
							style={{height: isShowList ? "48px" : "56px"}}
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
                      onTouchStart={(e) => handleTouchStart(e, tab.id)}
                      onTouchEnd={handleTouchEnd}
                      onTouchMove={handleTouchMove}
                    >
                      <Tab
												tab={tab}
                        isDragging={snapshot.isDragging}
                        tooltip={i === 3}
                        selected={selectedTab?.id === tab.id}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TabsContainer>
          )}
        </Droppable>
      </DragDropContext>
      <Button onSelectTab={onSelectTab} open={isShowList} onChange={setIsShowList} />
    </Root>
  );
};

export default TabsBar;
