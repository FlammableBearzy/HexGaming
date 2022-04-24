var express = require('express');
var router = express.Router();
var rModel = require("../models/roomsModel");


router.get('/', async function(req, res, next){
    let result = await rModel.getAllRooms();
    res.status(result.status).send(result.result);
});

router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    console.log("Get game with id "+id)
    let result = await rModel.getGameByID(id);
    res.status(result.status).send(result.result);
});

router.post('/:id/plays', async function(req, res, next) {
    let id = req.params.id;
    let playerID = req.body.playerID;
    let parselID = req.body.parselID;
    let direction = req.body.direction;
    console.log(`Played ${playerID} on parsel ${parselID} on the room with id ${id}`);
    let result = await rModel.play(id, playerID, parselID, direction);
    res.status(result.status).send(result.result);
});

module.exports = router;

