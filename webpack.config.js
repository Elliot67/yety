const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {

    // DEFINE VARIABLES
    let devtool;
    let mode;
    let watch;
    let filename;
    let scssModules;
    let plugins;
    let imgLoader;

    if (env.MODE == "development") {
        devtool = "cheap-module-eval-source-map";
        mode = "development";
        watch = true;
        filename = "[name]-bundle.js";
        plugins = [
            new HtmlWebpackPlugin({ // Pour ajouter un autre fichier HTML, simplement créer une nouvelle isntance de l'objet - https://dev.to/mariorodeghiero/multiple-html-files-with-htmlwebpackplugin-19bf
                template: "./src/template.html"
            })
        ];
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
        imgLoader = {
            loader: "img-loader",
            options: {
                plugins: []
            }
        };
    }

    if (env.MODE == 'production') {
        devtool = false;
        mode = "production";
        watch = false;
        filename = "[name]-[contentHash]-bundle.js";
        plugins = [
            new HtmlWebpackPlugin({ // Pour ajouter un autre fichier HTML, simplement créer une nouvelle instance de l'objet - https://dev.to/mariorodeghiero/multiple-html-files-with-htmlwebpackplugin-19bf
                template: "./src/template.html"
            }),
            new MiniCssExtractPlugin({
                filename: "[name]-[contentHash].css"
            }),
            new CleanWebpackPlugin()
        ];
        scssModules = [
            MiniCssExtractPlugin.loader, // Create CSS files
            "css-loader",// Turns css to js
            "postcss-loader", // Ajouter des prefixes avec autoprefixer (fichier postcss.config.js)
            "sass-loader" // Turns sass into css
        ];
        imgLoader = {
            loader: 'img-loader',
            options: {
                plugins: [
                    require('imagemin-gifsicle')({
                        interlaced: false
                    }),
                    require('imagemin-mozjpeg')({
                        progressive: true,
                        arithmetic: false
                    }),
                    require('imagemin-pngquant')({
                        floyd: 0.5,
                        speed: 2
                    }),
                    require('imagemin-svgo')({
                        plugins: [
                            { removeTitle: true },
                            { convertPathData: false }
                        ]
                    })
                ]
            }
        };
    }

    console.log('\x1b[1;33m', "--------------------------------------", '\x1b[0m');
    console.log("Running webpack in", '\x1b[1;35m' + env.MODE + '\x1b[0m', "mode");
    console.log('\x1b[1;33m', "--------------------------------------", '\x1b[0m');

    return {
        mode: mode,
        entry: {
            main: ["./src/index.js", "./src/index.scss"]
            //vendor: "./src/vendor.js" Pour créer un fichier séparé consacré au librairies
        },
        devtool: devtool,
        watch: watch,
        output: {
            filename: filename,
            path: path.resolve(__dirname, "dist")
        },
        resolve: {
            alias: {
                '@styles': path.resolve('./src/styles/'),
                '@scripts': path.resolve('./src/scripts/'),
                '@assets': path.resolve('./src/assets/')
            }
        },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: scssModules
                },
                {
                    test: /\.html$/,
                    use: { // Pour importer les fichiers nécessaires
                        loader: "html-loader",
                        options: {
                            attrs: [':srcset',':data-srcset', 'img:data-src', 'img:src', 'audio:src', 'video:src', 'track:src', 'embed:src', 'source:src', 'input:src', 'object:data', 'script:src']
                        }
                    }
                },
                {
                    test: /\.(svg|png|jpg|jpeg|gif)$/, // Ajouter les nouveaux types quand il y en a
                    use: [
                        { // Pour créer les images dans dist
                            loader: "file-loader",
                            options: {
                                name: "[name]-[hash].[ext]",
                                outputPath: "assets",
                                esModule: false
                            }
                        },
                        imgLoader // Pour optimiser les images
                    ]
                }
            ]
        }
    }

}

//TODO: https://www.npmjs.com/package/imagemin-webpack-plugin ou https://iamakulov.com/notes/optimize-images-webpack/