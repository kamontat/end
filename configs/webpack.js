const {
  resolve
} = require("path");

module.exports = (root) => {
  return {
    mode: "development",
    target: 'node',
    entry: {
      core: resolve(root, "src", "index.ts")
    },
    devtool: "source-map",
    output: {
      path: resolve(root, "lib"),
      filename: "[name].js",
      library: ["[name]"],
      libraryTarget: "umd"
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      }, ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", "json"],
    },
  }
}