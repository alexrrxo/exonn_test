import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IconNameType } from "../../../components/IconComponent";

export interface Tab {
  id: string;
	isLocked: boolean;
	title: string;
	showTitle: boolean;
	icon: IconNameType;
}

interface InitialState {
	tabs: Tab[];
	lockedTabs: Tab[];
	visibleTabsIds: (string | undefined)[]
	selectedTab: Tab;
}

const initialState: InitialState = {
  tabs: [
		{ id: "2", title: "Telefonie", isLocked: false, showTitle: true, icon: "phone-call" },
		{ id: "3", title: "Accounting", isLocked: false, showTitle: true, icon: "user-add" },
		{ id: "4", title: "Verkauf", isLocked: false, showTitle: true, icon: "shop" },
		{ id: "5", title: "Statistik", isLocked: false, showTitle: true, icon: "chart-pie" },
		{ id: "6", title: "Post Office", isLocked: false, showTitle: true, icon: "mail" },
		{ id: "7", title: "Administration", isLocked: false, showTitle: true, icon: "settings" },
		{ id: "8", title: "Help", isLocked: false, showTitle: true, icon: "book" },
		{ id: "9", title: "Warenbestand", isLocked: false, showTitle: true , icon: "cube"},
		{ id: "10", title: "Auswahllisten", isLocked: false, showTitle: true, icon: "list" },
		{ id: "11", title: "Einkauf", isLocked: false, showTitle: true, icon: "cart-check" },
		{ id: "12", title: "Rechn", isLocked: false, showTitle: true, icon: "browser" },
		{ id: "13", title: "Lagerverwaltung", isLocked: false, showTitle: true, icon: "box" },
		{ id: "14", title: "Dashboard", isLocked: false, showTitle: true, icon: "apps" },
		{ id: "15", title: "Banking", isLocked: false, showTitle: true, icon: "bank" },
		{ id: "16", title: "Telefonie", isLocked: false, showTitle: true, icon: "phone-call"  },
		{ id: "17", title: "Accounting", isLocked: false, showTitle: true, icon: "user-add" }
	],
	lockedTabs: [
		{ id: "0", title: "Dashboard", isLocked: true, showTitle: true, icon: "apps" },
		{ id: "1", title: "Banking", isLocked: true, showTitle: true, icon: "bank" },
	],
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
