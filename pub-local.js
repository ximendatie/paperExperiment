var mqtt    = require('mqtt');
var fs = require('fs');

var client  = mqtt.connect('mqtt://127.0.0.1');

 
client.on('connect', function () {

    fs.readFile('./raw.md',function(err,data){
        if(err) throw err;

        
        var c = 1;
        var timer = setInterval(function(){
            var pubData = new Object();
            pubData.startTime = new Date().getTime();
            var dataObj = JSON.parse(data);

            // 模拟数据处理  
            var length = dataObj.length; 
            var newData = [];
            for(var i = 0, j = 0; i<length; i++){
                //处理数据
                if(dataObj[i].tem<1 && dataObj[i].hum<1){
                    newData[j++] = dataObj[i];
                }
                // 处理后存储
                if(i === length-1){
                    console.log('i:'+i);
                    console.log('\n local solve');
                    pubData.resultTime = new Date().getTime();
                    pubData.data = newData;
                    console.log('data length ' + length + 'newData length '+ newData.length);      
                    console.log(pubData.startTime+'~'+pubData.resultTime);
                    console.log('\nsolve:'+(pubData.resultTime-pubData.startTime)+'ms');


                    if(newData.length>0){
                        client.publish('ICS',JSON.stringify(pubData) );
                        console.log(JSON.stringify(pubData));
                        console.log('pubed');
                    }          
                    else
                        console.log('null?');
                    
                    // fs.writeFile('./result.md',JSON.stringify(messObj),function(err){
                    //         if(err) throw err;
                    //         console.log('has finished');
                    // });
                }
            } 

            //循环20次
            if(c == 20){
                clearInterval(timer);
            }
            c++;
        },300);

        
    });


});
  