const socket = io();
const camera = document.getElementById("video");
const tf = require('@tensorflow/tfjs');

const weights = 'model/model.json';

const names = ['person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light',
               'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
               'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee',
               'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard',
               'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple',
               'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
               'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',
               'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear',
               'hair drier', 'toothbrush']

const [modelWeight, modelHeight] = [320, 320];

results.width = camera.offsetWidth;
results.height = camera.offsetHeight;



const list_camera = document.getElementById('list_camera');
navigator.mediaDevices.getUserMedia({  video: true }).then(function(){
    navigator.mediaDevices.enumerateDevices().then(function (devices) {
        for(var i = 0; i < devices.length; i ++){
            var device = devices[i];
            if (device.kind === 'videoinput') {
                const item = document.createElement('div');
                item.innerHTML = `
                <a id = "${device.deviceId}" class="list-group-item list-group-item-action py-3 lh-tight" onclick="viewCamera(this.id)">
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

function viewCamera(device){
    // const active = document.getElementById(device);
    // active.className = `${active.className} active`;
    const preview = document.getElementById("preview");
    var context = preview.getContext("2d");
    var constraints = {
        video: {  
            width: 1920,
            height: 1080,
            deviceId: device ? {exact: device}: undefined
        }
    };
    preview.width = 640;
    preview.height = preview.width*3/4;
    context.width = preview.width;
    context.height = preview.height;
    navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
        var video = document.querySelector('video');
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
            video.play();
        };
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); });


    
}

function drawResults(msg){
    var ctx = results.getContext("2d");
    results.width = camera.offsetWidth;
    results.height = camera.offsetHeight;
    
    ctx.width = results.width;
    ctx.height = results.height;
    ctx.clearRect(0, 0, results.width, results.height);

    ctx.font = "20px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText(`FPS: ${parseFloat(1/msg.time).toFixed(0)}`,0,20);
    ctx.fillText(`Detect: ${msg.output}`,0,40);
    ctx.fillText(`Time: ${msg.time}`,0,60);
    
    for(var i = 0; i < msg.results.length; i ++){
        var x0 = msg.results[i].x0;
        var y0 = msg.results[i].y0;
        var x1 = msg.results[i].x1;
        var y1 = msg.results[i].y1;

        x0 = x0 * results.width / 640;
        y0 = y0 * results.height / 480;
        x1 = x1 * results.width / 640;
        y1 = y1 * results.height / 480;

        x1 = x1 - x0;
        y1 = y1 - y0;

        ctx.fillStyle = color[i];
        ctx.fillText(`${msg.results[i].label}`,x0,y0-5);

        ctx.strokeStyle = color[i];
        ctx.strokeRect(x0, y0, x1, y1);
    }
}

