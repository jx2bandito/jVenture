var webpack = require('webpack');
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
	plugins: [HTMLWebPackPluginConfig,
	
		new webpack.DefinePlugin({
			'process.env': {
			NODE_ENV: JSON.stringify('production')
			}
		}), 
		new webpack.optimize.UglifyJsPlugin({
			compress: {
			  warnings: false,
			  screw_ie8: true,
			  conditionals: true,
			  unused: true,
			  comparisons: true,
			  sequences: true,
			  dead_code: true,
			  evaluate: true,
			  if_return: true,
			  join_vars: true
			},
			output: {
				comments: false
			}
		}),
	new webpack.HashedModuleIdsPlugin()]
};
