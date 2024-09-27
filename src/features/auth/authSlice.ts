import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('authToken'),
  isLoggedIn: !!localStorage.getItem('authToken'),  // User is logged in if a token exists
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('authToken', action.payload);  // Store token in localStorage
    },
    logout: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('authToken');  // Clear token from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;