const express =require('express');
const {RegisterUser,LoginUser,userUpdateById,getUserById} =require('../controllers/user.controllers')

// creating cusotm route;
const UserRoute =express.Router();

UserRoute.post('/register',RegisterUser);
UserRoute.post('/login',LoginUser);
UserRoute.put('/:id',userUpdateById);
UserRoute.get('/user/:id',getUserById);

module.exports =UserRoute;