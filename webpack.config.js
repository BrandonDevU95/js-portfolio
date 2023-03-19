const path = require('path');

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
};
