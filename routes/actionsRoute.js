var express = require('express');
var router = express.Router();
var aModel = require("../models/actionsModel");

router('/', async function(req, res, next){
    console.log("Get all Movement Actions")
    let result = await aModel.getAllMoveActions();
    res.status(result.status).send(result.result);
});

router('/', async function(req, res, next){
    console.log("Get all Attack Actions")
    let result = await aModel.GetAllAttackActions();
    res.status(result.status).send(result.result);
});

module.exports = router;