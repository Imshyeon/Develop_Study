const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: 'assets/scripts/'
  },
  devtool: 'cheap-module-source-map'
  //     devServer: {
  //       contentBase: './'// 루트 html파일의 위치를 개발 서버에 알림.
  //   }
}
