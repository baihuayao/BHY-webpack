const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack =require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: './start.js',
    output: {
        filename: 'js/bundle.[chunkhash].js',
        path: path.resolve(__dirname,'dist'),
        // publicPath: 'dist/'
        // sourceMapFilename: '[name].map'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),   // 清理文件
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            minify: {     // 压缩html代码
                removeComments: true,   // 移除HTML中的注释
                collapseWhitespace: true    // 删除空白符与换行符
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有注释
            comments: false,
            compress: {
                // 在UglifyJs删除没有用到的代码时不输出警告
                warnings: false,
                // 删除所有的 'console'语句
                drop_console: true,
                //内嵌定义了但是只用到一次的变量
                collapse_vars: true,
                // 提取出出现多次但是没有定义成变量去引用的静态值
                reduce_vars: true,
            }
        }),
        new ExtractTextPlugin({
            filename: (getPath) =>{
                return getPath('css/index.[chunkhash].css').replace('css/js','css');
            },
            allChunks: true
        })
    ],
    module: {
        loaders: [
            // {
            //     test: /\.html$/,    // 打包HTML中的图片
            //     loader: 'html-withimg-loader'
            // },
            {
                test: /\.css$/,     //独立打包css文件
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                })
            },
            // {
            //    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            //    loader: 'file-loader?name=img/[hash:8].[name].[ext]'
            // },
            // {
            //     test: /\.(gif|png|jpe?g|svg)$/i,
            //     use: [
            //         'file-loader?name=img/[name].[ext]',
            //         {
            //         loader: 'image-webpack-loader',
            //         options: {
            //             mozjpeg: {
            //                 quality: 95
            //             },
            //             pngquant: {
            //                 quality: "65-90",
            //                 speed: 4
            //             },
            //             svgo: {
            //                 plugins: [{
            //                     removeViewBox: false
            //                 }, {
            //                     removeEmptyAttrs: false
            //                 }]
            //             },
            //             gifsicle: {
            //                 optimizationLevel: 7,
            //                 interlaced: false
            //             },
            //             optipng: {
            //                 optimizationLevel: 7,
            //                 interlaced: false
            //             }
            //         },
            //         },
            //     ],  
            // },
            {
                test: /\.(woff|woff2|otf|eot|svg|ttf)$/i,
                loader: 'file-loader?name=./font/[name].[ext]'
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname,'dist'),
        inline: true,
        port: 9000
    }
};
