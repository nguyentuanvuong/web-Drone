const socket = io();
socket.on("connect", () => {
    socket.on(socket.id,msg=>{
        const imgItem = document.getElementById('image');
        imgItem.src = `data:image/png;base64,${msg.img}`;
    });
    socket.on(`ResultsID${socket.id}`,msg=>{
        console.log(msg);
    });
  });



navigator.mediaDevices.enumerateDevices().then(function (devices) {
    for(var i = 0; i < devices.length; i ++){
        var device = devices[i];
        if (device.kind === 'videoinput') {
            var option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || 'camera ' + (i + 1);
            document.querySelector('select#videoSource').appendChild(option);
        }
    };
});

$('#config').submit((event)=>{
    var device = $( '#videoSource' ).first().val();
    var fps = $( '#fps' ).first().val();
    var resolution = $( '#resolution' ).first().val();
    viewCam(device, fps,resolution);
});

function viewCam(device, fps,resolution){
    var video = document.getElementById("video");
    var constraints = {video: {  width: 1920, height: 1080, deviceId: device } };
    var canvas = document.getElementById("preview");
    var context = canvas.getContext("2d");
    canvas.width = resolution;
    canvas.height = canvas.width*9/16;
    context.width = canvas.width;
    context.height = canvas.height;
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
        var video = document.querySelector('video');
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
            video.play();
        };
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); });

    setInterval(()=>{
        context.drawImage(video,0,0,context.width, context.height);
        var imgString = canvas.toDataURL();
        imgString = imgString.slice(22);
        socket.emit("StreamID",{"socketID":socket.id, "img": imgString});
    },1000/fps);
}