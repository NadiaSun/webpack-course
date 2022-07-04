const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        }
    }

    if (isProd) {
        config.minimizer = [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }

    return config
}

const jsLoaders = () => {
    const loader = [{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }]
    if (isDev) {
        loader.push('eslint-loader')
    }
    return loader
}

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'docs'),
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'docs'),
            '@core': path.resolve(__dirname, 'docs/core')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 3000,
        hot: false,
        liveReload: true,
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd,
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                  from: path.resolve(__dirname, 'docs/favicon.ico'),
                  to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'docs/Snake.png'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]}
        ),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/i,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '',
                        }}, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
            {
                test: /\.(gif|png|jpg|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ]
    },
}

