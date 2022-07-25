/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')();
const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/` : '/api/';

module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
          {
            source: '/api/',
            destination: url,
          },
        ]
      },
}
