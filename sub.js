var mqtt = require('mqtt');
var fs = require('fs');

var Sclient = mqtt.connect('mqtt://127.0.0.1'); 


Sclient.on('connect', function () {
  Sclient.subscribe('ICS');
});
Sclient.on('message', function (topic, message) {
    var getTime = new Date().getTime();
    var messObj = JSON.parse(message);
    messObj.getTime = getTime;


    // 模拟数据处理
    var length = messObj.data.length; 
    var newData = messObj.data;
    for(var i = 0, j = 0; i<length; i++){
      if(messObj.data[i].tem<35 && messObj.data[i].hum<50){
        newData[j++] = messObj.data[i];
      }
      // 处理后存储
      if(i === length-1){
        messObj.resultTime = new Date().getTime();
        fs.writeFile('./result.md',JSON.stringify(messObj),function(err){
                if(err) throw err;
                console.log('has finished');
        });
      }
    } 
});

