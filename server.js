var express = require('express'); 
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/public/images'));
app.get('/',function(req,resp)
{
	resp.sendFile(__dirname+"/"+"public/index.html")
});
app.listen(5678,function(){
	console.log('Listening at port 5678');
});