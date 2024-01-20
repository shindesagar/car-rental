//Model
const bookCarModel = require("../models/bookCarSchema.model");
//Constant
const constants = require('../constants/constant.json');

//This function is used for car booking
const bookCar = async (req,res)=>{
    try {
        const {_id} = req.params;
        // eslint-disable-next-line no-unused-vars
        const { location,pickUpDate,dropDate,returnInDiffrentLocation,carType,id} = req.body
        const bookData = await bookCarModel.create({
            location:location,
            pickUpDate:pickUpDate,
            dropDate:dropDate,
            returnInDiffrentLocation:returnInDiffrentLocation,
            carType:carType,
            id:_id
        });
        res.status(constants.statusCode.SUCCESS).json({
            message: "Booked car successfully",
            data:bookData
        })
        
    } catch (error) {
        res.status(constants.statusCode.INTERNAL_SERVER_ERROR).json({
            message:constants.statusMessage.INTERNAL_SERVER_ERROR,
            data:{}
        })
    }
}

module.exports ={
    bookCar
}