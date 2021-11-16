// const { io } = require("socket.io-client");

const camera = document.getElementById('view-Cam');
const video = document.getElementById('video');
const list_camera = document.getElementById('list_camera');
const results = document.getElementById('results');
var ctx = results.getContext("2d");
const socket = io()

const weights = 'fire_web_model/model.json';
const [modelWeight, modelHeight] = [320, 320];
// const names = ['person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light',
//     'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
//     'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee',
//     'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard',
//     'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple',
//     'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
//     'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',
//     'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear',
//     'hair drier', 'toothbrush'
// ]

const names = ['person']

var model = undefined;

load(weights);

async function load(weights){
    
    model = await tf.loadGraphModel(weights);
    ctx.clearRect(0, 0, results.width, results.height);
    tf.setBackend('webgl');
    list_camera.style.display = '';
}



navigator.mediaDevices.getUserMedia({  video: true }).then(function(){
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
        for(var i = 0; i < devices.length; i ++){
            var device = devices[i];
            if (device.kind === 'videoinput') {
                const item = document.createElement('div');
                item.innerHTML = `
                <a id = "${device.deviceId}" class="list-group-item list-group-item-action py-3 lh-tight" onclick="enableCam(this.id)">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                    <strong class="mb-1">${device.label}</strong>
                    </div>
                <div class="col-10 mb-1 small " style = "overflow: hidden" >${device.deviceId}</div>
                </a>
                `;
                list_camera.appendChild(item);
            }
        };
    });
});

function enableCam(device){
    if(model){
        // list_camera.style.display = 'none';
        results.style.display = '';
        var constraints = {
            video: {
                width: 1920,
                height: 1080,
                deviceId: device ? {exact: device}: undefined
            }
        };
        navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
            video.srcObject = mediaStream;
            video.addEventListener('loadeddata', predictWebcam);
        });
        
    }
    else console.log('model loading .....');
}

function predictWebcam() {
    const input = tf.tidy(() => {
        return tf.image.resizeBilinear(tf.browser.fromPixels(video), [modelWeight, modelHeight])
            .div(255.0)
            .expandDims(0);
    });
    
    model.executeAsync(input).then(res => {
        drawBox(res);
        tf.dispose();
    });
    tf.dispose(input);
    window.requestAnimationFrame(predictWebcam);
}

const drawBox = (res)=>{
    results.width = camera.offsetWidth;
    // results.width = 640;
    results.height = results.width*9/16
    ctx.clearRect(0, 0, results.width, results.height);
    ctx.drawImage(video,0, 0, results.width, results.height);
        
    const [boxes, scores, classes, valid_detections] = res;
    const boxes_data = boxes.dataSync();
    const scores_data = scores.dataSync();
    const classes_data = classes.dataSync();
    const valid_detections_data = valid_detections.dataSync()[0];

    for (i = 0; i < valid_detections_data; ++i) {
        let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);
        x1 *= results.width;
        x2 *= results.width;
        y1 *= results.height;
        y2 *= results.height;
        const width = x2 - x1;
        const height = y2 - y1;
        const klass = names[classes_data[i]];
        const score = scores_data[i].toFixed(2);

        ctx.strokeStyle = "#00FFFF";
        ctx.lineWidth = 4;
        ctx.strokeRect(x1, y1, width, height);

        ctx.font = "20px Arial";
        ctx.fillStyle = "#00FFFF";
        ctx.lineWidth = 4;
        ctx.fillText(`${klass} ${score}`,x1,y1);

        // console.log(klass, score, x1,y1,x2,y2);
    }
    // sendImg();
}


function sendImg(){
    var imgString = results.toDataURL();
    socket.emit('StreamID',{"socketID":socket.id, "img": imgString});
}