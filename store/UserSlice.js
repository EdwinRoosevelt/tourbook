import { createSlice } from '@reduxjs/toolkit';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';

import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase.config";

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
const auth = getAuth();

var accessToken;
var userId;
var userData

if (typeof window !== "undefined") {
  accessToken = localStorage.getItem('tourbook_access_token')
  userId = localStorage.getItem('tourbook_userId')
  // if (userId) {
  //   userData = await loadUser(res.user.email);
  // }
}

// const DUMMY_USER_DATA = {
//   userId: "b.edwinroosevelt@gmail.com",
//   displayName: "Edwin Roosevelt",
//   friendsList: ["banupriya@gmail.com", "anandhan@gmail.com"],
//   notifications: [
//     {
//       id: "AD46",
//       title: "Friend Request",
//       description: "Banu Priya wants to be friends with you!",
//     },
//     {
//       id: "AD45",
//       title: "Tour Invite",
//       description: "Banu invited you to join - Paris 2022",
//     },
//   ],
// };

const INITIAL_STATE = {
  isLoggedIn: accessToken ? true : false,
  accessToken: accessToken,
  userData: {userId}, // ...DUMMY_USER_DATA
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
        logout (state) {
          state.isLoggedIn = false;
          state.accessToken = "";
          localStorage.removeItem("tourbook_access_token");
          localStorage.removeItem("tourbook_userId")
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
    dispatch(UserSlice.actions.login({ accessToken: "qwerty12345" }));
    dispatch(UserSlice.actions.loadUserData({userData: {...userData}}))
    

  } catch (err) {
    console.log(err);
  }
}

const loadUser = async (userId) => {
  try {
    const response = await fetch(`/api/user/${userId}`);
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