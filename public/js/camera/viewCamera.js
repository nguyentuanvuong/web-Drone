
socket.on('message', function(msg) {
  var item = document.getElementById('messages');
  item.textContent = msg;
});
socket.on('stream', (jpeg_as_text) => {
  const item = document.getElementById('obs');
  item.src = `data:image/png;base64,${jpeg_as_text}`;
  // item.src = jpeg_as_text;
});

// socket.on('stream cam', (jpeg_as_text) => {
//   const item = document.getElementById('1');
//   // item.src = `data:image/jpeg;base64,${jpeg_as_text}`;
//   item.src = jpeg_as_text;
// });