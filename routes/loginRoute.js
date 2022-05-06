var express = require('express');
var router = express.Router();
var lModel = require("../models/loginModel");



router.post('/', async function(req, res, next){
    
    let user = req.body.username;
    let pass = req.body.password;
    console.log("route:" +user);
    console.log("Username: " + user + "Pass: " + pass);
    let result = await lModel.login(user, pass);
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

module.exports = router;