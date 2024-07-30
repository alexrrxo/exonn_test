import React from 'react';
import Root from './components/Root';
import { useTypedSelector } from '../../../../../../redux/store';
import { Route, Routes } from 'react-router-dom'; // Изменен импорт

const Page = () => {
  const { lockedTabs, tabs } = useTypedSelector((state) => state.tabs);

  return (
    <Routes>
			{lockedTabs.map((tab) => (
				<Route key={tab.id} path={`${tab.title}`} element={<Root>{tab.title}</Root>} />
			))}
			{tabs.map((tab) => (
				<Route key={tab.id} path={`${tab.title}`} element={<Root>{tab.title}</Root>} />
			))}
			<Route path={`/`} element={<Root>Home page</Root>} />
    </Routes>
  );
};

export default Page;
