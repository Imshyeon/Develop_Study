const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: 'assets/scripts/'
  },
  devtool: 'cheap-module-source-map',
  //     devServer: {
  //       contentBase: './'// 루트 html파일의 위치를 개발 서버에 알림.
  //   }
  plugins: [
    new CleanPlugin.CleanWebpackPlugin()
  ] // plugin은 웹팩 내의 개념인데, 다양한 최적화를 적용하도록 만들거나 생성될 출력에서 변화를 적용할 수 있도록 한다.
  // 즉, 개별 파일에서가 아니라 생성될 출력에서 적용되며 CleanPlugin의 경우 출력이 기록되기 전의 output 폴더가 된다.
}
