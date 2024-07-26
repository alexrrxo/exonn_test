import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Tab {
  id: string;
	isLocked: boolean;
	title: string;
	showTitle: boolean;
}

interface InitialState {
	tabs: Tab[]
	selectedTab: Tab
}

const initialState: InitialState = {
  tabs: [
		{ id: "0", title: "Dashboard", isLocked: false, showTitle: true },
		{ id: "1", title: "Banking", isLocked: false, showTitle: true },
		{ id: "2", title: "Telefonie", isLocked: false, showTitle: true },
		{ id: "3", title: "Accounting", isLocked: false, showTitle: true },
		{ id: "4", title: "Verkauf", isLocked: false, showTitle: true },
		{ id: "5", title: "Statistik", isLocked: false, showTitle: true },
		{ id: "6", title: "Post Office", isLocked: false, showTitle: true },
		{ id: "7", title: "Administration", isLocked: false, showTitle: true },
		{ id: "8", title: "Help", isLocked: true, showTitle: true },
		{ id: "9", title: "Warenbestand", isLocked: false, showTitle: true },
		{ id: "10", title: "Auswahllisten", isLocked: false, showTitle: true },
		{ id: "11", title: "Einkauf", isLocked: false, showTitle: true },
		{ id: "12", title: "Rechn", isLocked: false, showTitle: true },
		{ id: "13", title: "Lagerverwaltung", isLocked: false, showTitle: true },
		{ id: "14", title: "Dashboard", isLocked: false, showTitle: true },
		{ id: "15", title: "Banking", isLocked: false, showTitle: true },
		{ id: "16", title: "Telefonie", isLocked: false, showTitle: true },
		{ id: "17", title: "Accounting", isLocked: false, showTitle: true }
	],
	selectedTab: {
		id:"",
		isLocked: false,
		showTitle: false,
		title: ""
	}
};

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setTabs: (state, action: PayloadAction<Tab[]>) => {
      state.tabs = action.payload;
    },
    selectTab: (state, action: PayloadAction<Tab>) => {
      state.selectedTab = action.payload;
    },
    lockTab: (state, action: PayloadAction<Tab>) => {
      state.tabs.forEach((tab) => tab.id === action?.payload?.id && (tab.isLocked = true));
    },
		unlockTab: (state, action: PayloadAction<Tab>) => {
      state.tabs.forEach((tab) => tab.id === action?.payload?.id && (tab.isLocked = false));
    },
  },
});

export const { setTabs, selectTab, lockTab, unlockTab } = tabsSlice.actions;

export default tabsSlice.reducer;
