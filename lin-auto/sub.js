var mqtt = require('mqtt');
var fs = require('fs');

//数据处理
function solve(){
    var re = "";
    for(o = 0;o < 100000;o++){
    }
    for(o = 0;o < 100;o++){
        re+="a";
    }
    return re;
}

var Sclient = mqtt.connect('mqtt://127.0.0.1'); 
console.log("start connect")
// var timeResult = new Array();
Sclient.on('connect', function () {
    console.log("start connect");
  Sclient.subscribe('local_test');
  Sclient.subscribe('cloud_test');
  Sclient.subscribe('solved');
  Sclient.subscribe('raw');
});

Sclient.on('message', function (topic, message) {

    if(topic == 'raw'){
        solve();
    }
    console.log('recv: '+ topic);
    Sclient.publish(topic + '1','1')
});

