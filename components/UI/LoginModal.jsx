import React from 'react'
import { useGoogleLogin } from 'react-google-login';
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
// import firebase from 'firebase';



import googleIcon from '../../public/google.png';


import { login, logout } from "../../store/UserSlice";


function LoginModal() {
  const dispatch = useDispatch();
  const router = useRouter();

  function signIn () {
    dispatch(login());
    router.push('/')
  }

  function signOut() {
    dispatch(logout());
  }

//   const onSuccess = (res) => {
//     console.log(res.profileObj);
//   }

//   const onFailure = (res) => {
//     console.log(res);
//   }

//   const { signIn } = useGoogleLogin({
//     onSuccess,
//     onFailure,
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     isSignedIn: true,
//     accessType: 'offline'
//   });



 
  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Login / Signup
            </h5>
          </div>
          <div className="modal-body flex justify-content-center">
            Email and password
          </div>
          <div className="modal-footer flex justify-content-center">
            {/* <button
              className="btn btn-outline-primary flex align-items-center gap-2"
              type="button"
              onClick={signIn}
            >
              <Image src={googleIcon} height="20rem" width="20rem"></Image>
              <p>Sign in with Google</p>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal