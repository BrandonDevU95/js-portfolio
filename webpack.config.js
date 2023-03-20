const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	//Este es el punto de entrada de la aplicación
	entry: './src/index.js',
	//Aquí se define el punto de salida de la aplicación
	output: {
		//Aquí se define el nombre del archivo de salida
		filename: '[name].[contenthash].js',
		//Aquí se define la ruta de salida
		// __dirname es una variable global que contiene la ruta del archivo actual
		// resolve une dos rutas
		path: path.resolve(__dirname, 'dist'),
		assetModuleFilename: 'assets/images/[hash][ext][query]',
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
			{
				// Aquí se define que se va a trabajar con archivos de tipo imagen
				test: /\.png/,
				type: 'asset/resource',
			},
			{
				// Aquí se define que se va a trabajar con archivos de tipo fuente
				test: /\.(woff|woff2)$/,
				use: {
					loader: 'url-loader',
					options: {
						// Aquí se define el limite de peso del archivo
						limit: 10000,
						// Aquí se define el tipo de archivo
						mimetype: 'application/font-woff',
						// Aquí se define la ruta de salida
						name: '[name].[ext]',
						// Aquí se define la ruta de salida
						outputPath: './assets/fonts/',
						// Aquí se define la ruta publica
						publicPath: './assets/fonts/',
						// Aquí se define si se va a usar o no un hash
						// en el nombre del archivo
						esModule: false,
					},
				},
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
		new MiniCssExtractPlugin({
			// Aquí se define el nombre del archivo de salida
			filename: 'assets/[name].[contenthash].css',
		}),
		new CopyPlugin({
			patterns: [
				{
					// Aquí se define la ruta de los archivos que se van a copiar
					from: path.resolve(__dirname, 'src', 'assets/images'),
					// Aquí se define la ruta de salida de los archivos
					to: 'assets/images',
				},
			],
		}),
	],
	// Optimización de los archivos
	optimization: {
		// Minimizar los archivos
		minimize: true,
		// Minimizar los archivos css y js
		minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
	},
};
