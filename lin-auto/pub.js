var mqtt    = require('mqtt');
var fs = require('fs');

var client  = mqtt.connect('mqtt://127.0.0.1');
var res = "";

//初始出具
for(o = 0;o < 10000;o++){
    res+="a";
}

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
var send_time_local;
var send_time_cloud;
var recv_time_local;
var recv_time_cloud;
var mod = 0;

client.on('connect', function () {
    client.subscribe('local_test1');
    client.subscribe('cloud_test1');
    
    //测试两段时间
    send_time_local = new Date().getTime();
    result = 'A';
    console.log("44")
    console.log(result)
    client.publish('local_test',result)

    send_time_cloud = new Date().getTime();
    client.publish('cloud_test',result) 
    //测试两段时间 end   返回时间在message里获得

    var timer = setTimeout(function(){
        console.log("local:  " + recv_time_local + "  " + send_time_local);
        console.log("local:  " + recv_time_cloud + "  " + send_time_cloud);
        //判断哪个时间短
        if((recv_time_local - send_time_local) < (recv_time_cloud- send_time_cloud)){
            mod = 0;//local快
        }else{
            mod = 1;//cloud快
        }
        console.log("mod :" + mod);
        if(mod){
            result = solve()//先处理在发送
            client.publish('solved',result)
        }else{
            result = res//直接发送
            client.publish('raw',result)
        }
    
    },5000); 
});

client.on("message", function (topic, payload) {
    console.log('收到topic = ' + topic + ' 消息: ' + payload.toString());

    //接受服务器返回的时间
    if(topic == "local_test1"){
        recv_time_local = new Date().getTime();
    }
    if(topic == "cloud_test1"){
        recv_time_cloud = new Date().getTime();
    }
});


