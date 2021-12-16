const mqtt = require('mqtt');
const mqttClient = mqtt.connect('mqtt://broker.hivemq.com');
mqttClient.on('connect',()=>{
  console.log('mqtt Connect');
  setInterval(()=>{
    const random = Math.random()*50;
    mqttClient.publish('ntvuong',random.toString());
  },1000);
});