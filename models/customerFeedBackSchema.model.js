const mongoose = require("mongoose");
const {Schema} = mongoose;

const CustomerFeedBackSchema = new Schema({
    customerId:{
        type:String,
        require: true,
    },
    ownerId:{
        type:String,
        require: true,
    },
    carId:{
        type: String,
        require:true
    },
    rating:{
        valueForMoney:{
            type:Number
        },
        pickupAndDropExperince:{
           type:Number
        },
        cleanliness:{
            type:Number
        },
        drivability:{
            type:Number
        },
        hostResponsivness:{
            type:Number
        }
    },
    overAllRating:{
        type:Number,
        require:true
    },
    comment:{
        type: String
    }

},{
    timestamps:true
})

const customerFeedBackModel = mongoose.model('CustomerFeedBack',CustomerFeedBackSchema);
module.exports = customerFeedBackModel

