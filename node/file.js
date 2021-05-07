var fs = require("fs");
const readline = require('readline');

const fileContent = fs.readFileSync("read.txt").toString();
console.log("next line...");
console.log(fileContent);
/*
fs.readFile("read.txt","utf8",(err,data)=>{
	console.log(data);
});
*/


fs.writeFile("read.txt","Some Random Text",(err)=>{
	if(err){
		console.log(err);
	}
})

function canWrite(path, callback) {
	fs.access(path, fs.W_OK, function(err) {
	  callback(null, !err);
	});
}
  
canWrite('./read.txt', function(err, isWritable) {
	//console.log(isWritable); // true or false
	if(isWritable){
		fs.writeFile("read.txt","Inside canWrite...",(err)=>{
			if(err){
				console.log(err);
			}
		});
	}
});

path = './read.txt';
if(fs.existsSync(path)){
	console.log(fs.lstatSync(path).isDirectory());
	console.log(fs.lstatSync(path).isFile());
}

const file = readline.createInterface({
    input: fs.createReadStream('readme.txt'),
    output: process.stdout,
    terminal: false
});
/*
file.on('line', (line) => {
    console.log(line);
});
*/


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is your name ? ", function(name) {
    rl.question("Where do you live ? ", function(country) {
        console.log(`${name}, is a citizen of ${country}`);
        rl.close();
    });
});

rl.on("close", function() {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});