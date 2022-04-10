const webpack = require('webpack');

module.exports = {
	require: ['@babel/polyfill'],
	components: 'src/components/**/**/*.js',
    ignore: [
        'src/components/molecules/Auth/index.js',
        'src/components/molecules/BottomSheet/index.js' 
    ],
	webpackConfig: {
		resolve: {
			// auto resolves any react-native import as react-native-web
			alias: { 
                'react-native$': 'react-native-web', 
                'react-native-elements': 'react-native-web',
                '@react-native-google-signin/google-signin': 'react-native-web' ,
                'reanimated-bottom-sheet' : 'react-native-web',
                'react-native-qrcode-scanner' : 'react-native-web',
                //'react-redux' : 'react-native-web',
                'react-native-gifted-chat': 'react-native-web',
            },
			extensions: ['.web.js', '.js'],
		},
		module: {
			rules: [
				{
					test: /\.js|\.jsx$/,
					loader: 'babel-loader',
					exclude: [/node_modules/],
					options: {
						plugins: [
							'@babel/proposal-class-properties',
							'@babel/proposal-object-rest-spread',
							'react-native-web',
						],
						presets: ['@babel/preset-env', 'module:metro-react-native-babel-preset'],
						babelrc: false,
					},
				},
				{
					test: /\.(jpe?g|png|gif)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								hash: 'sha512',
								digest: 'hex',
								name: '[hash].[ext]',
							},
						},
					],
				},
				{
					test: /\.ttf$/,
					loader: 'file-loader',
				},
			],
		},
		// Most react native projects will need some extra plugin configuration.
		plugins: [
			// Add __DEV__ flag to browser example.
			new webpack.DefinePlugin({
				__DEV__: process.env,
			}),
		],
	},
};