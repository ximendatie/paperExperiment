var mqtt = require('mqtt');
var fs = require('fs');

var Sclient = mqtt.connect('mqtt://127.0.0.1'); 

// var timeResult = new Array();


Sclient.on('connect', function () {
  Sclient.subscribe('ICS');
});
Sclient.on('message', function (topic, message) {
    var getTime = new Date().getTime();
    var messObj = JSON.parse(message);
    messObj.getTime = getTime;



    // 处理后存储

    console.log('\ncloud solve');
    messObj.resultTime = new Date().getTime();
    console.log('data length ' + messObj.length );      
    console.log(messObj.startTime+'~'+messObj.resultTime+'~'+messObj.getTime);
    console.log('network:'+(messObj.getTime-messObj.resultTime)+'ms'+'\nsolve:'+(messObj.resultTime-messObj.startTime)+'ms');

    // var temp = new Object();
    // temp.netTime = messObj.getTime-messObj.startTime;
    // temp.solTime = messObj.resultTime-messObj.getTime;
    // timeResult.push(temp);

    // if(timeResult.length === 20){
    //   var a=0,b=0;
    //   for(var i =0; i < 10; i++){
    //     a+=timeResult[i].netTime;
    //     b+=timeResult[i].solTime;
    //   }
    //   console.log('ave:'+a/10+','+b/10);
    // }

    
    // fs.writeFile('./result.md',JSON.stringify(messObj),function(err){
    //         if(err) throw err;
    //         console.log('has finished');
    // });
    
});

