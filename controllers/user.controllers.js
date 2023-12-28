const UserModel = require('../models/userSchema.model');
const bcryptPassword = require('../utils/bcryptPassword');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RegisterUser = async (req,res)=>{
    
    try{
        const { userName, email, password, dob, aadharNumber, passportNumber,drivingLicenceNo, role, mobileNo} = req.body;
        //Validation
        const validArray= [userName, email, password,dob,drivingLicenceNo, role, mobileNo]
        if(validArray.includes('')){
            return res.status(400).json({
                message: 'invalid request'
            })
        }
        if(!validArray.every(value => value)){
            return res.status(400).json({
                message: 'Missing input value'
            })
        }
        const hashedPassword = await bcryptPassword(password);
        const insertData = await UserModel.create({
            userName, email, password:hashedPassword, dob, aadharNumber, passportNumber,drivingLicenceNo,role,mobileNo
        })
        res.json({
            message:" Registered user successfully",
            insertData
        })
    }catch(error){
        console.log(error.message);
        res.json({
            message: error.message
        })
    }
}

const LoginUser = async (req,res)=>{
    const {email, password, userName } = req.body;
    if(!email || !password || !userName){
        return res.json({
            message: "Please enter all your credentials"
        })
    }
    const ifUser = await UserModel.findOne({email:email}).lean();
    console.log(ifUser);
    if(!ifUser){
        return res.json({
            message: `User with this ${email} is not found !`
        })
    }
    const ismatchedPassword = await bcrypt.compare(password,ifUser.password);
    if(ismatchedPassword){
        const token = jwt.sign({
            data: ifUser._id
        },process.env.JWT_SECRETKEY, { expiresIn: '1h' })
        return res.json({
            message: 'User is logged in',
            token
        })
    }
    res.json({
        message: `User is not able to login due to the wrong password`
    })
}

const userUpdateById = async(req,res)=>{
    const {id} = req.params;
    const {username,drivingLicenceNo} = req.body
    const userUpdate = await UserModel.findByIdAndUpdate(id,{username:username,drivingLicenceNo:drivingLicenceNo},{new:true});
    res.json({
        message:"User Updated Successfully",
        userUpdate
    })
}

const getUserById = async(req,res) =>{
    try {
        const {id} = req.params;
        const getUserInfo = await UserModel.findOne({id:id});
        console.log(getUserInfo);
        // res.status(200).json({
        //     message:'User detail fetch successfull',
        //     getUserInfo
        // })
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
    
}
module.exports={
    RegisterUser,
    LoginUser,
    userUpdateById,
    getUserById
};