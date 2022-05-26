import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useRouter } from "next/router";

import ProfileContent from '../components/profile/ProfileContent'

function profile() {
    const router = useRouter()
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect (() => {
      if (!isLoggedIn) router.replace('/');

  }, []);

  
  return (
    <div style={{ backgroundColor: "#EEEEEE" }}>
      <ProfileContent />
    </div>
  );
}

export default profile