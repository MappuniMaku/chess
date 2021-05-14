const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const buildConfig = {
    entry: {
        'bundle': './src/ts/bundle.ts',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

const outputExampleWebVoiceControl = Object.assign({}, buildConfig, {
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname,
                    './public/bundle.js'),
            ],
        }),
    ],
});

module.exports = [outputExampleWebVoiceControl];