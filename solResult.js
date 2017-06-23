
var fs = require('fs');

fs.readFile('./data.md',function(err,data){
        if(err) throw err;

        var pubData = data.toString();
        
    });

