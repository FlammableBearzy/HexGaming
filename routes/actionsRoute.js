var express = require('express');
var router = express.Router();
var aModel = require("../models/actionsModel");

router.get('/', async function(req, res, next){
    console.log("Get all Attack Actions")
    let result = await aModel.getAllAttackActions();
    let result2 = await aModel.getAllMoveActions();
    if(result.status == result2.status)
    res.status([result.status]).send([result.result , result2.result]);
    else
    console.log("Status1: " + result.status + " Status2: " + result2.status);
});

/*
router.post('/:id/move', async function(req, res, next){
    let id =    
    console.log.apply("Post all Movement Actions")
    let result = await aModel.getAllMoveActions();
    res.status(result.status).send(result.result);
});
*/

module.exports = router;