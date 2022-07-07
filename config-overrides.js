const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const path = require('path')

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, 'src')
  }) ,
  addWebpackPlugin(
    () =>  [
      'babel-plugin-import',
      {
        libraryName: '@arco-design/web-react',
        libraryDirectory: 'es',
        camel2DashComponentName: false,
        style: 'css', // 样式按需加载
      },
    ]
  )
);