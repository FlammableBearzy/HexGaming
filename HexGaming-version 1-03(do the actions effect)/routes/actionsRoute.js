var express = require('express');
var router = express.Router();
var aModel = require("../models/actionsModel");

router.get('/', async function(req, res, next){
    console.log("Get all Attack Actions")
    let result = await aModel.getAllAttackActions();
    res.status(result.status).send(result.result);
});

router.get('/', async function(req, res, next){
    console.log("Get all Movement Actions")
    let result = await aModel.getAllMoveActions();
    res.status(result.status).send(result.result);
});


module.exports = router;