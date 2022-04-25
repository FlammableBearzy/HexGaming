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

router.get('/inPlay', async function(req, res, next){
    //let playerID = req.body.playerID;
    //let actionID = req.body.actionID;
    //let cooldownID = req.body.cooldownID;
    //console.log(`Updating Cooldowns. Player ${playerID} with action ${actionID} with cooldown ${cooldownID}`);
    let result = await aModel.getUpdateCooldown();
    res.status(result.status).send(result.result);
});

router.post('/inPlay', async function(req, res, next){
    let playerID = req.body.playerID;
    let actionID = req.body.actionID;
    let cooldownID = req.body.cooldownID;
    console.log(`Updating Cooldowns. Player ${playerID} with action ${actionID} with cooldown ${cooldownID}`);
    let result = await aModel.postUpdateCooldown(playerID, actionID, cooldownID);
    res.status(result.status).send(result.result);
});

module.exports = router;