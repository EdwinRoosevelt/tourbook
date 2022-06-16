/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "tour-with-eddy.s3.ap-south-1.amazonaws.com",
      "lh3.googleusercontent.com",
    ],
    // loader: "imgix",
    // path: "/",
  },
  env: {
    TOURBOOK_AWS_ACCESS_ID: process.env.TOURBOOK_AWS_ACCESS_ID,
    TOURBOOK_AWS_SECRET_KEY: process.env.TOURBOOK_AWS_SECRET_KEY,
    TOURBOOK_AWS_REGION: process.env.TOURBOOK_AWS_REGION,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    PEXELS_API_KEY: process.env.PEXELS_API_KEY,
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig
