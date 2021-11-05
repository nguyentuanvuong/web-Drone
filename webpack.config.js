const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename : 'bundle.js', // Tên file đầu ra
        path : path.resolve(__dirname, 'public') // Nơi chưa file đầu ra
    }
};