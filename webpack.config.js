var HTMLWebpackPlugin = require('html-webpack-plugin');

var HTMLWebPackPluginConfig = new HTMLWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'head'
});




module.exports = {
	entry: __dirname + '/app/index.js',
	module: {
		loaders:[
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},{
			test: /\.(png|gif|jpg)$/,
			exclude: /node_modules/,
			loader: 'url-loader'
		}
		]
	},
	output: {
		filename: 'transformed.js',
		path: __dirname + "/build"
	},
	plugins: [HTMLWebPackPluginConfig]
};