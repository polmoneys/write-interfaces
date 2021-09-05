const withPlugins = require('next-compose-plugins');
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
});
const nextConfig = {
    i18n: {
        locales: ['es', 'en'],
        defaultLocale: 'en',
    },
    pageExtensions: ['js', 'ts', 'tsx', 'md', 'mdx'],
    env: {
        enableApiMocking: process.env.NODE_ENV === 'development',
    },
    images: {
        domains: ['cloudinary.com', 'pbs.twimg.com'],
    },
};

module.exports = withPlugins([withMDX], nextConfig);
