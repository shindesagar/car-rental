const bookCarModel = require("../models/bookCarSchema.model");
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
        res.status(200).json({
            message: "Booked car successfully",
            bookData
        })
        
    } catch (error) {
        res.status(404).json({
            message: error.message,
        })
    }
}

module.exports ={
    bookCar
}