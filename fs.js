var fs = require('fs');


var s='';
for(var i = 0; i < 100000; i++){
	var temp = new Object();
	temp.tem=Math.random()*40;
	temp.hum=Math.random()*100;
	s += JSON.stringify(temp);
	if(i<100000-1)
		s+=',';
}
s='['+s+']';
fs.writeFile('./raw.md',s,function(err){
	    if(err) throw err;
	    console.log('has finished');
});

