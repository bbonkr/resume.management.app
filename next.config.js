const { i18n } = require('./next-i18next.config');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    /* config options here */
    reactStrictMode: true,
    trailingSlash: false,
    i18n,
    images: {
        domains: ['www.gravatar.com'],
    },
    experimental: {
        images: {
            layoutRaw: true,
        },
    },
};

module.exports = nextConfig;
