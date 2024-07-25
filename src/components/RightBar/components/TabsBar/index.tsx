import React, { useCallback, useState } from 'react'
import Root from "./components/Root"
import Tab from "./components/Tab"
import Button from "./components/ListButton"
import TabsContainer from "./components/TabsContainer"

const activeColor = "#343434"
const pasiveColor = "#7F858D"

const tabs = [
  "Dashboard",
  "Banking",
  "Telefonie",
  "Accounting",
  "Verkauf",
  "Statistik",
  "Post Office",
  "Administration",
  "Help",
  "Warenbestand",
  "Auswahllisten",
  "Einkauf",
  "Rechn",
  "Lagerverwaltung",
	"Dashboard",
  "Banking",
  "Telefonie",
  "Accounting",
];

const TabsBar = () => {
	const [isOpenList, setIsOpenList] = useState<boolean>(false)

	const openListHandler = useCallback(() => {
		if(isOpenList) {
			setIsOpenList(false)
		} else {
			setIsOpenList(true)
		}
	}, [isOpenList])

	return (
			<Root>
				<TabsContainer>
					{tabs.map((tab, i) => <Tab key={i} showText={i === 3 ? false : true} tooltip={i === 3 ? true : false} text={tab} selected={i === 2} />)}
				</TabsContainer>
				<Button />
			</Root>
	)
}

export default TabsBar