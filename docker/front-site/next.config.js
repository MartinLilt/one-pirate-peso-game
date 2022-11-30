/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos"],
  },
  experimental: {
    appDir: true,
  },

  i18n: {
    locales: ['en', 'uk'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;

