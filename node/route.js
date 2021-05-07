const express = require('express');
const app = express();

// GET Method

app.post('/',(req,res)=>{
	res.send('GET Works!');
});

app.listen(9000,(req,res)=>{
	console.log("Running...");
});

app.use(express.static('public'));
