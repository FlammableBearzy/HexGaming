var express = require('express');
var router = express.Router();
var lModel = require("../models/loginModel");
var aut = require("../models/authenrication");
const { signedCookie } = require('cookie-parser');



router.post('/', async function(req, res, next){
    
    let user = req.body.username;
    let pass = req.body.password;
    let result = await lModel.login(user, pass);
    if(result.status == 200)
    {
        aut.logout(res);
        console.log(signedCookie);
        aut.saveUserId(res,result.result.player.player_id);
        console.log(req.signedCookies.userId);
        
    }
    res.status(result.status).send(result.result);
});

router.post('/register', async function(req, res, next){
    
    let user = req.body.username;
    let pass = req.body.password;
    console.log("route:" +user);
    console.log("Username: " + user + "Pass: " + pass);
    let result = await lModel.register(user, pass);
    
    res.status(result.status).send(result.result);
});

router.get('/cookieJar', async function(req, res, next) {
    console.log("Hello cookies!");
    res.status(200).send(req.signedCookies);
});

module.exports = router;