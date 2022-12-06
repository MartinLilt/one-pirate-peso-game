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
    locales: ['uk', 'en'],
    defaultLocale: "en",
    localeDetection: false,
  },
  
};

module.exports = nextConfig;
