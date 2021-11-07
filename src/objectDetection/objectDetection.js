// import * as tf from '@tensorflow/tfjs';
const tf = require('@tensorflow/tfjs');

async function load(weights){
    const model = tf.loadGraphModel(weights);
    console.log(tf.getBackend());
    return model;
}
  
module.exports = {
    load,
};

