const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")
const webpack = require('webpack');
const is_prod = process.env.NODE_ENV == 'production';
const css_config = [
    is_prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
    {
        loader: 'css-loader',
    },
    {
        loader: 'less-loader',
    }
];
module.exports = {
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/template/index.ejs',
            // favicon:'./favicon.ico',
            inject: false
        })
    ],
    entry: {
        main: './src/main',
        vendors: './src/vendors'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: is_prod ? 'js/[name].[hash].js' : 'js/[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: css_config
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            hotReload: true,
                            loaders: {
                                css: css_config,
                                less: css_config
                            }
                        }
                    },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(woff|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    path: path.resolve(__dirname, 'dist'),
                    name: is_prod ? 'fonts/[name].[hash].[ext]' : 'fonts/[name].[ext]',
                    limit: 512,
                }
            },
            {
                test: /\.(gif|jpg|png|svg)\??.*$/,
                loader: 'url-loader',
                options: {
                    path: path.resolve(__dirname, 'dist'),
                    name: is_prod ? 'img/[name].[hash].[ext]' : 'img/[name].[ext]',
                    limit: 512,
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    },
}
if (is_prod) {
    module.exports.plugins.push(
        new webpack.BannerPlugin('Created by EnderCaster | Site: https://wordpress.endercaster.com')
    );
    module.exports.plugins.push(
        new OptimizeCssAssetsWebpackPlugin()
    );
    module.exports.plugins.push(
        new CompressionPlugin({
            test: /\.((le|c)ss|js)$/,
        })
    )
}
