const path = require('path');
const webpack = require('webpack');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? '/proCockpit/' : '/',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/mixin.scss";',
      },
    },
  },
  configureWebpack: {
    module: {
      unknownContextCritical: false,
      rules: [{ test: /\.vert|frag|glsl$/, loader: 'raw-loader' }],
    },
    plugins: [
      new webpack.ProvidePlugin({
        gs: [path.resolve('./src/global.js'), 'gs'],
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  devServer: {
    open: true, // 使用npm run serve 之后是否自动在游览器中打开项目
    port: 5077, // 端口号
    proxy: {
      '/apiProxy': {
        // target: 'http://192.168.8.188:8088/',
        target: 'http://172.16.24.1/',
        changeOrigin: true,
        pathRewrite: { '^/apiProxy': '' },
      },
      '/socket': {
        // 设置websocket代理
        target: 'ws://172.16.24.1:8088/',
        // target: 'ws://192.168.8.188:8088/',
        ws: true, // 开启websocket代理  注意
        changeOrigin: true,
        pathRewrite: {
          '^/socket': '',
        },
      },
      '/apiVoice': {
        // 设置websocket代理
        // target: 'http://10.21.235.147:20001/',
        target: 'http://172.16.24.1:20001/', // 公司测试环境
        changeOrigin: true,
        pathRewrite: {
          '^/apiVoice': '',
        },
      },
    },
  },
};
