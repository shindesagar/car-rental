const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
    customerId:{
        type:mongoose.Schema.ObjectId,
        ref: 'carRentalUsers',
        require: true
    },
    carId:{
        type: mongoose.Schema.ObjectId,
        ref:'carsList',
        require: true
    },
    startDate:{
        type: String,
        require: true
    },
    endDate:{
        type: String,
        require: true
    },
    paymentAmount:{
        type: Number,
        require: true
    },
    transactionId:{
        type: String
    },
    owernId:{
        type: mongoose.Schema.ObjectId,
        refer:'carRentalUsers',
        require: true
    }
},{
    timestamps:true,
    versionKey:false
})
const transactionModel = mongoose.model('transactionDetails',transactionSchema);
module.exports = transactionModel
