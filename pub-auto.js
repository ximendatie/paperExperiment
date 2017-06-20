var mqtt    = require('mqtt');
var fs = require('fs');

var client  = mqtt.connect('mqtt://127.0.0.1');

 
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
    
});
  
client.on('message', function (topic, message) {

    switch (topic){

        case 'ICS1':
            console.log('ICS1 rec:' + new Date().getTime());
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
            break;


        case 'ICS2':

            break;
        case 'ICS3':

            break;
        default:
            console.log('no topic');

    }
    
    
    
});

