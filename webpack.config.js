const path = require('path')
const htmlWebPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const copyWebPackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        foreground: './src/foreground.js',
        background: './src/background.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebPlugin({
            filename: 'popup.html',
            template: './src/popup.html',
            excludeChunks: ['background']
        }),
        new copyWebPackPlugin({
            
                patterns: [
                    {
                        from: path.resolve(__dirname, "src", "manifest.json")                   
                    },
                    {
                        from: path.resolve(__dirname, "src", "icons"), 
                        to: path.resolve(__dirname, "dist", "icons")
                    }
                ]
            
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                exclude: /LICENSE/,
                use: ['style-loader','css-loader'],
            }
        ],
        
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
      }
}