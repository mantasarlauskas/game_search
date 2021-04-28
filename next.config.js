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
            test: /\.svg$/,
            issuer: {
                test: /\.(js|ts)x?$/,
            },
            use: ['@svgr/webpack'],
        });

        return config;
    },
};
