const  mongoose = require("mongoose")
const {Schema} = mongoose;

const bookCarSchema = new Schema({
    location: {
        type: String,
        require: true
    },
    pickUpDate: {
        type: String,
        require: true
    },
    dropDate: {
        type: String,
        require: true
    },
    returnInDiffrentLocation: {
        type: Boolean,
    },
    carType: {
        type: String,
        require: true
    },
    id:{
        type: String,
        require: true
    }
},{
    timestamps:true,
})
const bookCarModel = mongoose.model('bookRentalCar',bookCarSchema)
module.exports = bookCarModel