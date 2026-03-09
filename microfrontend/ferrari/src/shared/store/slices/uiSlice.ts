import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  isLoading: boolean;
  activeModal: string | null;
  theme: 'light' | 'dark';
}

const initialState: UiState = {
  isSidebarOpen: false,
  isModalOpen: false,
  isLoading: false,
  activeModal: null,
  theme: 'light'
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.isModalOpen = true;
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.activeModal = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    }
  }
});

export const { toggleSidebar, setSidebarOpen, openModal, closeModal, setLoading, setTheme, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
