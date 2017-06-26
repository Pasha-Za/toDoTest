var path = require('path')
var webpack = require('webpack')
// var NpmInstallPlugin = require('npm-install-webpack-plugin')
var autoprefixer = require('autoprefixer');
var precss = require('precss');
// const cssnano = require('cssnano');
const postcssNested = require('postcss-nested');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // 'webpack-hot-middleware/client',
    // 'babel-polyfill',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
    // publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
			name : "main",
			// собирать в один файл если модуль используется хотя бы в 2 файлах
			minChunks: 2,
		}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new NpmInstallPlugin(),
    new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false,
		    }
		}),
  ],
  module: {
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     loaders: ['eslint'],
    //     include: [
    //       path.resolve(__dirname, "src"),
    //     ],
    //   }
    // ],
    rules: [
      {
        // loaders: ['react-hot', 'babel-loader'],
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        use: [
          {
            loader: 'react-hot-loader'
          },
          {
            loader: 'babel-loader',
            query: {
                plugins: ['transform-runtime']
            }
          }
        ],
        // plugins: ['transform-runtime'],
      },
      {
       test: /\.(sass|scss)$/,
       use: [
         {
           loader: "style-loader"
         },
         {
           loader: "css-loader"
         },
         {
           loader: "resolve-url-loader"
         },
         {
           loader: "postcss-loader"
         },
         {
           loader: "sass-loader"
         }
       ],
      //  loader: "style-loader!css-loader!resolve-url-loader!postcss-loader!sass-loader"
     },
      {
        test:   /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "resolve-url-loader"
          },
        {
          loader: 'postcss-loader',
          options: {
            postcss: function () {
              return [
                autoprefixer(),
                postcssNested(),
                precss(),
                cssnano({
                  discardComments : {
                    removeAll : true
                  },
                  discardUnused : false,
                  mergeIdents   : false,
                  reduceIdents  : false,
                  safe          : true,
                  sourcemap     : true
                }),
              ];
            },
          }
        }]
      },
      { test: /\.woff(\?.*)?$/,   loader: 'url-loader?mimetype=application/font-woff&outputPath=fonts/&publicPath=../fonts/&name=[name].[ext]' },
     { test: /\.woff2(\?.*)?$/,  loader: 'url-loader?mimetype=application/font-woff2&outputPath=fonts/&publicPath=../fonts/&name=[name].[ext]' },
     { test: /\.otf(\?.*)?$/,    loader: 'url-loader?mimetype=font/opentype&outputPath=fonts/&publicPath=../fonts/&name=[name].[ext]' },
     { test: /\.ttf(\?.*)?$/,    loader: 'url-loader?mimetype=application/octet-stream&outputPath=fonts/&publicPath=../fonts/&name=[name].[ext]' },
     { test: /\.eot(\?.*)?$/,    loader: 'file-loader?outputPath=fonts/&publicPath=../fonts/&name=[name].[ext]&limit=10000' },
     { test: /\.svg(\?.*)?$/,    loader: 'url-loader?mimetype=image/svg+xml&outputPath=fonts/&publicPath=../fonts/&name=[name].[ext]' },

      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        // loader: 'file-loader?outputPath=img/&publicPath=img/&name=[name].[ext]',
        loader: 'file-loader?outputPath=img/&publicPath=&name=[name].[ext]',
      }
    ]
  },
}
