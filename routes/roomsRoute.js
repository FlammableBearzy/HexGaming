var express = require('express');
var router = express.Router();
var rModel = require("../models/roomsModel");
var aut = require("../models/authenrication");


router.get('/', async function(req, res, next){
    let result = await rModel.getAllRooms();
    res.status(result.status).send(result.result);
});

/*router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    console.log("Get game with id "+id)
    let result = await rModel.getGameByID(id);
    res.status(result.status).send(result.result);
});*/

router.post('/:id/plays', async function(req, res, next) {
    let playerID = req.signedCookies.userId;
    let parselID = req.body.parselID;
    let direction = req.body.direction;
    console.log(`Played ${playerID} on parsel ${parselID} on the room with id ${id}`);
    let result = await rModel.play(playerID, parselID, direction);
    res.status(result.status).send(result.result);
});
router.post('/turnChanger', async function(req,res, next){
    let id = req.body.id;
    console.log("We are sending: "+id);
    let result = await rModel.turnChanger(id);
    res.status(result.status).send(result.result);
});
router.get('/getTurn', async function(req,res, next){
    id = 20;//req.signedCookies.roomId;
    console.log("We are sending: "+id);
    let result = await rModel.getTurns(id);
    res.status(result.status).send(result.result);
});

router.post('/enqueue', async function(req,res, next){
    let id = req.signedCookies.userId;
    console.log("We are sending: "+id);
    let result = await rModel.queueJoiner(id);
    res.status(result.status).send(result.msg);
});

router.post('/matchMaking', async function(req,res, next){
    let id = req.signedCookies.userId;
    console.log("We are sending: "+id);
    let result = await rModel.matchMaking();
    res.sendStatus(result.status);
});
router.get('/getRoomById', async function(req, res, next) {
    let id = 9;
    console.log("Get game with id "+id)

    let result = await rModel.getRoomById(id);
    console.log(result.result);
    if(result.result.rowCount > 0)
    aut.saveRoomId(res,result.result.rows[0].room_id);
    res.status(result.status).send(result.result);
});


module.exports = router;

