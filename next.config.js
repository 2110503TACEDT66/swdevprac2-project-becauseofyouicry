/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        FRONTEND_URL : process.env.FRONTEND_URL,
        BACKEND_URL : process.env.BACKEND_URL
    }
}

module.exports = nextConfig
