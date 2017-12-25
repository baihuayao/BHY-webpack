const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack =require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: './start.js',
    output: {
        filename: 'js/[chunkhash].js',
        path: path.resolve(__dirname,'dist'),
        publicPath: 'dist/',
        sourceMapFilename: '[name].map'
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),       // 清理文件
        new HtmlWebpackPlugin({                 // 模板文件
            template: "./src/index.html",
            filename: "index.html",
            minify: {                           // 压缩html代码
                removeComments: true,           // 移除HTML中的注释
                collapseWhitespace: true        // 删除空白符与换行符
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,                    // 最紧凑的输出
            comments: false,                    // 删除所有注释
            compress: {
                warnings: false,                // 在UglifyJs删除没有用到的代码时不输出警告
                drop_console: true,             // 删除所有的 'console'语句
                collapse_vars: true,            // 内嵌定义了但是只用到一次的变量
                reduce_vars: true,              // 提取出出现多次但是没有定义成变量去引用的静态值
            }
        }),
        new ExtractTextPlugin({                 // 独立打包css文件
            filename: (getPath) =>{
                return getPath('css/[chunkhash].css').replace('css/js','css');
            },
            allChunks: true
        }),
        new CopyWebpackPlugin([                 // 拷贝资源文件
            // { from: __dirname+'/src/audio/', to: 'audio/', toType:'dir'},
            // { from: __dirname+'/Readme.md',to: 'Readme.md'}
        ]),
    ],
    module: {
        loaders: [
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader?limit=8192&name=img/[hash:8].[name].[ext]'
            },
            {
        　　　　　test: /\.html$/,
        　　　　　loader: 'html-withimg-loader'
    　　　　 },
            {
                test: /\.css$/,                 // 独立打包css文件
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                minimize: true, // 启用压缩
                            }
                        }
                    ]
                })
            },
            {                                   // 独立打包字体文件
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
