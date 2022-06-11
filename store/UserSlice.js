import { createSlice } from '@reduxjs/toolkit';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';

import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase.config";

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

var accessToken;
var user;
var userData

if (typeof window !== "undefined") {
  // accessToken = localStorage.getItem('tourbook_access_token')
  user = localStorage.getItem("tourbook_user");
  // if (userId) {
  //   userData = await loadUser(res.user.email);
  // }
}

const INITIAL_STATE = {
  isLoggedIn: user ? true : false,
  currentUser: user
  // accessToken: accessToken,
  // userData: { userId }, // ...DUMMY_USER_DATA
};

const UserSlice = createSlice({
    name: "User State",
    initialState: INITIAL_STATE,
    reducers: {
        login(state, {payload}) {
          state.accessToken = payload.accessToken
          state.isLoggedIn = true
          state.currentUser = payload.tourbook_user
          localStorage.setItem("tourbook_user", payload.tourbook_user);
          
        },
        logout (state) {
          state.isLoggedIn = false;
          state.accessToken = "";
          localStorage.removeItem("tourbook_user");
        },
        loadUserData (state, {payload}) {
          state.userData = payload.userData
          localStorage.setItem("tourbook_userId", payload.userData.userId);
        },
        updateUserData(state, {payload}) {
          //
        }
    }

})

export default UserSlice

// export const { login, logout } = UserSlice.actions;

export const login = () => async (dispatch) => {
  try {
    const res = await signInWithPopup(auth, provider);
    console.log(res);
    const userData = await loadUser(res.user.email);
    dispatch(UserSlice.actions.login({ "tourbook_user": userData.userName }));
    // dispatch(UserSlice.actions.loadUserData({userData: {...userData}}))
    

  } catch (err) {
    console.log(err);
  }
}

const loadUser = async (userId) => {
  try {
    const response = await fetch(`/api/user/emailId/${userId}`);
    const responseData = await response.json();
    return responseData.Item;    

  } catch (err) {
    console.log(err);
  }
};

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