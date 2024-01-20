const express = require('express');
const { customerFeedBack,getFeedBackByCarId } = require('../controllers/feedBack.controller');

const FeedBackRoute = express.Router();
FeedBackRoute.post('/create',customerFeedBack);
FeedBackRoute.get('/getCommentById',getFeedBackByCarId)

module.exports = FeedBackRoute;