//Model
const CarListModel = require('../models/carSchema.model');

//Constants
const constants = require('../constants/constant.json');

// This function is used to fetch all cars list
const getCarList = async (req,res)=>{
        let filter
        let {limit = 10,skip = 0} = req.query // Use for pagination
        if(limit > 100 || skip > 100){
            return res.status(constants.statusCode.BAD_REQUEST).json({
                message:'Bad Request'
            })  
        }
        try {
            filter = req.query.filter ? JSON.parse(req.query.filter) : {}
        } catch (error) {
            return res.status(constants.statusCode.BAD_REQUEST).json({
                message:'Bad Request'
            })
        }
        let data
        try {
           data  = await CarListModel.find(filter).limit(limit).skip(skip).lean();
        } catch (error) {
            return res.status(constants.statusCode.INTERNAL_SERVER_ERROR).json({
                message: 'Something went wrong',
            });
        }
        
        if (data.length >= 1) {
            return res.status(constants.statusCode.SUCCESS).json({ count: data.length, data });
        } else {
            return res.status(constants.statusCode.NOT_FOUND).json({
                message: 'No Data Found',
            });
        }
}


// This function is used to add new cars to the carlist
const addCarDetails = async (req,res) =>{
    try{
        const {brand,name,fuelType,transmissionType,seatingCapacity,price,carImage,segment,carModelYear,isActive,fromDate,toDate,serviceCity,ownerId,overAllRating} = req.body;
        const insertCarDetails = await CarListModel.create({
            brand,name,fuelType,transmissionType,seatingCapacity,price,carImage,segment,carModelYear,isActive,fromDate,toDate,serviceCity,ownerId,overAllRating
        })
        res.status(constants.statusCode.SUCCESS).json({
            message:"Car Added Successfully",
            data:insertCarDetails
        })
    }catch(err){
        res.status(constants.statusCode.INTERNAL_SERVER_ERROR).json({
            message: constants.statusMessage.INTERNAL_SERVER_ERROR,
            data:{}
        })
    }
}


// This function is used to update the car details as requirement
const carUpdateById = async (req,res) =>{
    const {id} = req.params;
        let receviedFields = Object.keys(req.body);
        const existingFields = ["brand","name","fuelType","transmissionType","seatingCapacity","price","carImage","segment","carModelYear","isActive","fromDate","toDate","serviceCity","ownerType"];
        receviedFields = receviedFields.filter( r => existingFields.includes(r));
        let updateFields = {};
        receviedFields = receviedFields.filter(r=> req.body[r] && req.body[r] !== "")
        if(receviedFields.length === 0){
            res.status(constants.statusCode.BAD_REQUEST).json({
                message:constants.statusMessage.BAD_REQUEST
            }) 
        }
        receviedFields.forEach(val =>{
            updateFields[val] = req.body[val]
        })
    try{
        const updateCarDetails = await CarListModel.findByIdAndUpdate(id,{$set:updateFields},{new:true})
        return res.status(constants.statusCode.SUCCESS).json({
            message:"Car Updated successfully!",
            data:updateCarDetails
        })
    }catch(err){
        return res.status(constants.statusCode.INTERNAL_SERVER_ERROR).json({
            message: constants.statusMessage.INTERNAL_SERVER_ERROR,
            data:{}
        })
    }
}


// This function is used to delete a car from the car list
const deleteCarById = async (req,res) =>{
    try {
        const {id} = req.params;
        const deletedCar = await CarListModel.findOneAndDelete({_id:id});
        if (!deletedCar) {
            return res.status(constants.statusCode.NOT_FOUND).json({
                message: "Car not found"
            });
        }
        res.status(constants.statusCode.NO_CONTENT).json({
            message: "Car Deleted Successfully",
            data:deletedCar
        });
    } catch (error) {
        res.status(constants.statusCode.INTERNAL_SERVER_ERROR).json({
            message:constants.statusMessage.INTERNAL_SERVER_ERROR,
            data:{}
        })
    }
}

module.exports = {
    getCarList,
    addCarDetails,
    carUpdateById,
    deleteCarById
}