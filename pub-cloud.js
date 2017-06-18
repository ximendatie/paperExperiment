var mqtt    = require('mqtt');
var fs = require('fs');

var client  = mqtt.connect('mqtt://127.0.0.1');

 
client.on('connect', function () {

    console.log('Send Time (20):');
    fs.readFile('./raw.md',function(err,data){
        if(err) throw err;
        var pubData = data.toString();
        var i = 1;
        var timer = setInterval(function(){
            // 发送原始数据
            console.log(new Date().getTime());//发送时间
            if(data.length>0){
                client.publish('ICS',pubData);
            }          
            else
                console.log('null?');
            //循环10次
            if(i == 20){
                clearInterval(timer);
            }
            i++;
        },300);

        
    });


});
  