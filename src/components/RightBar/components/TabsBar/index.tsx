import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from 'react-beautiful-dnd';
import Root from "./components/Root";
import Tab from "./components/Tab";
import Button from "./components/ListButton";
import TabsContainer from "./components/TabsContainer";
import { useTypedDispatch, useTypedSelector } from "../../../../redux/store";
import { setUnlockedTabs, selectTab, Tab as TabType, setLockedTabs, setVisibleTabIds } from "../../../../redux/slices/tabs-slice";

const TabsBar = () => {
	const dispatch = useTypedDispatch()
	const {tabs, lockedTabs, visibleTabsIds, selectedTab} = useTypedSelector(state => state.tabs);

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

    dispatch(setUnlockedTabs(reorderedTabs));
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

	const onSelectTab = useCallback((tab: TabType) => {
		if(tab){
			dispatch(selectTab(tab))
		}
	}, [])

	// isDragDisabled={pendingDragId !== tab.id}

	const lineRef = useRef<HTMLDivElement>(null)
	const [isShowList, setIsShowList] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visibleEntries = entries.filter(entry => entry.isIntersecting);

				const visibleTabsIds = visibleEntries.map((entry) => entry.target?.attributes.getNamedItem("data-rbd-draggable-id")?.value);

				
				console.log("canUpdateTabsIds", canUpdateTabsIds)
				console.log("visibleTabsIds", visibleTabsIds)

				if(isShowList && canUpdateTabsIds) {
					console.log("visibleTabsIds", visibleTabsIds)
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

	const tabList = useMemo(() => isShowList ? tabs.filter((tab) => !visibleTabsIds.includes(tab.id)) : tabs, [isShowList, tabs, visibleTabsIds])

	const onDragStart = useCallback(() => {
		setCanUpdateTabsIds(false)
	}, []);

  return (
    <Root ref={lineRef}>
			<DragDropContext onDragEnd={onDragEndLocked} onBeforeDragStart={onDragStart}>
        <Droppable direction="horizontal" droppableId="droppable-0">
          {(provided) => (
            <TabsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lockedTabs.map((tab, i) => (
                <Draggable key={tab.id} draggableId={tab.id} index={i}
								disableInteractiveElementBlocking
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
      <DragDropContext onDragEnd={onDragEndUnlocked} onBeforeDragStart={onDragStart}>
        <Droppable direction="horizontal" droppableId="droppable-1">
          {(provided) => (
            <TabsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
							hideScroll={isShowList}
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
      <Button open={isShowList} onChange={setIsShowList} />
    </Root>
  );
};

export default TabsBar;
