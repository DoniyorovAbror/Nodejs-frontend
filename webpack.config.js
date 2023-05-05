const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        clean: true
    },
    stats: {
      children: false,
    },
    plugins: [
        new ESLintPlugin({
          extensions: "ts",
        }),
		    new HtmlWebpackPlugin({
            template: './src/index.pug',
            scriptLoading: "blocking"
        }),
        new MiniCssExtractPlugin(),
        new TerserWebpackPlugin(),
        new CssMinimizerWebpackPlugin(),
        new StylelintPlugin({
          extensions: ['css', 'scss', 'sass'],
          files: path.join(__dirname, "dist", "main.css"),
          fix: true,
        })
	],
	module: {
		rules: [
				{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
				  pretty: true
				}
			},
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: true,
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node-modules/,
      }
		]
	}
  };