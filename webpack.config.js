const path = require('path')

module.exports = {
	entry: ['./src/cli.js'],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, './dist'),
		// libraryTarget: 'commonjs2'
	},
	target: 'node',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['stage-2']
				}
			}
		]
	}
}
