var mqtt    = require('mqtt');
var fs = require('fs');

var client  = mqtt.connect('mqtt://127.0.0.1');

 
client.on('connect', function () {

    fs.readFile('./raw.md',function(err,data){
        if(err) throw err;
        var c = 1
        var pubData = data.toString();
        console.log('start time and send time:');
        var timer = setInterval(function(){
            console.log(new Date().getTime()) ;
            // 模拟数据处理  
            var length = pubData.length; 
            var result = '';
            for(var i = 0; i < length; i++){
                //处理数据
                if(pubData[i] === 't'){
                    result+='t';
                }  
                if(i == length-1){
                    console.log(new Date().getTime());
                    
                    client.publish('ICS',result);
                }               
            } 

            //循环5次
            if(c == 5){
                clearInterval(timer);
            }
            c++;
        },10000);

        
    });


});
  