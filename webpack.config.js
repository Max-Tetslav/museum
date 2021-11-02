const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const devServer = (isDev) => !isDev ? {} : {
    devServer: {
        open: true,
        hot: true,
        port: 8080,
    }
};

const pages = fs
    .readdirSync(path.resolve(__dirname, 'src'))
    .filter((fileName) => fileName.endsWith('.html'));

module.exports = ({ develop }) => ({
    mode: develop ? 'development' : 'production',
    entry: './index.js',
    context: path.resolve(__dirname, 'src'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: '[file]',
    },
    module: {
        rules: [{
                test: /\.(?:ico|gif|png|jpg|jpeg|svg|webp)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(?:mp3|wav|ogg|mp4)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'style.css' }),
        ...pages.map(
            (page) =>
            new HtmlWebpackPlugin({
                template: page,
                filename: page.includes('our') ? `./tours/${page}` : page,
            })
        ),
        new CopyPlugin({
            patterns: [{
                from: '**/*',
                context: path.resolve(__dirname, './src'),
                globOptions: {
                    ignore: [
                        '**/*.js',
                        '**/*.ts',
                        '**/*.scss',
                        '**/*.sass',
                        '**/*.html',
                    ],
                },
                noErrorOnMissing: true,
                force: true,
            }],
        }),
        new CleanWebpackPlugin(),
    ],
    ...devServer(develop),
});

// // // const fs = require('fs");
// // const path = require("path");
// // const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// // // const CopyPlugin = require("copy-webpack-plugin");
// // const HTMLWebpackPlugin = require("html-webpack-plugin");
// // const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// // // const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// // // const TerserPlugin = require("terser-webpack-plugin");

// // // const isProd = process.env.NODE_ENV === "production";
// // // const isDev = !isProd;

// // const filename = (ext) => (`bundle.${ext}`);

// // // const jsLoaders = () => {
// // //     return ["babel-loader"];
// // // };

// // const pages = fs
// //     .readdirSync(path.resolve(__dirname, "src"))
// //     .filter((fileName) => fileName.endsWith(".html"));

// // module.exports = {
// //     // target: ["web", "es6"],
// //     entry: "./index.js",
// //     output: {
// //         path: path.resolve(__dirname, "dist"),
// //         filename: filename("js"),
// //         assetModuleFilename: "[file]",
// //     },
// //     // optimization: {
// //     //     minimize: true,
// //     //     minimizer: [
// //     //         new CssMinimizerPlugin({
// //     //             test: /\.css$/i,
// //     //         }),
// //     //         new TerserPlugin({
// //     //             test: /\.js(\?.*)?$/i,
// //     //         }),
// //     //     ],
// //     // },
// //     // devtool: isDev ? "source-map" : false,
// //     // devServer: {
// //     //     contentBase: path.resolve(__dirname, "dist"),
// //     //     compress: true,
// //     //     port: 4200,
// //     // },
// //     context: path.resolve(__dirname, "src"),
// //     plugins: [
// //         new CleanWebpackPlugin(),
// //         ...pages.map(
// //             (page) =>
// //             new HTMLWebpackPlugin({
// //                 template: page,
// //                 filename: page.includes('our') ? `./tours/${page}` : page,
// //             })
// //         ),
// //         new MiniCssExtractPlugin({
// //             filename: filename("css"),
// //         }),
// //         // new CopyPlugin({
// //         //     patterns: [{
// //         //         from: "**/*",
// //         //         context: path.resolve(__dirname, "./src"),
// //         //         globOptions: {
// //         //             ignore: [
// //         //                 "**/*.js",
// //         //                 "**/*.ts",
// //         //                 "**/*.scss",
// //         //                 "**/*.sass",
// //         //                 "**/*.html",
// //         //             ],
// //         //         },
// //         //         noErrorOnMissing: true,
// //         //         force: true,
// //         //     }, ],
// //         // }),
// //     ],
// //     // resolve: {
// //     //     extensions: [".js", ".ts"],
// //     // },
// //     // mode: 'production',
// //     module: {
// //         rules: [{
// //                 test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
// //                 type: 'asset/resource',
// //             },
// //             {
// //                 test: /\.(woff(2)?|eot|ttf|otf)$/i,
// //                 type: 'asset/resource',
// //             },
// //             {
// //                 test: /\.css$/i,
// //                 use: [MiniCssExtractPlugin.loader, 'css-loader'],
// //             },
// //             {
// //                 test: /\.s[ac]ss$/i,
// //                 use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
// //             }
// //         ]
// //     },
// // };
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// // const pages = ['./src/tour1.html', './src/tour2.html', './src/tour3.html', './src/tour4.html', './src/tour5.html', './src/tour6.html', './src/discoverTour.html'];

// module.exports = {
//     entry: {
//         index: './src/index.js',
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: 'bundle.js',
//         assetModuleFilename: 'assets/[hash][ext]',
//     },
//     module: {
//         rules: [{
//                 test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
//                 type: 'asset/resource',
//             },
//             {
//                 test: /\.(woff(2)?|eot|ttf|otf)$/i,
//                 type: 'asset/resource',
//             },
//             {
//                 test: /\.css$/i,
//                 use: [MiniCssExtractPlugin.loader, 'css-loader'],
//             },
//             {
//                 test: /\.s[ac]ss$/i,
//                 use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
//             }
//         ]
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './src/index.html',
//         }),
//         // ...pages.map(item =>
//         //     new HtmlWebpackPlugin({
//         //         template: item,
//         //     })),
//         new MiniCssExtractPlugin({
//             filename: 'style.css'
//         }),
//         new CleanWebpackPlugin({
//             cleanStaleWebpackAssets: false
//         }),
//     ],
//     mode: 'production',
// };