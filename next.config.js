/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DUMMY_KEY: "1234",
    AWS_ACCESS_ID: process.env.AWS_ACCESS_ID,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_REGION: process.env.AWS_REGION,
  },
};

module.exports = nextConfig
