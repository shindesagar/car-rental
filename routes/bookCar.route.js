const express = require("express");
const { bookCar } = require("../controllers/bookCar.controller");

const bookCarRoute =  express.Router();
bookCarRoute.post('/bookCar/:id',bookCar)

module.exports = bookCarRoute;
