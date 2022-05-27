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


router.post('/turnChanger', async function(req,res, next){
    console.log("I'm in turn changer!");
    
    let roomId = req.signedCookies.roomId;

    console.log("We are sending: "+id);
    let result = await rModel.turnChanger(roomId);
    res.status(result.status).send(result.result);
});

router.get('/getTurn', async function(req,res, next){
    id = req.signedCookies.roomId;
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
    let id = req.signedCookies.userId;
    console.log("Get game with id "+id)

    let result = await rModel.getRoomById(id);
    if(result.result.rowCount > 0)
    aut.saveRoomId(res,result.result.rows[0].room_id);
    res.status(result.status).send(result.result);
});


module.exports = router;

