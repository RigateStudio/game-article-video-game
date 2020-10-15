const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  console.log("NODE_ENV", env.NODE_ENV);
  return {
    entry: [
      './src/index.js'
    ],
    output: {
      path: __dirname,
      publicPath: '/',
      filename: 'bundle.js'
    },
    watch: true,
    watchOptions: {
      aggregateTimeout: 600,
      poll: 1000,      
      ignored: /node_modules/
    },
    entry: './js/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    mode: 'development',
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {    
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
            {
              loader: "postcss-loader",
            },
            {
              loader: "sass-loader",
              options: {
                implementation: require("sass"),
              },
            },
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: 'images'
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|ttf|otf|eot)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: 'fonts'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "bundle.css"
      }),
      new Dotenv(),
    ]
  }
};