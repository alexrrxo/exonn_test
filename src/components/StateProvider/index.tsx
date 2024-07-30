import React, { useEffect } from 'react'
import { useTypedDispatch, useTypedSelector } from "../../redux/store";
import { setLockedTabs, setTabs } from "../../redux/slices/tabs-slice";
import { reserveState } from "../../mocks";

const StateInitProvider = () => {
	const dispatch = useTypedDispatch();

  const { lockedTabs, tabs } = useTypedSelector(state => state.tabs);

  useEffect(() => {
    const storedLockedTabs = localStorage.getItem('lockedTabs');
    const storedTabs = localStorage.getItem('tabs');

    const lockedTabs = storedLockedTabs && JSON.parse(storedLockedTabs);
    const tabs = storedTabs && JSON.parse(storedTabs);

    if (lockedTabs?.length && tabs?.length) {
      dispatch(setLockedTabs(lockedTabs));
      dispatch(setTabs(tabs));
    } else {
      dispatch(setLockedTabs(reserveState.lockedTabs));
      dispatch(setTabs(reserveState.tabs));
    }
  }, [dispatch]);

  useEffect(() => {
    const stringifyData = JSON.stringify(lockedTabs);
    localStorage.setItem('lockedTabs', stringifyData);
  }, [lockedTabs]);

  useEffect(() => {
    const stringifyData = JSON.stringify(tabs);
    localStorage.setItem('tabs', stringifyData);
  }, [tabs]);

	return (
		null
	)
}

export default StateInitProvider;