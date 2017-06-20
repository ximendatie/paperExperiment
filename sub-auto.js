var mqtt    = require('mqtt');
var fs = require('fs');

var client  = mqtt.connect('mqtt://127.0.0.1');

 
client.on('connect', function () {

    client.subscribe('ICS1');
    client.subscribe('ICS2');
    client.subscribe('ICS3');
    client.subscribe('ICS4');
    client.subscribe('ICS5');
    client.subscribe('ICS6');
    client.subscribe('ICS7');
    client.subscribe('ICS8');
    client.subscribe('ICS9');
    
});
  
client.on('message', function (topic, message) {

    var num = parseInt(topic.substring(3));
    console.log('\n' + topic+' received:' + new Date().getTime());
    message = message.toString();
    var len = message.length;
    var result=message.substr(parseInt(len/2));
    console.log(len);
    for(var i = 0; i < parseInt(len/2); i++){
        if(i === parseInt(len/2) - 1){
            console.log(topic+' solved:' +new Date().getTime());//处理结束时间
            client.publish('ICS'+(num+1),result);
        }  
    }

});

