const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: 'assets/scripts/'
  },
  devtool: 'cheap-source-map',
  //     devServer: {
  //       contentBase: './'// 루트 html파일의 위치를 개발 서버에 알림.
  //   }
  plugins: [new CleanPlugin.CleanWebpackPlugin()]
}
