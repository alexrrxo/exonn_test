import React from 'react'
import Root from "./components/Root"
import TabsBar from "./components/TabsBar"
import Space from "./components/Space"
import Content from "./components/Content"

const RightBar = () => {
	return (
		<>
			<Root>
				<Space />
				<TabsBar />
				<Content />
			</Root>
		</>
	)
} 

export default RightBar