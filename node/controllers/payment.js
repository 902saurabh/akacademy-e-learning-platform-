var razorpay=require("razorpay");
const dotenv = require('dotenv');

dotenv.config({path: './../config/config.env'}); 


let instance = new razorpay({
	key_id : "rzp_test_IR4ybwAOzsDOpn",
	key_secret : "Gd90qQUQZfJcKUkHayJczlM9"
});



exports.order = (req,res) => {
    params=req.body;
    instance.orders.create(params).then((data) => {
       res.send({"sub":data,"status":"success"});
    }).catch((error) => {
       res.send({"sub":error,"status":"failed"});
    })
}