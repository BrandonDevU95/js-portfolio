const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	//Este es el punto de entrada de la aplicación
	entry: './src/index.js',
	//Aquí se define el punto de salida de la aplicación
	output: {
		//Aquí se define el nombre del archivo de salida
		filename: 'main.js',
		//Aquí se define la ruta de salida
		// __dirname es una variable global que contiene la ruta del archivo actual
		// resolve une dos rutas
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		//Aquí se definen las extensiones que se van a utilizar
		extensions: ['.js'],
	},
	module: {
		rules: [
			{
				// Los test son expresiones regulares que van a reconocer los archivos que se van a utilizar
				// La exprecion ".m" nos indica que va a trabajar con archivos moduel o ".js" que va a trabajar con archivos js
				test: /\.m?js$/,
				// Aquí se define que se van a excluir los archivos de node_modules
				exclude: /node_modules/,
				use: {
					// Aquí se define que loader se va a utilizar
					loader: 'babel-loader',
				},
			},
			{
				// Aquí se define que se va a trabajar con archivos css
				test: /\.css|.styl$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'stylus-loader',
				],
			},
		],
	},
	plugins: [
		// Aquí se define que plugin se va a utilizar
		new HtmlWebpackPlugin({
			// Aquí se define el template que se va a utilizar
			inject: true,
			// Aquí se define la ruta del template que se esta usando
			template: './public/index.html',
			// Aquí se define el nombre del archivo de salida
			filename: './index.html',
		}),
		// Creamos una instancia de MiniCssExtractPlugin
		new MiniCssExtractPlugin(),
	],
};
