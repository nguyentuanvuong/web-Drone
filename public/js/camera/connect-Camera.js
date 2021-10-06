const socket = io();
const camera = document.getElementById("video");
var color = [
    '#FF4040',
    '#CCFFFF',  '#CCFFCC',  '#CCFF99',  '#CCFF66',  '#CCFF33',  '#CCFF00',
    '#99FFFF',  '#99FFCC',  '#99FF99',  '#99FF66',  '#99FF33',  '#99FF00',
    '#66FFFF',  '#66FFCC',  '#66FF99',  '#66FF66',  '#66FF33',  '#66FF00',
    '#33FFFF',	'#33FFCC',	'#33FF99',	'#33FF66',	'#33FF33',	'#33FF00',
    '#00FFFF',	'#00FFCC',	'#00FF99',	'#00FF66',	'#00FF33',	'#00FF00',
    '#FFCCFF',	'#FFCCCC',	'#FFCC99',	'#FFCC66',	'#FFCC33',	'#FFCC00',
    '#CCCCFF',	'#CCCCCC',	'#CCCC99',	'#CCCC66',	'#CCCC33',	'#CCCC00',
    '#99CCFF',	'#99CCCC',	'#99CC99',	'#99CC66',	'#99CC33',	'#99CC00',
    '#66CCFF',	'#66CCCC',	'#66CC99',	'#66CC66',	'#66CC33',	'#66CC00',
    '#33CCFF',	'#33CCCC',	'#33CC66',	'#33CC33',	'#00CC99',	'#00CC66',
    '#00CC33',	'#00CC00',	'#FF99FF',	'#FF99CC',	'#FF9999',	'#FF9966',
    '#FF9933',	'#FF9900',	'#CC99FF',	'#CC99CC',	'#CC9999',	'#CC9969',
    '#CC9933',	'#CC9900',	'#9999FF',	'#9999CC',	'#999999',	'#999966',
    '#999933',	'#999900',	'#6699FF',	'#6699CC',	'#669999',	'#669966',
    '#669933',	'#669900',	'#3399FF',	'#3399CC',	'#339999',	'#339966',
    '#339933',	'#339900',	'#0099FF',	'#0099CC',	'#009999',	'#009966',
    '#009933',	'#009900',	'#FF66FF',	'#FF66CC',	'#FF6699',	'#FF6666',
    '#FF6633',	'#FF6600',	'#CC66FF',	'#CC66CC',	'#CC6699',	'#CC6666',
    '#CC6633',	'#CC6600',	'#9966FF',	'#9966CC',	'#996699',	'#996666',
    '#996633',	'#996600',	'#6666FF',	'#6666CC',	'#666699',	'#666666',
    '#666633',	'#666600',	'#3366FF',	'#3366CC',	'#336699',	'#336666',
    '#336633',	'#336600',	'#0066FF',	'#0066CC',	'#006699',	'#006666',
    '#006633',	'#006600',	'#FF33FF',	'#FF33CC',	'#FF3399',	'#FF3366',
    '#FF3333',	'#FF3300',	'#CC33FF',	'#CC33CC',	'#CC3399',	'#CC3366',
    '#CC3333',	'#CC3300',	'#9933FF',	'#9933CC',	'#993399',	'#993366',
    '#993333',	'#993300',  '#6633FF',  '#6633CC',  '#663399',  '#663366',
    '#663333',  '#663300',  '#3333FF',  '#3333CC',  '#333399',  '#333366'
];

results.width = camera.offsetWidth;
results.height = camera.offsetHeight;

socket.on("connect", () => {
    socket.on(`ResultsID${socket.id}`,msg=>{
        sendImg();
        drawResults(msg);
    });
});

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
    preview.height = 480;
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
    sendImg();
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
    ctx.fillText(`Detect: ${msg.output}`,0,20);
    ctx.fillText(`Time: ${msg.time}`,0,40);
    
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

function sendImg(){
    const p = document.getElementById("preview");
    var context = p.getContext("2d");
    context.drawImage(video,0,0,context.width, context.height);
    var imgString = p.toDataURL();
    imgString = imgString.slice(22);
    socket.emit("StreamID",{"socketID":socket.id, "img": imgString});
}
