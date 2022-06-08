import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AWS = require("aws-sdk");
const uuid = require("uuidV4");

import TourPage from "../../components/tour/TourPage"


function TourViewPage({ tourData, allUserData }) {

  return (
    <TourPage
      originalFormState={"VIEW"}
      originalData={tourData}
      allUserData={allUserData.Items}
    />
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
