var express = require('express');
var router = express.Router();
var aModel = require("../models/actionsModel");

router('/', async function(req, res, next){
    console.log("Get all actions")
    let result = await aModel.getAllActions();
    res.status(result.status).send(result.result);
});

module.exports = router;