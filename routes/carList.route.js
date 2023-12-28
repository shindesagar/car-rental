const express = require('express');
const { getCarList,addCarDetails,carUpdateById,deleteCarById } = require('../controllers/carList.controllers');

const CarListRoute = express.Router();

CarListRoute.get('/getCarList',getCarList);
CarListRoute.post('/add',addCarDetails);
CarListRoute.post('/:id',carUpdateById);
CarListRoute.delete('/:id',deleteCarById);

module.exports =CarListRoute;
