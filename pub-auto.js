var mqtt    = require('mqtt');
var fs = require('fs');

var client  = mqtt.connect('mqtt://127.0.0.1');
var Pclient  = mqtt.connect('mqtt://192.168.199.231');

 
client.on('connect', function () {

    fs.readFile('./raw.md',function(err,data){
        if(err) throw err;

        var pubData = data.toString();
        console.log('start time：' + new Date().getTime()) ;
        client.publish('ICS1',pubData);  
    });

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
            if(num < 10)
                client.publish('ICS'+(num+1),result);
            else
                Pclient.publish('ICS'+(num+1),result);
        }  
    }
    
});




 


