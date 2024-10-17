const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); 
const Dotenv = require('dotenv-webpack'); 

module.exports = {
    entry: './src/One.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, 
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/, 
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][hash][ext]', 
                },
            },
        ],
    },
    plugins: [
        new Dotenv({
            systemvars: true, 
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[contenthash].css', 
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: 'body',
            favicon: './src/assets/icons/leaf.png', 
            meta: {
                'og:image': 'src/assets/images/team-analyzer-preview.png', 
                'twitter:image': 'src/assets/images/team-analyzer-preview.png', 
            },
        }),
    ],
    optimization: {
        minimizer: [
            '...', 
            new CssMinimizerPlugin(), 
        ],
    },
    devtool: 'source-map', 
    mode: 'development', 
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true, 
        port: 8080, 
        hot: true, 
        open: true, 
    },
};
