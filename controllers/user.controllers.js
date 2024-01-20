//Third Party
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Model
const UserModel = require('../models/userSchema.model');

//Utils
const bcryptPassword = require('../utils/bcryptPassword');

//Constant
const constants = require('../constants/constant.json');

//This function is used for application or website signup
const RegisterUser = async (req,res)=>{
    
    try{
        const { userName, email, password, dob, aadharNumber, passportNumber,drivingLicenceNo, role=["customer"], mobileNo} = req.body;
        //Validation
        const validArray= [userName, email, password,dob,drivingLicenceNo, role,mobileNo];
        if(role.length > 0 && role.includes("admin")){
            return res.status(constants.statusCode.BAD_REQUEST).json({
                message: 'Admin creation not allowed',
                data:{}
            }) 
        }
        if(validArray.includes('')){
            return res.status(constants.statusCode.BAD_REQUEST).json({
                message: 'invalid request',
                data:{}
            })
        }
        if(!validArray.every(value => value)){
            return res.status(constants.statusCode.BAD_REQUEST).json({
                message: 'Missing input value',
                data:{}
            })
        }
        const hashedPassword = await bcryptPassword(password);
        const insertData = await UserModel.create({
            userName, email, password:hashedPassword, dob, aadharNumber, passportNumber,drivingLicenceNo,role,mobileNo
        })
        res.status(constants.statusCode.SUCCESS).json({
            message:" Registered user successfully",
            data:insertData
        })
    }catch(error){
        res.status(constants.statusCode.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            data:{}
        })
    }
}
//This function is used for application or website signin
const LoginUser = async (req,res)=>{
    const {email, password, userName } = req.body;
    if(!email || !password || !userName){
        return res.status(constants.statusCode.BAD_REQUEST).json({
            message: "Please enter all your credentials"
        })
    }
    const ifUser = await UserModel.findOne({email:email}).lean();
    if(!ifUser){
        return res.status(constants.statusCode.BAD_REQUEST).json({
            message: `User with this ${email} is not found !`
        })
    }
    const ismatchedPassword = await bcrypt.compare(password,ifUser.password);
    if(ismatchedPassword){
        const token = jwt.sign({
            data: ifUser._id
        },process.env.JWT_SECRETKEY, { expiresIn: '1h' })
        return res.status(constants.statusCode.SUCCESS).json({
            message: 'User is logged in',
            token
        })
    }
    res.json({
        message: `User is not able to login due to the wrong password`
    })
}

const getUserId = async(id,username,drivingLicenceNo,role) =>{
    try{
        const userUpdate = await UserModel.findByIdAndUpdate(id,{$set:{username:username,drivingLicenceNo:drivingLicenceNo,role}}).lean()
        return userUpdate
    }catch (error) {
        throw new Error(
            error 
        )
    }
}

//This function is used to update the user details as requirement
const userUpdateById = async(req,res)=>{
    try {
        const {id} = req.params;
        const {username,drivingLicenceNo,role} = req.body
        if(!id || id == ''){
            return res.status(constants.statusCode.BAD_REQUEST).json({
                message: constants.statusMessage.BAD_REQUEST,
                data:{}
            })
        }
        const userUpdate = await getUserId(id,username,drivingLicenceNo,role);
        res.status(constants.statusCode.SUCCESS).json({
            message:"User Updated Successfully",
            data:userUpdate
        }) 
    } catch (error) {
        res.status(constants.statusCode.INTERNAL_SERVER_ERROR).json({
            message: constants.statusMessage.INTERNAL_SERVER_ERROR,
            data:{}
        })
    }
    
}
//This function is used to update the owner details as requirement
const ownerUpdateById = async(req,res)=>{
    try {
        const {id} = req.params;
        const {username,drivingLicenceNo,role} = req.body
        if(!id || id == ''){
            return res.status(constants.statusCode.BAD_REQUEST).json({
                message: constants.statusMessage.BAD_REQUEST,
                data:{}
            })
        }
        const ownerUpdate = await getUserId(id,username,drivingLicenceNo,role);
        if(!ownerUpdate){
            return res.status(constants.statusCode.BAD_REQUEST).json({
                message: constants.statusMessage.BAD_REQUEST,
                data:{}
            })
        }
        if(ownerUpdate.includes("owner")){
            return res.status(constants.statusCode.SUCCESS).json({
                message:"Owner Details Updated Successfully",
                data:ownerUpdate
            }) 
        }else{
            return res.status(constants.statusCode.NOT_FOUND).json({
                message:constants.statusMessage.NOT_FOUND,
                data:{}
            })  
        }
       
    } catch (error) {
        res.status(constants.statusCode.INTERNAL_SERVER_ERROR).json({
            message: constants.statusMessage.INTERNAL_SERVER_ERROR,
            data:{}
        })
    }
    
}


//This function is a common function used in getOwnerById and getUserById
const getUser = async(id) =>{
    try{
        const getUserInfo = await UserModel.findOne({_id:id}).lean();
        return getUserInfo
    }catch (error) {
        throw new Error(
            error 
        )
    }
}


const getUserById = async(req,res) =>{
    try {
        const {id} = req.params;
        if(!id || id ==''){
            return res.status(constants.statusCode.BAD_REQUEST).json({
                message:'Bad Request'
            })
        }
        const getUserInfo = await getUser(id);
        res.status(constants.statusCode.SUCCESS).json({
            message:'User detail fetch successfull',
            getUserInfo
        })
    } catch (error) {
        res.status(constants.statusCode.INTERNAL_SERVER_ERROR).json({
            message: constants.statusMessage.INTERNAL_SERVER_ERROR
        })
    }
}

const getAllUsers = async (req,res)=>{
    let filter;
    try{
        filter = req.query.filter ? JSON.parse(req.query.filter) : {}
        const allUsers = await UserModel.find(filter).lean();
        res.status(constants.statusCode.SUCCESS).json({
            message:"Fetch all users successfully",
            data:allUsers
        })
    }catch(err){
        return res.status(constants.statusCode.BAD_REQUEST).json({
            message:'Bad Request',
            data:{}
        })
    }
}
//Get owner details
const getOwnerById = async (req,res) =>{
    try {
        const {id} = req.params;
        if(!id || id == ''){
            return res.status(constants.statusCode.BAD_REQUEST).json({
                message: constants.statusMessage.BAD_REQUEST
            })
        }
        const ownerInfo = await getUser(id);
        if(!ownerInfo){
            return res.status(constants.statusCode.BAD_REQUEST).json({
                message: constants.statusMessage.BAD_REQUEST
            })
        }
        if(ownerInfo.role.includes('owner')){
            return res.status(constants.statusCode.SUCCESS).json({
                message:constants.statusMessage.SUCCESS,
                data: ownerInfo
            })
        }else{
            return res.status(constants.statusCode.NOT_FOUND).json({
                message:constants.statusMessage.NOT_FOUND,
                data:{}
            })
        }
    } catch (error) {
        return res.status(constants.statusCode.INTERNAL_SERVER_ERROR).json({
            message:constants.statusMessage.INTERNAL_SERVER_ERROR,
            data:{}
        })
    }
}

module.exports={
    RegisterUser,
    LoginUser,
    userUpdateById,
    getUserById,
    getAllUsers,
    getOwnerById,
    ownerUpdateById
};