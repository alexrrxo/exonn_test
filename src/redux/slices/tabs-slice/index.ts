import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type IconNameType } from "../../../components/IconComponent";

export interface TabI {
  id: string;
  isLocked: boolean;
  title: string;
  showTitle: boolean;
  icon: IconNameType;
}

export interface InitialState {
  tabs: TabI[];
  lockedTabs: TabI[];
  visibleTabsIds: Array<string | undefined>;
  selectedTab: TabI;
}

const initialState: InitialState = {
  tabs: [],
  lockedTabs: [],
  visibleTabsIds: [],
  selectedTab: {
    id: '',
    isLocked: false,
    showTitle: false,
    title: '',
    icon: 'apps'
  }
}

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setTabs: (state, action: PayloadAction<TabI[]>) => {
      state.tabs = action.payload
    },
    setLockedTabs: (state, action: PayloadAction<TabI[]>) => {
      state.lockedTabs = action.payload
    },
    selectTab: (state, action: PayloadAction<TabI>) => {
      state.selectedTab = action.payload
    },
    lockTab: (state, action: PayloadAction<TabI>) => {
      const lockedTab = state.tabs.find((tab) => tab.id === action.payload.id)
      const filtredTabs = state.tabs.filter((tab) => tab.id !== action.payload.id)

      if (lockedTab) {
        lockedTab.isLocked = true
        state.lockedTabs.push(lockedTab)
      }
      state.tabs = filtredTabs
    },
    unlockTab: (state, action: PayloadAction<TabI>) => {
      const unlockedTab = state.lockedTabs.find((tab) => tab.id === action.payload.id)
      const filtredLockedTabs = state.lockedTabs.filter((tab) => tab.id !== action.payload.id)

      if (unlockedTab) {
        unlockedTab.isLocked = false
        state.tabs.unshift(unlockedTab)
      }
      state.lockedTabs = filtredLockedTabs
    },
    setVisibleTabIds: (state, action: PayloadAction<Array<string | undefined>>) => {
      state.visibleTabsIds = action.payload
    }
  }
})

export const { setTabs, setLockedTabs, setVisibleTabIds, selectTab, lockTab, unlockTab } = tabsSlice.actions

export default tabsSlice.reducer
