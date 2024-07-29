import { InitialState } from "../redux/slices/tabs-slice";

export const reserveState: InitialState = {
  tabs: [
		{ id: "2", title: "Telefonie", isLocked: false, showTitle: true, icon: "phone-call" },
		{ id: "3", title: "Accounting", isLocked: false, showTitle: true, icon: "user-add" },
		{ id: "4", title: "Verkauf", isLocked: false, showTitle: true, icon: "shop" },
		{ id: "5", title: "Statistik", isLocked: false, showTitle: false, icon: "chart-pie" },
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