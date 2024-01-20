const transactionModel = require('../models/transactionSchema.model');
const CarListModel = require('../models/carSchema.model');

//Constant
const constants = require('../constants/constant.json');

const carRentalTransaction = async(req,res)=>{
    try{
        const {customerId,carId,startDate,endDate,paymentAmount,owernId} = req.body;

        //Checking avability for given car schedule.
        const availableSchedule = await transactionModel.countDocuments({
            carId, 
            startDate:{$gte:startDate},
            endDate:{$lte:endDate},
        })
        if(availableSchedule > 0){
            return res.status(constants.statusCode.NOT_FOUND).json({
                message:"Car is already booked"
            })
        }
        // Since car has no booking given time shedule, confirming the booking.
        const transactionsDetails = await transactionModel.create({
            customerId,carId,startDate,endDate,paymentAmount,owernId
        });

        // just to confirm that car have atleast one boooking.
        await CarListModel.findByIdAndUpdate(carId,{
            $set:{isActive:true}
        })
        res.status(constants.statusCode.SUCCESS).json({
            message:"test",
            data:transactionsDetails
        })
    }catch(err){
        res.status(constants.statusCode.INTERNAL_SERVER_ERROR).json({
            message:err.message,
            data:{}
        })
    }
    
}

const carRentalTransactionById = async(req,res)=>{
    try{
        const {id} = req.params;
        const getTransactionDetailsById = await transactionModel.findOne({_id:id}).lean();
        res.status(constants.statusCode.SUCCESS).json({
            message:"Fetch transaction details successfully",
            data:getTransactionDetailsById
        })
    }catch(err){
        res.status(constants.statusCode.INTERNAL_SERVER_ERROR).json({
            message:constants.statusMessage.INTERNAL_SERVER_ERROR,
            data:{}
        })
    }
    
}

module.exports ={
    carRentalTransaction,
    carRentalTransactionById  
}