var mqtt    = require('mqtt');
var fs = require('fs');

var client  = mqtt.connect('mqtt://127.0.0.1');

 
client.on('connect', function () {

    fs.readFile('./raw.md',function(err,data){
        if(err) throw err;

        // 发送原始数据
        var pubData = '{"sendTime":'+new Date().getTime()+','+'"data":'+data.toString()+'}';
        if(data.length>0){
            client.publish('ICS',pubData);
            console.log('pubed');
        }          
        else
            console.log('null?');
    });


});
  