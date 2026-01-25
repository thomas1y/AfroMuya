import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: {
    global: false,
    auth: false,
    jobs: false,
    profile: false,
  },
  notifications: [],
  modals: {
    login: false,
    register: false,
    apply: false,
    resumeUpload: false,
    deleteAccount: false,
  },
  sidebar: {
    dashboard: true, // Dashboard sidebar open by default on desktop
    mobileMenu: false,
  },
  toast: {
    show: false,
    message: '',
    type: 'info', // 'success', 'error', 'info', 'warning'
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Loading states
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.loading.auth = action.payload;
    },
    setJobsLoading: (state, action) => {
      state.loading.jobs = action.payload;
    },
    setProfileLoading: (state, action) => {
      state.loading.profile = action.payload;
    },

    // Notifications
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        read: false,
        ...action.payload,
      });
      // Keep only latest 10 notifications
      if (state.notifications.length > 10) {
        state.notifications.pop();
      }
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.read = true;
      }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },

    // Modals
    openModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals.hasOwnProperty(modalName)) {
        state.modals[modalName] = true;
      }
    },
    closeModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals.hasOwnProperty(modalName)) {
        state.modals[modalName] = false;
      }
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key] = false;
      });
    },

    // Sidebar
    toggleDashboardSidebar: (state) => {
      state.sidebar.dashboard = !state.sidebar.dashboard;
    },
    setDashboardSidebar: (state, action) => {
      state.sidebar.dashboard = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.sidebar.mobileMenu = !state.sidebar.mobileMenu;
    },
    setMobileMenu: (state, action) => {
      state.sidebar.mobileMenu = action.payload;
    },

    // Toast notifications
    showToast: (state, action) => {
      state.toast = {
        show: true,
        message: action.payload.message || 'Operation successful',
        type: action.payload.type || 'success',
      };
    },
    hideToast: (state) => {
      state.toast.show = false;
    },

    // Reset UI state
    resetUI: () => initialState,
  },
});

export const {
  // Loading
  setGlobalLoading,
  setAuthLoading,
  setJobsLoading,
  setProfileLoading,

  // Notifications
  addNotification,
  markNotificationAsRead,
  removeNotification,
  clearAllNotifications,

  // Modals
  openModal,
  closeModal,
  closeAllModals,

  // Sidebar
  toggleDashboardSidebar,
  setDashboardSidebar,
  toggleMobileMenu,
  setMobileMenu,

  // Toast
  showToast,
  hideToast,

  // Reset
  resetUI,
} = uiSlice.actions;

// Selectors
export const selectGlobalLoading = (state) => state.ui.loading.global;
export const selectAuthLoading = (state) => state.ui.loading.auth;
export const selectJobsLoading = (state) => state.ui.loading.jobs;
export const selectProfileLoading = (state) => state.ui.loading.profile;

export const selectNotifications = (state) => state.ui.notifications;
export const selectUnreadNotifications = (state) =>
  state.ui.notifications.filter((n) => !n.read).length;

export const selectModalState = (modalName) => (state) =>
  state.ui.modals[modalName] || false;

export const selectDashboardSidebar = (state) => state.ui.sidebar.dashboard;
export const selectMobileMenu = (state) => state.ui.sidebar.mobileMenu;

export const selectToast = (state) => state.ui.toast;

// Custom action creators for common toast types
export const showSuccessToast = (message) =>
  showToast({ message, type: 'success' });
export const showErrorToast = (message) =>
  showToast({ message, type: 'error' });
export const showInfoToast = (message) => showToast({ message, type: 'info' });
export const showWarningToast = (message) =>
  showToast({ message, type: 'warning' });

export default uiSlice.reducer;