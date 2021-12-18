const APP_SECRET = '6cb9bb28fa91bab4d10d631d995403cb';
const VALIDATION_TOKEN = 'TokenTuyChon';
const PAGE_ACCESS_TOKEN = 'EAARUN3YhVJoBAMoNMK1CGB6jmZAbIXzL5qCswogUY9vzuskmYnGp8wgQHTngoADFSvPTXvDl6saTLZBj7rzvNVwya95iQVVKU4q8zB0b5iosoJdI59XPFVbHXBLLzQ79y4k8TZBIstyLhKUH7biDCbZAivQZBNg1mx19hHRQnGbTjoZCjrYv9ZB'
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
var server = http.createServer(app);
var request = require("request");

app.get('/', (req, res) => {
    res.send("Home page. Server running okay.");
});

app.get('/webhook', function (req, res) { // Đây là path để validate tooken bên app facebook gửi qua
    console.log(req.query);
    if (req.query['hub.verify_token'] === VALIDATION_TOKEN) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

app.post('/webhook', function (req, res) { // Phần sử lý tin nhắn của người dùng gửi đến
    console.log('có tin nhắn');
    var entries = req.body.entry;
    for (var entry of entries) {
        var messaging = entry.messaging;
        for (var message of messaging) {
            var senderId = message.sender.id;
            if (message.message) {
                if (message.message.text) {
                    var text = message.message.text;
                    sendMessage(senderId, "Hello!! I'm a bot. Your message: " + text);
                }
            }
        }
    }
    res.status(200).send("OK");
});

// Đây là function dùng api của facebook để gửi tin nhắn
function sendMessage(senderId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: PAGE_ACCESS_TOKEN,
        },
        method: 'POST',
        json: {
            recipient: {
                id: senderId
            },
            message: {
                text: message
            },
        }
    });
}

app.set('port', 8000 || 5000);

server.listen(8000, () => {
    console.log('http listening on *:', 8000);
});
