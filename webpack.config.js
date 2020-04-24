const path = require("path");
const join = path.join;
const root = path.resolve(__dirname);
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const config = require("config");
const dotenv = require("dotenv");
const dotEnvVars = dotenv.config();
const NODE_ENV = process.env.NODE_ENV;
const API_URL = process.env.API_URL;
console.log("NODE_ENV->", NODE_ENV, ": API_URL->", API_URL);
const configPath = join(root, "config", `${NODE_ENV}.config.js`);
const environmentEnv = dotenv.config({
  path: configPath,
  silent: true
});
const envVariables = Object.assign({}, dotEnvVars, environmentEnv)["parsed"];
const defines = Object.keys(envVariables).reduce(
  (memo, key) => {
    const val = JSON.stringify(envVariables[key]);
    memo[`__${key.toUpperCase()}__`] = val;
    return memo;
  },
  {
    __NODE_ENV__: JSON.stringify(NODE_ENV),
    __API_URL__: JSON.stringify(API_URL)
  }
);

module.exports = {
  mode: NODE_ENV ? NODE_ENV : "development",

  entry: "./src/index.jsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "/"
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,

        vendor: {
          chunks: "all",
          name: "vendor",
          test: /node_modules/
        },

        common: {
          name: "common",
          minChunks: 2,
          chunks: "async",
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },

  resolve: {
    extensions: [".js", ".jsx", ".css", ".scss"]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin(defines)
  ],

  devServer: {
    historyApiFallback: true,
    open: config.get("open")
  },

  devtool:
    "production" === process.env.NODE_ENV
      ? "source-map"
      : "cheap-module-eval-source-map"
};
