import React from 'react'
import { MainHeader } from '../components/MainHeader'


const data = {
  links: [
    {
      link: "/about",
      label: "Features",
    },
    {
      link: "/pricing",
      label: "Pricing",
    },
    {
      link: "/learn",
      label: "Learn",
    },
    {
      link: "/community",
      label: "Community",
    },
  ],
};

function feed() {
  return (
    <MainHeader links={data.links}/>
  )
}

export default feed