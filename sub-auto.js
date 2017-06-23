var mqtt    = require('mqtt');
var fs = require('fs');

var client  = mqtt.connect('mqtt://127.0.0.1');
var serNum = 9;
var resultTime = [];
var resulti=0;
var recTime = [];
var recj=0;
var recM=0;//first rec

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
    client.subscribe('ICS10');
    
});
  
client.on('message', function (topic, message) {

    var num = parseInt(topic.substring(3));
    if(num === 10){
        recM = 0;
        var temp = new Date().getTime()
        resultTime[resulti++]=temp;
        console.log(serNum+'--------------------resultTime:'+temp);
        if(serNum === 0){
            
            console.log('recTime');
            for(var i=0;i<recTime.length;i++)
                console.log(recTime[i])
            console.log('resultTime');
            for(var i=0;i<resultTime.length;i++)
                console.log(resultTime[i])
        }
        serNum--;
    }
    else{
        var temp = new Date().getTime()
        if(recM === 0){
            recTime[recj++]=temp;
            console.log(serNum+'--------------------recTime:' + temp);
        }
        
        // console.log(topic+' recTime:' + temp);
        recM=1;
        message = message.toString();
        var len = message.length;
        var result=message.substr(parseInt(len/2));
        // console.log(len);
        for(var i = 0; i < parseInt(len/2); i++){
            if(i === parseInt(len/2) - 1){
                // console.log(topic+' solved:' +new Date().getTime());//处理结束时间
                client.publish('ICS'+(num+1),result);
            }  
        }
    }
    

});

