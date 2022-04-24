const path = require('path');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
module.exports = {
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components');
  // },
  // lintOnSave: false,

  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        components: '@/components'
      }
    },
    devServer: {
      proxy: {
        '^/api': {
          // target: 'http://152.136.185.210:4000',
          target: 'http://localhost:8888',
          pathRewrite: {
            '^/api': ''
          },
          changeOrigin: true
        }
      }
    }
  }
};
