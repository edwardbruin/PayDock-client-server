var http = require('http');
var fs = require('fs');
var paymentService = require('./paymentService');
var config = require('./config.json');
config.debugSwitch = true;
console.log("debug is " + config.debugSwitch);

var serverport = config.serverport; 						//loads the serverport variable from the configuration file

http.createServer(function (req, res) {
	switch (req.method) {
		case "GET":
			displayForm(res);								//The Node server will create a webpage using the server function
		break;
		case "POST":
			paymentService.acceptPost(req, res); 			//The Node server will receive a message using the receiver module
		break;
	}
}).listen(serverport);
console.log("server running on port " + serverport);		//the server is opened, ready for use
console.log("");

function displayForm(res){
	    fs.readFile(config.homepage, (err, data) => {
		res.end(data);										//The page is given to the user
	});
}