import { createSlice } from '@reduxjs/toolkit';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';

import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase.config";

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

var user;
var isNewUser = false;
if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("tourbook_user"));
  isNewUser = localStorage.getItem("tourbook_isNewUser");
}

const INITIAL_STATE = {
  isLoggedIn: user ? true : false,
  currentUser: user ? user.userName: "",
  isNewUser,
  user
  // accessToken: accessToken,
  // userData: { userId }, // ...DUMMY_USER_DATA
};

const UserSlice = createSlice({
  name: "User State",
  initialState: INITIAL_STATE,
  reducers: {
    login(state, { payload }) {
      state.user = payload;
      state.isLoggedIn = true;
      state.isNewUser = false
      state.currentUser = payload.userName;
      localStorage.setItem("tourbook_user", JSON.stringify(payload));
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("tourbook_user");
      localStorage.removeItem("tourbook_isNewUser");
    },
    newUser(state, { payload }) {
      state.isNewUser = true;
      localStorage.setItem("tourbook_isNewUser", true);
    },
  },
});

export default UserSlice

export const { login, logout } = UserSlice.actions;

export const asyncLoadUser = () => async (dispatch) => {
  try {
    const authenticatedUser = await signInWithPopup(auth, provider);

    const response = await loadUser({
      key: "emailId",
      emailId: authenticatedUser.user.email,
    });

    if (response.success) {
      dispatch(UserSlice.actions.login(response.Item));
      console.log("Existing User logged In")

    } else {
      const user = {
        userName: authenticatedUser.user.email.split("@")[0],
        emailId: authenticatedUser.user.email,
        displayName: authenticatedUser.user.displayName,
        photoURL: authenticatedUser.user.photoURL,
      };
      dispatch(UserSlice.actions.login(user));
      dispatch(UserSlice.actions.newUser());
      console.log("New User logged In");
    }

  } catch (err) {
    console.log(err.message);
  }
}

const loadUser = async (prop) => {
  try {
    var response;
    if (prop.key === "emailId") response = await fetch(`/api/user/emailId/${prop.emailId}`);
    if (prop.key === "userName") response = await fetch(`/api/user/${prop.userName}`)
    const responseData = await response.json();
    return responseData

  } catch (err) {
    console.log(err.message);
  }
};

export const asynclogout = () => async (dispatch) => {
  try {
    const res = await signOut(auth);
    dispatch(UserSlice.actions.logout());
  } catch (err) {
    console.log(err.message);
  }
};