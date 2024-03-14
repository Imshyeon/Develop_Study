const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production", // 웹팩에게 코드 최적화, 최소화 등을 지시.
  entry: "./12_Practice_Google/src/app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "12_Practice_Google/dist"),
  },
  devtool: "cheap-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    // 추가확장기능 : 전반적인 워크플로우에 적용
    new CleanPlugin.CleanWebpackPlugin(),
  ],
};
