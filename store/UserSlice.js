import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isLoggedIn: false,
};

const UserSlice = createSlice({
  name: "User State",
  initialState: INITIAL_STATE,
  reducers: {
    login(state, { payload }) {
      state.isLoggedIn = true;
    },
  }
});

export default UserSlice

export const { login, logout } = UserSlice.actions;

export const asyncLoadUser = () => async (dispatch) => {
  
}

