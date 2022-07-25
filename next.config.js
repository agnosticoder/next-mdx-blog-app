/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')();
const url = process.env.VERCEL_URL ? `${process.env.VERCEL_URL}/api/:path*` : '/api/:path*';

module.exports = withMDX({
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
    reactStrictMode: true,
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: url,
          },
        ]
      },
});
