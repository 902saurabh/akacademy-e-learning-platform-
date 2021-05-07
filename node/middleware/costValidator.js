const cost = (req,res,next) => {

    if(req.method == "POST" && req.originalUrl == '/api/v1/courses'){
        if(typeof req.body.cost == 'number'){
            console.log(`Cost is of type Number`);
        }else{
            console.log(`Cost is of type ${typeof req.body.cost}`);
            console.log("Converting...");
            //req.body.cost = req.body.cost.toString();
        }
    }
    
    next();
};

module.exports = cost;