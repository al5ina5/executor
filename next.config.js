/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
    dest: 'public'
})

const nextConfig = withPWA({
    compiler: {
        removeConsole: process.env.NODE_ENV === "production"
    },
    reactStrictMode: false,
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
})

module.exports = nextConfig
