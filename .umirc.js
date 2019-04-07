import { resolve } from 'path'

// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          immer: true,
        },
        dynamicImport: false,
        title: 'umi-dva-app',
        dll: {
          include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
        },
        routes: {
          exclude: [/model\.(j|t)sx?$/, /models\//, /components\//],
        },
      },
    ],
  ],
  alias: {
    src: resolve(__dirname, './src'),
    api: resolve(__dirname, './src/api'),
    access: resolve(__dirname, './src/access'),
    components: resolve(__dirname, './src/components'),
    models: resolve(__dirname, './src/models'),
    utils: resolve(__dirname, './src/utils'),
  },
}
