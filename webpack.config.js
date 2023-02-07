const HtmlWebpackPlugin = require('html-webpack-plugin')
// import HtmlWebpackPlugin from 'html-webpack-plugin'//与上面一行等价
const path = require('path') // path模块主要是为了解决绝对路径问题的，就是他要找的这个文件必须得有一个绝对路径，但你自己写的绝对路径肯定就很麻烦，所以我们可以使用path下面的resolve()方法
const MiniClassExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')


module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(wasm)|(bin)|(obj)$/i,
        include: [path.resolve(__dirname, 'node_modules/deepar/')],
        type: 'asset/resource',
      },
    ],
  },
  plugins:[ // 装的是实例化对象
  new HtmlWebpackPlugin({
      minify: false,
      filename:'index.html',//打包后的filename是什么
      template:path.resolve(__dirname,'./public/index.html'),//打包的是谁
      chunks:['index'],
      // chunks:['jquery','index'],//入口文件是哪一个，可以写多个入口文件
      excludeChunks:['node_modules'] // 需要排除哪个文件
  }),
  new MiniClassExtractPlugin({
      filename: 'styles/[contenthash].css',// 打包的css放到styles文件夹下面（styles文件夹会自己创建）
  })
],
};