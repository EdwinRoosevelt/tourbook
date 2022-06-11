import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import addthis from "addthis-snippet"

const AWS = require("aws-sdk");
const uuid = require("uuidV4");

import TourPage from "../../components/tour/TourPage"
import { ChevronsDownLeft } from "tabler-icons-react";
import { useWindowScroll } from "@mantine/hooks";


function TourViewPage({ tourData, allUserData }) {

  const router = useRouter();

  // useEffect(() => {
  //   console.log("mounting")
  // }, [])

  //   useEffect(() => () => {
  //     // for (var member in window.addthis) delete window.addthis[member]
  //   }, []);

  // var config = {
  //   pubid: "ra-62a1b1c075a2468a"
  // }

  // var share = {
  //   passthrough : {
  //     twitter: {
  //       via: "TWITTER USERNAME"
  //     }
  //   }
  // };

  // if (typeof window !== "undefined") {
  //   addthis(config, share, function (a) {
  //   });
  //   console.log(window.addthis)
  // }

  

  return (
    <>
      <TourPage
        originalFormState={"VIEW"}
        originalData={tourData}
        allUserData={allUserData.Items}
      />

      {/* <Script
        type="text/javascript"
        src="//s7.addthis.com/js/300/addthis_widget.js#pubid="
        onLoad={handleAddThisLoaded}
      /> */}
    </>
  );
}

export async function getServerSideProps(context) {

  const tourId = context.params.tourId
  const tourDataResponse = await fetch(`http:localhost:3000/api/tour/${tourId}`)
  const tourData = await tourDataResponse.json();

  const allUserDataResponse = await fetch(`http:localhost:3000/api/user/all`);
  const allUserData = await allUserDataResponse.json();
  

  return { props: { tourData, allUserData } };
}

export default TourViewPage;
