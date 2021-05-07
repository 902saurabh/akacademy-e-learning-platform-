const http = require('http');
const hostname = "127.0.0.1";
const port = 3000;

const todos = [
	{id: 1 ,text: 'Todo One'},
	{id: 2 ,text: 'Todo Two'},
	{id: 3 ,text: 'Todo Three'}
	
]

const server = http.createServer((req,res)=>{
	const {headers,url,method} = req;
	//console.log(headers,url,method);
	
	//res.setHeader("Content-Type","text/plain");
	//res.write("Hello World");
	//res.write("<h1>Hello World</h1>"); 

	let body = [];

	req.on('data',chunk => {
		body.push(chunk);
	
	}).on('end',()=>{
		body = Buffer.concat(body).toString();

		let status = 404;
		const response = {
			success : false,
			data : null,
			error: null
		}

		if(method=='GET' && url =='/akacademy'){
			status = 200;
			response.success = true;
			response.data = todos;
		
		}else if( method === 'POST' && url == '/akacademy'){
			const {id,text} = JSON.parse(body);

			if(!id || !text){
				status = 400;
				response.error = "Something Went Wrong";
			}else{

				todos.push({id,text});
				status = 201;
				response.success = true;
				response.data = todos;
			}

			
		}

		res.statusCode = status;
		res.setHeader("Content-Type","application/json");

		res.end(
		JSON.stringify(response)
	);
		console.log(body);
	})


});

server.listen(port,hostname,()=>{
	console.log(`Server is running at http://${hostname}:${port}`);
});

