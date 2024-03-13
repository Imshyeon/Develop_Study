const path = require("path");

module.exports = {
  // 전체 프로젝트가 시작되는 파일이 뭔지 -> 엔트리포인트
  // 엔트리 포인트로 가서 해당 파일의 임포트를 살펴본 뒤, 해당 파일로 이동
  // 웹팩이 제대로 기능하게 하려면 임포트의 확장자를 제거해야한다.
  mode: "development", // 개발을 위해 빌드 -> 웹팩이 최적화를 줄여서 개발 경험을 개선하고 디버깅을 수월하게 도우면서도 의미있는 오류 메시지를 전달.
  entry: "./10_Webpack/src/app.ts",
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  output: {
    filename: "bundle.js", // bundle.[contenthash].js
    path: path.resolve(__dirname, "10_Webpack/dist"), // dist 폴더에 절대 경로를 구축. 웹팩이 이걸 사용해서 출력을 저장.
    publicPath: "/dist/",
  },
  devtool: "inline-source-map", // 웹팩에게 추출해야하는 소스 맵이 생성될 것이라고 알려주고 웹팩이 제대로 번들을 구현하도록 구성하여 번들링이 완료될 때 탁월한 개발 경험을 제공
  module: {
    rules: [
      {
        test: /\.ts$/, // 웹팩이 파일을 찾을 때마다 규칙이 적용되는 파일인지 확인하는 작업을 수행 -> '.ts'로 끝나는 파일을 확인
        use: "ts-loader", // 웹팩에서 찾은 파일은 전부 다 타입스크립트 로더로 처리한다.
        exclude: /node_modules/, // 웹팩이 노드 모듈을 찾는 시도를 하지 않도록 함.
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  }, // 찾아낸 임포트에 어떤 파일 확장자를 추가할지 전달
};
