var mqtt = require('mqtt');
var fs = require('fs');

var Sclient = mqtt.connect('mqtt://127.0.0.1'); 

var timeResult = new Array();


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
        console.log('\ncloud solve');
        console.log(messObj.sendTime+'~'+messObj.getTime+'~'+messObj.resultTime);
        console.log('network:'+(messObj.getTime-messObj.sendTime)+'ms'+'\nsolve:'+(messObj.resultTime-messObj.getTime)+'ms');

        var temp = new Object();
        temp.netTime = messObj.getTime-messObj.sendTime;
        temp.solTime = messObj.resultTime-messObj.getTime;
        timeResult.push(temp);

        if(timeResult.length === 10){
          var a=0,b=0;
          for(var i =0; i < 10; i++){
            a+=timeResult[i].netTime;
            b+=timeResult[i].solTime;
          }
          console.log('ave:'+a/10+','+b/10);
        }

        // fs.writeFile('./result.md',JSON.stringify(messObj),function(err){
        //         if(err) throw err;
        //         console.log('has finished');
        // });
      }
    } 
});

