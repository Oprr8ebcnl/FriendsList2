//Import our packages
var express=require('express');
var app=express();
var http=require('http').Server(app);

//Serve up our static files
app.use(express.static(__dirname+'/public'));
//We are telling our app to use the static folder (public) that express prepares for us

//Serve up our index.html file
app.get('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});

//Run on a local port
http.listen(process.env.PORT || 3000, function(){
	console.log("Listening on *:3000");
})