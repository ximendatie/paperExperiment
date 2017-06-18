var mqtt = require('mqtt');
var fs = require('fs');

var Sclient = mqtt.connect('mqtt://127.0.0.1'); 


Sclient.on('connect', function () {
  Sclient.subscribe('ICS');
  console.log('receive time and result time (20):');
});
Sclient.on('message', function (topic, message) {

    console.log(new Date().getTime());//接受数据时间
    message = message.toString();
    var result='';
    for(var i = 0; i < message.length; i++){
      if(message[i] === 't'){
        result+='t';
      }
      if(i === message.length - 1){
        console.log(new Date().getTime());//处理结束时间
      }
        
    }
    
    
});

