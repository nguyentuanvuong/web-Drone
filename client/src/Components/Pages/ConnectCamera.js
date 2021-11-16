import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';

const camera = document.getElementById('view-Cam');
const video = document.getElementById('video');
const list_camera = document.getElementById('list_camera');
const results = document.getElementById('results');

const weights = 'web_model/model.json';
const [modelWeight, modelHeight] = [320, 320];
const names = ['person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light',
    'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
    'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee',
    'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard',
    'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple',
    'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
    'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',
    'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear',
    'hair drier', 'toothbrush'
]


class ConnectCamera extends Component {
    state = {
        model: null,
        preview: "",
        predictions: []
    };
    
    componentDidMount() {
        tf.loadGraphModel(weights).then(model => {
            this.setState({
                model: model
            });
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div id="list_camera" className="col-4 " />
                    <div id="view-Cam" className="col-8">
                        <canvas id="results" />
                    </div>
                </div>
            </div>
        );
    }
}

function listCamera() {
    ReactDOM.render(
        <div>
            scksc
        </div>
        ,document.getElementById('list-camera')
    );
}

export default ConnectCamera;