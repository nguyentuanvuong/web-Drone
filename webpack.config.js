const path = require('path');



module.exports = {
    entry: './src/test/index.js',
    output: {
        filename : 'index.js', 
        path : path.resolve(__dirname, 'public/js/test') 
    }
};

module.exports = {
    entry: './src/objectDetection/index.js',
    output: {
        filename : 'index.js', 
        path : path.resolve(__dirname, 'public/js/objectDetection') 
    }
};