var time=new Date().getTime();
for(var i =0; i<100000000;i++)
{
	for(var j =0; j<10;j++)
		if(j===10-1 && i === 100000000-1){
			console.log(new Date().getTime()-time)
		}
}