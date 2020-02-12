const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {

    // DEFAULT IS DEV | env.MODE == "development"
    let devtool = "source-map";
    let mode = "development";
    let watch = true;
    let filename = "main.js";

    if(env.MODE == 'production'){
        devtool = false;
        mode = "production";
        watch = false;
        filename = "main-[contentHash].js";
    }

    console.log(env.MODE);

    return {
        mode: mode,
        entry: "./src/index.js",
        devtool: devtool,
        watch: watch,
        output: {
            filename: filename,
            path: path.resolve(__dirname, "dist")
        },
        plugins: [new HtmlWebpackPlugin({
            template: "./src/template.html"
        })],
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader", // 3. Inject style js in the DOM
                        "css-loader",// 2. Turns css to js
                        "sass-loader" // 1. Turns sass into css
                    ]
                }
            ]
        }
    }

}