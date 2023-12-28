const jwt = require("jsonwebtoken");
async function jwtHandler(req,res,next){
    const token = req.header('Authorization');
    console.log(token,'Token Here');
    if(!token){
        return res.status(401).json({
            message:'Unautorized: no token provided'
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRETKEY);
        req.userId = decoded.data;
        next();
    }catch(err){
        return res.status(404).json({
            message:"Something went wrong with tokens"
        })
    }
}

module.exports=jwtHandler;