/**
 * FaceBook Likes
   Bike4Beds
 */



var facebook_client = my_http.createClient(80, "graph.facebook.com");
var facebook_emitter = new events.EventEmitter();	
function get_data() {
	var request = facebook_client.request("GET", "/19292868552", {"host": "graph.facebook.com"});
	request.addListener("response", function(response) {
		var body = "";
		response.addListener("data", function(data) {
			body += data;
		});

		response.addListener("end", function() {
			var data = JSON.parse(body);
			facebook_emitter.emit("data", String(data.likes));
		});
	});
	request.end();
}

//look up http node request 


var http = require('http');

//The url we want is `www.nodejitsu.com:1337/`
var options = {
  host: 'www.nodejitsu.com',
  path: '/',
  //since we are listening on a custom port, we need to specify it by hand
  port: '1337',
  //This is what changes the request to a POST request
  method: 'GET'
};

//take the response object in index.jade


callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

http.request(options, callback);
//This is the data we are posting, it needs to be a string or a buffer
req.write("hello world!");
req.end();






------

my_http.createServer(function(request,response){
	var my_path = url.parse(request.url).pathname;
	    if(my_path === "/getdata") {
			var listener = facebook_emitter.once("data", function(data) {
				response.writeHeader(200, { "Content-Type" : "text/plain" });
	    		response.write(data);
	    		response.end();
			});
		}
	    else {
	    	load_file(my_path,response);
	    }
}).listen(8080);
setInterval(get_data,1000);
sys.puts("Server Running on 8080");
