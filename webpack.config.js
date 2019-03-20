const path = require("path");
const { CheckerPlugin } = require("awesome-typescript-loader");

const {
    scripts: { outFileName, outDirPath, inFilePath }
} = require("./src/build/dist/_config").config;

module.exports = {
    entry: inFilePath,
    output: {
        path: path.resolve(__dirname, outDirPath),
        filename: outFileName,
        publicPath: "/"
    },
    mode: "development",
    devtool: "inline-source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader", "source-map-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                use: ["babel-loader", "awesome-typescript-loader"]
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
    ]
};
