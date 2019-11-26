const path = require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const VueLoaderPlugin=require('vue-loader/lib/plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin');
const webpack=require('webpack');
const is_prod=process.env.NODE_ENV!='dev';
const css_config=[
    is_prod?MiniCssExtractPlugin.loader:'vue-style-loader',
    {
        loader:'css-loader',
    },
    {
        loader:'less-loader',
    }
];
module.exports={
    plugins:[
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename:is_prod?'css/[name].[hash:8].css':'css/[name].css',
            allChunks:true
        }),
        new HtmlWebpackPlugin({
            filename:'./index.html',
            template:'./src/template/index.ejs',
            inject:false
        })
    ],
    entry:{
        main: './src/main',
        vendors:'./src/vendors'
    },
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: is_prod?'js/[name].[hash].js':'js/[name].js',
        publicPath:is_prod?'./':'/'
    },
    module:{
        rules:[
            {
                test: /\.(le|c)ss$/,
                use:css_config
            },
            {
                test:/\.vue$/,
                use:[
                    {
                        loader:'vue-loader',
                        options:{
                            hotReload:true,
                            loaders:{
                                css:css_config,
                                less:css_config
                            }
                        }
                    },
                    {
                        loader:'iview-loader',
                        options:{
                            prefix:false
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=1024'
            }
        ]
    },
    resolve:{
        extensions:['.js','.vue'],
        alias:{
            'vue':'vue/dist/vue.esm.js'
        }
    }
    
}
if(is_prod){
    module.exports.plugins.push(
        new webpack.BannerPlugin('Created by EnderCaster | Site: https://wordpress.endercaster.com')
    );
    module.exports.plugins.push(
        new OptimizeCssAssetsWebpackPlugin()
    )
}