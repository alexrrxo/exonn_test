import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IconNameType } from "../../../components/IconComponent";

export interface Tab {
  id: string;
	isLocked: boolean;
	title: string;
	showTitle: boolean;
	icon: IconNameType;
}

export interface InitialState {
	tabs: Tab[];
	lockedTabs: Tab[];
	visibleTabsIds: (string | undefined)[]
	selectedTab: Tab;
}

const initialState: InitialState = {
  tabs: [],
	lockedTabs: [],
	visibleTabsIds: [],
	selectedTab: {
		id:"",
		isLocked: false,
		showTitle: false,
		title: "",
		icon: "apps"
	}
};

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setUnlockedTabs: (state, action: PayloadAction<Tab[]>) => {
      state.tabs = action.payload;
    },
		setLockedTabs: (state, action: PayloadAction<Tab[]>) => {
      state.lockedTabs = action.payload;
    },
    selectTab: (state, action: PayloadAction<Tab>) => {
      state.selectedTab = action.payload;
    },
    lockTab: (state, action: PayloadAction<Tab>) => {
			const lockedTab = state.tabs.find((tab) => tab.id === action.payload.id)
			const filtredTabs = state.tabs.filter((tab) => tab.id !== action.payload.id)

			if(lockedTab) {
				lockedTab.isLocked = true
				state.lockedTabs.push(lockedTab);
			}
			state.tabs = filtredTabs;
    },
		unlockTab: (state, action: PayloadAction<Tab>) => {
      const unlockedTab = state.lockedTabs.find((tab) => tab.id === action.payload.id)
			const filtredLockedTabs = state.lockedTabs.filter((tab) => tab.id !== action.payload.id)

			if(unlockedTab) {
				unlockedTab.isLocked = false
				state.tabs.unshift(unlockedTab);
			}
			state.lockedTabs = filtredLockedTabs;
    },
		setVisibleTabIds: (state, action: PayloadAction<(string | undefined)[]>) => {
			state.visibleTabsIds = action.payload
		}
  },
});

export const { setUnlockedTabs, setLockedTabs, setVisibleTabIds, selectTab, lockTab, unlockTab } = tabsSlice.actions;

export default tabsSlice.reducer;
