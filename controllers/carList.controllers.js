const CarListModel = require('../models/carSchema.model');
const constants = require('../constants/constant.json')
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
            return res.json({
                message: 'No Data Found',
            });
        }
   
}
const addCarDetails = async (req,res) =>{
    try{
        const {brand,name,fuleType,transmissionType,seatingCapacity,price,carImage,segment,carModelYear,isActive,fromDate,toDate,serviceCity,ownerType} = req.body;
        const insertCarDetails = await CarListModel.create({
            brand,name,fuleType,transmissionType,seatingCapacity,price,carImage,segment,carModelYear,isActive,fromDate,toDate,serviceCity,ownerType
        })
        res.json({
            message:"Car Added Successfully",
            insertCarDetails
        })
    }catch(err){
        res.json({
            message: err.message
        })
    }
}
const carUpdateById = async (req,res) =>{
    
        const {id} = req.params;
        let receviedFields = Object.keys(req.body);
        const existingFields = ["brand","name","fuelType","transmissionType","seatingCapacity","price","carImage","segment","carModelYear","isActive","fromDate","toDate","serviceCity","ownerType"];
        receviedFields = receviedFields.map( r => existingFields.includes(r));
        let updateFields;
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
        const updateCarDetails = await CarListModel.findByIdAndUpdate(id,{$set:receviedFields},{new:true})
        
        return res.status(constants.statusCode.SUCCESS).json({
            message:"Car Updated successfully!",
            updateCarDetails
        })
    }catch(err){
        return res.status(constants.statusCode.INTERNAL_SERVER_ERROR).json({
            message:err.message
        })
    }
}

const deleteCarById = async (req,res) =>{
    try {
        const {id} = req.params;
        const deletedCar = await CarListModel.findOneAndDelete({_id:id});
        if (!deletedCar) {
            return res.status(404).json({
                message: "Car not found"
            });
        }
        res.status(201).json({
            message: "Car Deleted Successfully",
            deletedCar
        });
    } catch (error) {
        res.status(404).json({
            message:error.message
        })
    }
}

module.exports = {
    getCarList,
    addCarDetails,
    carUpdateById,
    deleteCarById
}