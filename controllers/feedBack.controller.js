//Model
const customerFeedBackModel = require("../models/customerFeedBackSchema.model");
//Constant
const constants = require("../constants/constant.json");

// This function is used to add feedback for the corresponding car
const customerFeedBack = async (req,res)=>{
    const {customerId,ownerId,carId,comment,rating: { valueForMoney,pickupAndDropExperince,cleanliness,drivability,hostResponsivness },overAllRating} = req.body;
    try{
        const setComment = await customerFeedBackModel.create({
            customerId,ownerId,carId,comment,rating: { valueForMoney,pickupAndDropExperince,cleanliness,drivability,hostResponsivness },overAllRating
        })
        res.status(constants.statusCode.SUCCESS).json({
            message:"Comment added successfully",
            data:setComment
        })
    }catch(err){
        res.status(constants.statusCode.BAD_REQUEST).json({
            message:constants.statusMessage.BAD_REQUEST,
            data:{}
        })
    }
    
}

//This function is used to get feedback for the corresponding car
const getFeedBackByCarId= async (req,res)=>{
    let filter;
    try{
        filter = req.query.filter ? JSON.parse(req.query.filter) : {}
        const getFeedBackByCarId = await customerFeedBackModel.find(filter).lean();
        if(getFeedBackByCarId.length == 0){
            return res.status(constants.statusCode.NOT_FOUND).json({
                message:constants.statusMessage.NOT_FOUND
            })
        }
        res.status(constants.statusCode.SUCCESS).json({
            message:"Fetch all comment successfully",
            data:getFeedBackByCarId
        })
    }catch(err){
        return res.status(constants.statusCode.BAD_REQUEST).json({
            message:'Bad Request',
            data:{}
        })
    }
}
module.exports = {
    customerFeedBack,
    getFeedBackByCarId
}