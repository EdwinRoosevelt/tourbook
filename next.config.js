/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "tour-with-eddy.s3.ap-south-1.amazonaws.com",
      "lh3.googleusercontent.com",
    ],
  },
  env: {
    DUMMY_KEY: "1234",
    AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_REGION: process.env.AWS_REGION,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    PEXELS_API_KEY: process.env.PEXELS_API_KEY,
  },
};

module.exports = nextConfig
