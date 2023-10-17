const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const config = {
  entry: './src/quill-emoji.js',
  output: {
    filename: 'quill-emoji.js',
    path: path.resolve(__dirname, 'dist'),
    library: "QuillEmoji",
    libraryTarget: "umd"
  },
  target: "web",
  mode: "production",
  externals: {
    quill: {
      commonjs: 'quill',
      commonjs2: 'quill',
      amd: 'quill',
      root: 'Quill'
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
		  use: [
			  MiniCssExtractPlugin.loader,
			  'css-loader',
			  'resolve-url-loader',
			  {
				  loader: "sass-loader",
				  options: {
					  sourceMap: true,
					  sassOptions: {
						  includePaths: [nodeModulesPath],
						  outputStyle: 'expanded',
					  },
				  },
			  },
		  ],
      },
      {
        test: /\.(jpg|png|gif)$/i,
        include: /src/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ],
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src/")
        ],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { modules: false }]]
          }
        }
      }
    ]
  },
  optimization: {
	  minimize: false,
  },
  plugins: [new MiniCssExtractPlugin({
	  filename: 'quill-emoji.css',
	  chunkFilename: '[id].css',
  })],
};

module.exports = config;
