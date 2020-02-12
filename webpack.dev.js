const path = require("path");
const merge = require('webpack-merge');
const commonConfig = require("./webpack.config");

module.exports = merge(commonConfig, {
    mode: "development",
    watch: true,
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    }
});