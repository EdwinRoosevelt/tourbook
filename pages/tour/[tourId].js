import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const AWS = require("aws-sdk");
const uuid = require("uuidV4");

import TourPage from "../../components/tour/TourPage"


function TourViewPage ({ responseData }) {

  return <TourPage originalFormState={"VIEW"} originalData={responseData} />;
}

export async function getServerSideProps(context) {

  const tourId = context.params.tourId
  const response = await fetch(`http:localhost:3000/api/tour/${tourId}`)
  const responseData = await response.json()

  return { props: { responseData } };

}

export default TourViewPage;
