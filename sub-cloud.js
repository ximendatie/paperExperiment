var mqtt = require('mqtt');
var fs = require('fs');

var Sclient = mqtt.connect('mqtt://127.0.0.1'); 

// var timeResult = new Array();


Sclient.on('connect', function () {
  Sclient.subscribe('ICS');
});
Sclient.on('message', function (topic, message) {
    var getTime = new Date().getTime();
    var messObj = JSON.parse(message);//解析，占时间
    messObj.getTime = getTime;

    console.log('\ncloud solve');    
    console.log(messObj.sendTime+'~'+messObj.resultTime+'~'+messObj.getTime);
    console.log('network:'+(messObj.getTime-messObj.resultTime)+'ms'+'\nsolve:'+(messObj.resultTime-messObj.getTime)+'ms');


    // fs.writeFile('./result.md',JSON.stringify(messObj),function(err){
    //         if(err) throw err;
    //         console.log('has finished');
    // });

    
});

