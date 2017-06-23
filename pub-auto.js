var mqtt    = require('mqtt');
var fs = require('fs');

var client  = mqtt.connect('mqtt://127.0.0.1');
var Pclient  = mqtt.connect('mqtt://192.168.199.231');

 
var piNum = 0;//pi端功能模块

var starti=0;
var startTime=[];
var sendi=0;
var sendTime=[];

client.on('connect', function () {

    firstPub();

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
    // console.log(topic+' received:' + new Date().getTime());
    message = message.toString();
    var len = message.length;
    var result=message.substr(parseInt(len/2));
    // console.log(len);
    for(var i = 0; i < parseInt(len/2); i++){
        if(i === parseInt(len/2) - 1){
            // console.log(topic+' solved:' +new Date().getTime());//处理结束时间
            if(num < piNum)
                client.publish('ICS'+(num+1),result);
            else{
                var temp = new Date().getTime();
                sendTime[sendi++] = temp;
                console.log(piNum+'--------------------sendTime:'+temp)
                if(piNum == 9){
                    console.log('startTime');
                    for(var i=0;i<startTime.length;i++)
                        console.log(startTime[i])
                    console.log('sendTime');
                    for(var i=0;i<sendTime.length;i++)
                        console.log(sendTime[i])
                }
                    
                Pclient.publish('ICS'+(piNum+1),result);
                if(piNum <= 9){
                    setTimeout(function(){
                        firstPub();
                    },2000);
                }             
                piNum++;
            }
        }  
    }
    
});

function firstPub(){
    fs.readFile('./raw.md',function(err,data){
        if(err) throw err;

        var pubData = data.toString();
        var temp = new Date().getTime();
        startTime[starti++] = temp;
        console.log(piNum+'--------------------startTime:' + temp) ;
        if(piNum === 0){
            var temp = new Date().getTime();
            sendTime[sendi++] =temp;
            console.log(piNum+'--------------------sendTime:'+temp);
            Pclient.publish('ICS1',pubData);
            piNum++;
            setTimeout(function(){
                firstPub();
            },2000);      
        }  
        else 
            client.publish('ICS1',pubData); 
    });
}