const withPWA = require('next-pwa');

const pwa = {
  dest: 'public',
  register: true,
  skipWaiting: true,
};

const cfg = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  // experimental: { appDir: true },
  swcMinify: true,
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/hitcounter',
          destination: '/api/hitcounter',
        },
      ],
    };
  },

  webpack: (config) => {
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[contenthash].[ext]',
            publicPath: '_next/static/worker',
            outputPath: 'static/worker',
          },
        },
      ],
    });

    return config;
  },
};

const nextConfig = withPWA(pwa)(cfg);

module.exports = nextConfig;
