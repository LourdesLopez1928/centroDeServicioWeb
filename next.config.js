const path = require('path')

module.exports = {
  env:{
    MONGODB_URI:process.env.MONGODB_URI,
    JWT_KEY:process.env.JWT_KEY,
    PROD:process.env.PROD,
    API_URL: process.env.API_URL
  },
  trailingSlash: true,
  reactStrictMode: false,
  // experimental: {
  //   esmExternals: false,
  //   jsconfigPaths: false // enables it for both jsconfig.json and tsconfig.json
  // },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
