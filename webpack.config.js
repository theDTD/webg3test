var path = require('path');

module.exports = {
    entry: {
        sellback: './src/main/react/containers/sellback.js',
        createAccount: './src/main/react/containers/createAccount.js',
        signIn: './src/main/react/containers/signIn.js',
        payment: './src/main/react/containers/payment.js',
        buyTextbooks: './src/main/react/containers/buyTextbooks.tsx',
        rentTextbooks: './src/main/react/containers/rentTextbooks.tsx',
        extraMileGuarantee: './src/main/react/containers/extraMileGuarantee.tsx',
        marketingPage: './src/main/react/containers/marketingPage.tsx',
        viewOrder: './src/main/react/containers/viewOrder.tsx',
        seoTestEdit: './src/main/react/containers/seoTestEdit.tsx',
    },
    output: {
        path: path.join(__dirname, 'grails-app/assets/javascripts'),
        publicPath: '/assets/',
        filename: 'bundle-[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                include: path.join(__dirname, 'src/'),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000000
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    }
};