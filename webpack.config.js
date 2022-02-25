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
		}]
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