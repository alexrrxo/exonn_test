import React from 'react'
import Root from "./components/Root"
import Tab from "./components/Tab"

const activeColor = "#343434"
const pasiveColor = "#7F858D"

const TabsBar = () => {
	return (
		<Root>
			<Tab textColor={activeColor} showText />
			<Tab textColor={activeColor} showText />
			<Tab textColor={activeColor} showText />
			<Tab textColor={pasiveColor} showText />
			<Tab textColor={pasiveColor} showText />
			<Tab textColor={pasiveColor} showText={false} />
		</Root>
	)
}

export default TabsBar