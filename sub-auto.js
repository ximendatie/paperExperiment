var mqtt    = require('mqtt');
var fs = require('fs');

var client  = mqtt.connect('mqtt://127.0.0.1');

 
client.on('connect', function () {

    client.subscribe('ICS1');
    client.subscribe('ICS2');
    client.subscribe('ICS3');
    client.subscribe('ICS4');
    client.subscribe('ICS5');
    
});
  
client.on('message', function (topic, message) {

    var num = parseInt(topic);
    console.log(topic+' received:' + new Date().getTime());
    message = message.toString();
    var len = message.length;
    var result=message.substr(len/2);
    for(var i = 0; i < len/2; i++){
        if(i === len/2 - 1){
            console.log(topic+' solved:' +new Date().getTime());//处理结束时间
            client.publish('topic'+nun,result);
        }  
    }

});

