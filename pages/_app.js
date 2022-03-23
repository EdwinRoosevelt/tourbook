import { useState } from 'react';

import '../styles/globals.css'
import MainHeader from '../components/MainHeader'
import reactDom from 'react-dom';

const data = {
  user: {
    name: "Jane Spoonfighter",
    email: "janspoon@fighter.dev",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80",
  },
  tabs: ["Home", "Orders", "Education", "Community", "Forums", "Account"],
};

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  console.log(isLoggedIn)

  return (
    <>
      {isLoggedIn && <MainHeader user={data.user} tabs={data.tabs} />}
      {!isLoggedIn && <Component {...pageProps} />}
    </>
  );
  
}

export default MyApp
