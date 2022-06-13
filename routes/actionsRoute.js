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
router.post('/plays', async function(req, res, next) {
    
    let direction = req.body.direction;
    let cookies = req.body.cookie
    let id = cookies.userId;
    let result = await aModel.play(id, direction);
    res.status(result.status).send(result.result);
});
router.get('/:id/inPlay', async function(req, res, next){
    let id = req.params.id;
    console.log(`Get the player with id ${id} so we can update its cards`);
    let result = await aModel.getAttackInGameByPlayer(id);
    res.status(result.status).send(result.result);
});

router.get('/parcels', async function(req, res, next){
    console.log("In parcels");
    let id = req.signedCookies.roomId;
    let result = await aModel.getParcels(id);
    res.status(result.status).send(result.result);
});

router.post('/:id/inPlay', async function(req, res, next){
    let id = req.params.id;
    let actionID = req.body.actionID;
    let cooldownID = req.body.cooldownID;
    console.log(`Updating Cooldowns. Player ${id} with action ${actionID} with cooldown ${cooldownID}`);
    let result = await aModel.postUpdateCooldownByPlayer(id, actionID, cooldownID);
    res.status(result.status).send(result.result);
});


router.post('/:id/ResetCooldowns', async function(req, res, next){
    let id = req.params.id;
    console.log(`ResetCooldowns. Player ${id} will reset the actions of the player`);
    let result = await aModel.postResetActions(id);
    res.status(result.status).send(result.result);
});

router.post('/:id/PlaceTraps', async function(req, res, next)
{
    let id = req.params.id;
    let roomID = req.body.roomID;
    let attackID = req.body.attackID;
    let parcelID = req.body.parcelID;
    console.log(`The player ${id} in the game ${roomID} is placing the trap ${attackID} on the parsel ${parcelID}`);
    let result = await aModel.postTrapPlacing(id, roomID, attackID, parcelID);
    res.status(result.status).send(result.result)
})

router.post('/id/RemoveTraps'), async function(req, res, next)
{
    let id = req.params.id;
    let roomID = req.body.roomID;
    let attackID = req.body.attackID;
    let parcelID = req.body.parcelID;
    console.log(`The player ${id} in the game ${roomID} is placing the trap ${attackID} on the parsel ${parcelID}`);
    let result = await aModel.postTrapRemoving(id, roomID, attackID, parcelID);
    res.status(result.status).send(result.result)
}
module.exports = router;