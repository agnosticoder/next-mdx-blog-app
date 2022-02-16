/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')();

module.exports = withMDX({
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx'],
    reactStrictMode: true,
});
