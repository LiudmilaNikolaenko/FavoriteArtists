module.exports = {
    entry: "./src/index.js",
    output:{
        path: __dirname + "/public",
        filename: "bundle.js",
        //development
        publicPath: "/static/"
        //production
        //publicPath: "./public/"
    },
    resolve:{   
        extensions: [".js", ".jsx"]
    },
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query:{
                    presets:[ "react", "es2015", "stage-0" ],
                    env: {
                        development: {
                            presets: ["react-hmre"]
                        }
                    }
                }
            },
            {
                test: /\.s?css/,
                loaders: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    }
}