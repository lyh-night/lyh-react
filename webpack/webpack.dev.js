const path = require('path')
const os = require('os');
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
var FriendlyErrorsWebpackPlugin = require('@nuxt/friendly-errors-webpack-plugin')


// 获取本地IP地址的函数
function getNetworkIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      // 跳过内部（回环）地址和非IPv4地址
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

// 合并公共配置,并添加开发环境配置
module.exports = merge(baseConfig, {
  stats: 'none',
  mode: 'development', // 开发模式,打包更加快速,省了代码优化步骤
  devtool: 'eval-cheap-module-source-map', // 源码调试模式
  devServer: {
    port: 3000, // 服务端口号
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新
    historyApiFallback: true, // 解决history路由404问题
    static: {
      directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
    },
    client: {
      // logging: 'none',
      overlay: {
        errors: true,
        warnings: false,
        // progress: true,
      },
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          'You application is running here:',
          `Local:            http://localhost:3000`,
          `On Your Network:  http://${getNetworkIp()}:3000`
        ],
        notes: [
          'Note that the development build is not optimized.',
          'To create a production build, use npm run build.'
        ]
      },
      clearConsole: true,
    })
  ]
})
