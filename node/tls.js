var tls = require('tls')
var	fs = require('fs')

// Port and host address for server	 
PORT = 1337, 
HOST = '127.0.0.1', 
value = null; 

// Private key and public certificate for acess 
var options = { 
key: fs.readFileSync('private-key.pem'), 
cert: fs.readFileSync('public-cert.pem'), 
rejectUnauthorized: false
}; 

// Creating and intializing server 
var server = tls.createServer(options, function(socket) { 

// Print the data that we received 
socket.on('data', function(data) { 

	console.log('\nReceived: %s ', 
	data.toString().replace(/(\n)/gm, "")); 
}); 

// Getting the bound address of the socket 
// by using tlsSocket.address() method 
value = socket.address(); 
console.log("Address : " + value.address); 

// Stopping the server 
// by using the close() method 
server.close(); 
}); 

// Close event 
server.on('close', () => { 
	console.log("Server closed successfully"); 
}) 

// Start listening on a specific port and address 
// by using listen() method 
server.listen(PORT, HOST, function() { 
console.log("I'm listening at %s, on port %s", HOST, PORT); 
}); 

// Creating and intializing client 
var client = tls.connect(PORT, HOST, options, function() { 
	
// Getting the bound address 
// by using address method 
const value = client.address(); 
client.write("Bound address : " + value.family) 
client.end(); 
});
