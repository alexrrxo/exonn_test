import React, { useEffect } from 'react';
import "./App.css";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import { useTypedDispatch, useTypedSelector } from "./redux/store";
import { setLockedTabs, setUnlockedTabs } from "./redux/slices/tabs-slice";
import { reserveState } from "./mocks";

function App() {
	const dispatch = useTypedDispatch();

	const {lockedTabs, tabs} = useTypedSelector(state => state.tabs);

	useEffect(() => {
		const storedLockedTabs = localStorage.getItem("lockedTabs")
		const storedTabs = localStorage.getItem("tabs")

		const lockedTabs = storedLockedTabs && JSON.parse(storedLockedTabs)
		const tabs = storedTabs && JSON.parse(storedTabs)

		if(lockedTabs?.length && tabs?.length) {
			dispatch(setLockedTabs(lockedTabs))
			dispatch(setUnlockedTabs(tabs))
		} else {
			dispatch(setLockedTabs(reserveState.lockedTabs));
			dispatch(setUnlockedTabs(reserveState.tabs));
		}
	}, [])

	useEffect(() => {
		const stringifyData = JSON.stringify(lockedTabs)
		localStorage.setItem("lockedTabs", stringifyData)
	}, [lockedTabs])

	useEffect(() => {
		const stringifyData = JSON.stringify(tabs)
		localStorage.setItem("tabs", stringifyData)
	}, [tabs])

  return (
    <div className="App">
			<LeftBar />
      <RightBar />
    </div>
  );
}

export default App;
