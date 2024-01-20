const express =require('express');
const {
    RegisterUser,
    LoginUser,
    userUpdateById,
    getUserById,
    getAllUsers,
    getOwnerById,
    ownerUpdateById
} =require('../controllers/user.controllers')

// creating cusotm route;
const UserRoute =express.Router();

UserRoute.post('/register',RegisterUser);
UserRoute.post('/login',LoginUser);
UserRoute.put('/user/:id',userUpdateById);
UserRoute.get('/user/:id',getUserById);
UserRoute.get('/getAllUserList',getAllUsers)
UserRoute.get('/owners/:id',getOwnerById),
UserRoute.patch('/owners/:id',ownerUpdateById)
module.exports =UserRoute;