import { createSlice } from '@reduxjs/toolkit';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';

import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase.config";

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

var accessToken;

// if (typeof window !== undefined) {
//      accessToken = localStorage.getItem('tourbook_access_token')
// }

const INITIAL_STATE = {
  isLoggedIn: accessToken ? true : false,
  accessToken: accessToken,
  user: {},
};

const UserSlice = createSlice({
    name: "User State",
    initialState: INITIAL_STATE,
    reducers: {
        login(state, {payload}) {
            state.accessToken = payload.accessToken
            state.isLoggedIn = true
            localStorage.setItem('tourbook_access_token', payload.accessToken)
        },
        logout (state, {payload}) {
            state.isLoggedIn = false;
            state.accessToken = "";
            localStorage.removeItem("tourbook_access_token");
        }
    }

})

export default UserSlice

// export const { login, logout } = UserSlice.actions;

export const login = () => async (dispatch) => {
  try {
    const res = await signInWithPopup(auth, provider);
    console.log(res);
    console.log(auth);
    dispatch(UserSlice.actions.login({ accessToken: "qwerty12345" }));
  } catch (err) {
    console.log(err);
  }
}

export const logout = () => async (dispatch) => {
  try {
    const res = await signOut(auth);
    console.log(res);
    console.log(auth);
    dispatch(UserSlice.actions.logout());
  } catch (err) {
    console.log(err);
  }
};