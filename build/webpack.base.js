// const webpack = require('webpack')
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const HappyPack = require('happypack')
// const path = require('path')
// const { resolve } = require('path');
// const os = require('os')
// const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
// module.exports = {
//   entry: './src/index.js',
//   module: {
//     rules: [
//       {
//         test: /\.vue$/,
//         loader: 'vue-loader'
//       },
//       {
//         test: /\.(sa|sc|c)ss$/,
//         use: [
//           'style-loader',
//           'css-loader',
//           'postcss-loader',
//           'sass-loader'
//         ]
//       },
//       {
//         test: /\.less$/,
//         use: [
//           'style-loader',
//           'css-loader',
//           'postcss-loader',
//           'less-loader'
//         ]
//       }, {
//         test: /\.(png|jpg|gif)$/,
//         use : [
//           {
//             loader: 'file-loader',
//             options: {
//               limit: 5000,
//               name: "imgs/[name].[ext]"
//             }
//           }
//         ]
//       },
//       {
//         test: /\.js$/,
//         //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
//         loader: 'happypack/loader?id=happyBabel',
//         //排除node_modules 目录下的文件
//         exclude: /node_modules/,
//     },
//     ]
//   },
//   plugins: [
//     new webpack.HashedModuleIdsPlugin(),
//     new VueLoaderPlugin(),
//     new HtmlWebpackPlugin({
//       template: path.resolve(__dirname, '../index.html')
//     }),
//     new HappyPack({
//       //用id来标识 happypack处理类文件
//       id: "happyBabel",
//       //如何处理 用法和loader 的配置一样
//       loaders: [
//         {
//           loader: "babel-loader?cacheDirectory=true"
//         }
//       ],
//       //共享进程池
//       threadPool: happyThreadPool,
//       //允许 HappyPack 输出日志
//       verbose: true
//     }),
//   ],
//   resolve: {
//     extensions: ['.js', '.vue'],
//     alias: {
//         vue: 'vue/dist/vue.esm.js',
//         '@': resolve('src'),
//     },
// },
// }

const webpack = require('webpack');
const path = require('path');
// vue-loader 插件
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
// 使用happypack
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                //把对.js 的文件处理交给id为happyBabel 的HappyPack 的实例执行
                loader: 'happypack/loader?id=happyBabel',
                // loader: 'babel-loader',
                //排除node_modules 目录下的文件
                // exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
            },
        ],
    },
    stats: { children: false },
    plugins: [
        // 请确保引入这个插件来施展魔法
        new VueLoaderPlugin(),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, '../index.html'),
        // }),
        new HtmlWebpackPlugin({
          template: './index.html'  // 模板
       }),
        new HappyPack({
            //用id来标识 happypack处理类文件
            id: 'happyBabel',
            //如何处理 用法和loader 的配置一样
            loaders: [
                {
                    loader: 'babel-loader?cacheDirectory=true',
                },
            ],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        // 解决vender后面的hash每次都改变
        new webpack.HashedModuleIdsPlugin(),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../static'),
        //         to: 'static',
        //         ignore: ['.*'],
        //     },
        // ]),
    ],
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            vue: 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        },
    },
};