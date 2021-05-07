const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const logger = require('./middleware/logger.js');
const costValidator = require('./middleware/costValidator.js');
const connectDB = require('./config/db');
var bodyParser = require('body-parser'); 
const ejs = require('ejs');
const Course = require("./models/Course.js");
const cors = require("cors");
const request = require("request");
const path = require("path");

// load routes
const courses = require('./routes/courses.js');
const auth = require('./routes/auth');
const edit_user = require('./routes/edit_user');
const payment = require('./routes/payment');
const video = require('./routes/video');

// load env var 
dotenv.config({path: './config/config.env'}); 

// connect to databse
connectDB();


const app = express();
// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({origin: "*",credentials: true }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
})


// EJS
app.set('view engine', 'ejs');

// logger middleware
app.use(logger); 
// custom middleware 
app.use(costValidator);

app.use(express.static(path.join(__dirname, 'public')));
/*
app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'public/index.html'));
});
*/




// mount routers
app.use('/api/v1/courses',courses);
app.use('/api/v1/auth',auth);
app.use('/api/v1/edit_user',edit_user);
app.use('/api/payment',payment);
app.use('/api/content',video);


app.use(cookieParser());


app.get("/getArticles", async(req,res,next)=>{
	console.log("hello");
	let reqBody = {
		"action": "getArticles",
		"keyword": "Computer Science",
		"articlesPage": 1,
		"articlesCount": 3,
		"articlesSortBy": "date",
		"articlesSortByAsc": false,
		"articlesArticleBodyLen": -1,
		"resultType": "articles",
		"dataType": [
		  "news",
		  "pr"
		],
		"apiKey": "aa480589-e8e8-49a8-8ce4-41b5e7a5053e",
		"forceMaxDataTimeWindow": 31
	  };
	let test = await request.post({
		url : "http://eventregistry.org/api/v1/article/getArticles",
		body : reqBody,
		json: true
	},(err,response,body)=>{
		//console.log(body.articles.results);
		if(response.statusCode){
			//console.log(body.articles.results);
			res.status(200).json(body.articles.results);
		}
		
		//console.log(response.statusCode);
		
	
	});

	
});


app.post("/getOneArticle", async(req,res,next)=>{
	let uri = req.body.uri;
	console.log(uri);
	let reqBody = {
		"action": "getArticle",
		"articleUri": uri,
		"infoArticleBodyLen": -1,
		"resultType": "info",
		"apiKey": "aa480589-e8e8-49a8-8ce4-41b5e7a5053e"
	  };
	let test = await request.post({
		url : "http://eventregistry.org/api/v1/article/getArticle",
		body : reqBody,
		json: true
	},(err,response,body)=>{
		//console.log(body.articles.results);
		
		if(response.statusCode){
			//console.log(body[uri])
			//console.log(body.uri.info);
			res.status(200).json(body[uri].info);
		}
		
		//console.log(response.statusCode);
		
	
	});

	
});

app.get('/', (req, res) => res.render('index'));
const PORT = process.env.PORT;
const server = app.listen(
	PORT,
	console.log(`Server running on ${PORT}`)
);

// ejs exp4

app.get('/insert',(req,res)=>{
	res.render('insert');
});

app.get('/update/:id',(req,res)=>{

	Course.findById(req.params.id,(err,docs)=>{
		if(err){
			console.log(err);
		}else{
			res.render('update',docs);
		}
	});
	
});

//Handle unhandles promise rejections
process.on('unhandledRejection',(err,promise)=>{
	console.log(`Error: ${err.message}`);
	server.close(() => process.exit(1));
});
