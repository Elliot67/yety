const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = env => {

    // DEFINE VARIABLES
    let devtool;
    let mode;
    let watch;
    let filename;
    let scssModules;
    let plugins;

    if(env.MODE == "development"){
        devtool = "source-map";
        mode = "development";
        watch = true;
        filename = "[name]-bundle.js";
        plugins = [
            new HtmlWebpackPlugin({
                template: "./src/template.html"
            })
        ]
        scssModules = [
            "style-loader", // Inject style js in the DOM
            { // Turns css to js
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            },
            { // Ajouter des prefixes avec autoprefixer (fichier postcss.config.js)
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            { // Turns sass into css
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
        ];
    }

    if(env.MODE == 'production'){
        devtool = false;
        mode = "production";
        watch = false;
        filename = "[name]-[contentHash]-bundle.js";
        plugins = [
            new HtmlWebpackPlugin({
                template: "./src/template.html"
            }),
            new MiniCssExtractPlugin({filename: "[name]-[contentHash].css"})
        ];
        scssModules = [
            MiniCssExtractPlugin.loader, // Create CSS files
            "css-loader",// Turns css to js
            "postcss-loader", // Ajouter des prefixes avec autoprefixer (fichier postcss.config.js)
            "sass-loader" // Turns sass into css
        ];
    }

    console.log("Running webpack as " + env.MODE);

    return {
        mode: mode,
        entry: {
            main: "./src/index.js",
            bundle: "./src/vendor.js"
        },
        devtool: devtool,
        watch: watch,
        output: {
            filename: filename,
            path: path.resolve(__dirname, "dist")
        },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: scssModules
                }
            ]
        },
    }

}