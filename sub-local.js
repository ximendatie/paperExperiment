var mqtt = require('mqtt');
var fs = require('fs');

var Sclient = mqtt.connect('mqtt://127.0.0.1'); 

// var timeResult = new Array();


Sclient.on('connect', function () {
  Sclient.subscribe('ICS');
  console.log('receive result:')
});
Sclient.on('message', function (topic, message) {
    
    console.log(new Date().getTime());
// console.log(message.toString());
    
});

