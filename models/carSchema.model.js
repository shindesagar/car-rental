const mongoose = require("mongoose");
const {Schema} = mongoose;

const CarListSchema = new Schema({
    brand:{
        type: String,
        require:true,
    },
    name:{
        type: String,
        require:true,
    },
    fuelType:{
        type: String,
        require:true,
    },
    transmissionType:{
        type: String, //Manual/automatic
        require:true,
    },
    seatingCapacity:{
        type: String,
        require:true,
    },
    price:{
        type: Number,
        require:true,
    },
    carImage:{
        type:String
    },
    segment:{
        type:String
    },
    carModelYear:{
        type:String
    },
    isActive:{
        type:Boolean
    },
    fromDate:{
        type:String
    },
    toDate:{
        type:String
    },
    serviceCity:{
        type:String
    },
    ownerId:{
        type: String,
        require:true,
    },
    overAllRating:{
        type:Number,
    }
},{
    timestamps:true,
    versionKey:false
})

const CarListModel = mongoose.model('carsList',CarListSchema);
module.exports = CarListModel;