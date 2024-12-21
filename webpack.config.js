const path = require("path");

module.exports = {
  entry: "./src/makeAnythingSnow.js",
  output: {
    filename: "makeAnythingSnow.js",
    path: path.resolve(__dirname, "dist"),
    library: "SnowEffect",
    libraryTarget: "umd",
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
