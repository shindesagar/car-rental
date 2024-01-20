const express = require('express');
const mongoose = require('mongoose');
const port = 4100;
require('dotenv').config();
const app = express();
app.use(express.json());

app.get("/", function(req,res){
    res.send("Car Rental App");
});

async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
    }catch(error){
        console.log(error.message);
    }
}
connectToDB();

const UserRoute = require("./routes/user.route");
const CarListRoute = require("./routes/carList.route");
const bookCarRoute = require("./routes/bookCar.route");
const FeedBackRoute = require("./routes/feedback.route");
const TransactionRoute = require("./routes/transaction.route");
app.use('/user-ms',UserRoute);
app.use('/car',CarListRoute);
app.use('/car',bookCarRoute);
app.use('/comment-ms',FeedBackRoute);
app.use('/payment-ms',TransactionRoute)
app.use('*',(req,res,next)=>{
    const error = new Error('The route does not exit')
    next(error)
})
  app.use((err,req,res)=>{
    res.status(404).json({
      message: err.message
    })
  })

app.listen(port, ()=>{
    console.log("Server is running port number",port);
})