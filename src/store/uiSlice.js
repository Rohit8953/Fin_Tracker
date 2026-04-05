import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    role: localStorage.getItem("finance_role") || "admin",
    darkMode: localStorage.getItem("finance_dark") === "true",
    activeTab: "",
    sidebarOpen: true,
    modalOpen: false,
    editingTransaction: null,
    snackbar: { open: false, message: "", severity: "success" },
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("finance_role", action.payload);
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("finance_dark", state.darkMode);
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openModal: (state, action) => {
      state.modalOpen = true;
      state.editingTransaction = action.payload || null;
    },
    closeModal: (state) => {
      state.modalOpen = false;
      state.editingTransaction = null;
    },
    showSnackbar: (state, action) => {
      state.snackbar = { open: true, ...action.payload };
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
});

export const {
  setRole,
  toggleDarkMode,
  setActiveTab,
  toggleSidebar,
  openModal,
  closeModal,
  showSnackbar,
  hideSnackbar,
} = uiSlice.actions;

export default uiSlice.reducer;