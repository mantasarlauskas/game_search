module.exports = {
    reactStrictMode: true,
    env: {
        HOST: process.env.HOST,
    },
    images: {
        domains: ['media.rawg.io'],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};
