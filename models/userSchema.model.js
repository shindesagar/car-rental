const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserdetailSchema = new Schema({
    userName:{
        require:true,
        type: String,
        unique:true
    },
    email:{
        require:true,
        type: String,
        unique:true
    },
    password:{
        require:true,
        type: String,
    },
    dob:{
        require:true,
        type: String,
    },
    aadharNumber:{
        type: String,
        unique:true,
        sparse:true,
    },
    passportNumber:{
        type: String,
        unique:true,
        sparse:true,
    },
    drivingLicenceNo:{
        type: String,
        require:true,
        unique:true
    },
    role:{
        type: [{
            type: String,
            enum: ['customer', 'owner', 'admin'], // Specify the enum values
            default: ['customer'],
        }],
        require:true,
    },
    mobileNo:{
        type: String,
        require:true,
    }
},{
    timestamps:true
});

const UserModel = mongoose.model('carRentalUsers', UserdetailSchema);
module.exports = UserModel;