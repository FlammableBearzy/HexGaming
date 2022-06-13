var pool = require('./connection.js')

module.exports.getAllMoveActions = async function() {
    try {
        let sql = `Select * from moveAction`;
        let result = await pool.query(sql);
        let moveAction = result.rows;

        return { status: 200, result: moveAction };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err};
    }
};

module.exports.play = async function (id, direction) {
    try{
        let sql2 = `Select room_lastturnplayer_id from room where room_player1_id = $1 OR room_player2_id = $1`
        let result2 = await pool.query(sql2, [id]);
        if(id == result2.rows[0].room_lastturnplayer_id ){
        let sql = `Select * from moveAction where mov_player_id = $1;`;
        let result = await pool.query(sql, [id]);
        let movInfo = result.rows[0];
        if (!movInfo)
        {
            return { status: 404, result: { msg: "No room with that id" } };
        } else {
            let addtion = 0;
            if(direction == "Up") addtion = -6;
            else
            if(direction == "Down") addtion = 6;
            else
            if(direction == "Left") addtion = -1;
            else
            if(direction == "Right") addtion = 1;
            else 
            return{status: 400, msg:"Invalid Direction"};           
            let parcel = movInfo.mov_action_parselid + addtion;
            if(parcel > 18 || parcel < 1) return{status: 400, msg:"Invalid Direction"};

            if((direction == "Right" && (movInfo.mov_action_parselid == 6 ||movInfo.mov_action_parselid == 12)) || (direction == "Left" && (movInfo.mov_action_parselid == 1 ||movInfo.mov_action_parselid == 7 || movInfo.mov_action_parselid == 13)))
            return{status: 400, msg:"Invalid Direction"};

            let sqlU = "UPDATE moveAction SET mov_action_parselId = $2 WHERE mov_player_id = $1;";     
            let resultU = await pool.query(sqlU, [id, parcel]);
            console.log(resultU);
        
            if(resultU == undefined)
            {
                return {
                status : 404,
                result : {msg : "Something is missing"}
                };
            }

            if (resultU.rowCount == 0)
            {
                return {

                status : 500,
                result : {msg : "The updated failed"}
            };
        }
        return {
            status: 200,
            result: {
                msg: "You posted!"
            }
          };
            //return { status: 200, result: { msg: "You've entered the room" } };    
        }
    } else return {status: 400, msg:"Not your turn"}

        
        //let resultU = await pool.query(sqlU, [player, parsel],(arg) => promise(arg));
    } catch (err) {
        console.log(err);
        return { status: 420, result: err };
    }
}


module.exports.getParcels = async function(id) {
    try {
        let sql = `Select * from room where room_id = $1`;
        let result = await pool.query(sql, [id]);
        if(result != undefined)
        {
            let id1 = result.rows[0].room_player1_id;
            let id2 = result.rows[0].room_player2_id;
            let sql2 = `Select * from moveAction where mov_player_id = $1 OR  mov_player_id = $2`;
            let result2 = await pool.query(sql2, [id1,id2]);
            if(result2 == undefined)
            return{status: 404, msg: "Players not found"};
            return {status:200, result: result2};
        }
        else return {status:404, msg: "Room not found"};
    } catch (err) {
        console.log(err);
        return { status: 500, result: err};
    }
};

module.exports.getAllAttackActions = async function(){
    try {
        let sql = `Select * from attackAction`;
        let result = await pool.query(sql);
        let attackAction = result.rows;

        return{ status: 200, result: attackAction };
    } catch (err) {
        console.log(err);
        return { status: 500, result: err};
    }
}; 

module.exports.getAttackInGameByPlayer = async function(id)
{
    try{
        let sql = `select * from attackInGame where att_ig_player_id = $1;`;
        let result = await pool.query(sql, [id]);
        if (result.rows.length > 0){
            let attInGame = result.rows;
            return { status: 200, result: attInGame };
        } else {
            return { status: 404, result: {msg: "There's no player with that ID"}}
        }

    } catch (err){
        console.log(err);
        return { status: 500, result: err};
    }
}

module.exports.postUpdateCooldownByPlayer = async function(id, action){
    try{
        if(!parseInt(action))
        {
            
            consolo.log("This must be a number of the action: " + action + " of the player with id: " + id);
            return {
                status: 400,
                result: {msg: "This must be a number of the action: " + action + " of the player with id: " + id}
            };
        }

            let sqls = `select * from attackInGame join attackAction on att_action_id = att_ig_action_id where att_ig_player_id = $1;`;
            let result = await pool.query(sqls, [id]);
            let attInGame = result.rows;
            let newCooldown = 0;
            let PlayableCard = true;

            if (!attInGame){
                return { status: 404, result: {msg: "There's no player with that ID"}}
            } else {
                console.log("Testing the Att_action_cooldown: " + attInGame[0].att_action_cooldown);
                for (let i of attInGame)
                {
                    let cooldown = i.att_ig_cooldown;
                    let baseCooldown = i.att_action_cooldown;
                    console.log("Testing the cooldown: " + cooldown)
                    console.log("Testing the base cooldown: " + baseCooldown)
                    if ( cooldown >= baseCooldown)
                    {
                        console.log("Papopé");
                        newCooldown = cooldown;
                        PlayableCard = true;
                    } else {
                        console.log("Pipipapopé");
                        newCooldown = 0;
                        console.log(cooldown)
                        newCooldown = cooldown + 1;
                        console.log(newCooldown)
                        PlayableCard = false;
                    }
                    
                }
                let sqlU = "UPDATE attackInGame SET att_IG_cooldown = $3 WHERE att_IG_action_id = $2 and att_ig_player_id = $1;";
                //console.log("Fui Chamado no actions model");

                console.log("No work?" + newCooldown)
                let resultU = await pool.query(sqlU, [id, action, newCooldown]);
                if (resultU == undefined)
                {
                    return {
                        status: 404,
                        result: {msg: "something is missing"}
                    };
                }
                
                if (resultU.rowCount == 0)
                {
                    return {
                        status: 500,
                        result: {msg: "The update failed"}
                    };
                }

                return {
                    status: 200,
                    result: attInGame
                };
            }
    
    } catch (err){
        console.log(err);
        return { status: 500, result: err};
    }
}


module.exports.postResetActions = async function(id){
    try{
        let sqls = `select * from attackInGame where att_ig_player_id = $1;`;
        let result = await pool.query(sqls, [id]);
        let attInGame = result.rows;
        if (!attInGame){
            return { status: 404, result: {msg: "There's no player with that ID"}}
        } else {
            let sqlU = "UPDATE attackInGame SET att_IG_cooldown = attackAction.att_action_cooldown FROM attackAction WHERE attackAction.att_action_id = attackInGame.att_IG_action_id and attackInGame.att_ig_player_id = $1;";

            let resultU = await pool.query(sqlU, [id]);
            if (resultU == undefined)
            {
                return {
                    status: 404,
                    result: {msg: "something is missing"}
                };
            }
            
            if (resultU.rowCount == 0)
            {
                return {
                    status: 500,
                    result: {msg: "The update failed"}
                };
            }
            return {
                status: 200,
                result: {
                    msg: "You posted!", attInGame
                }
            };
        }
    } catch (err){
    console.log(err);
    return { status: 500, result: err};
    }
}

module.exports.postTrapPlacing = async function(id, room, attack, parcel) {
    try {
        if(!parseInt(room))
        {
            console.log("This Room: " + room);
            if(!parseInt(attack))
            {
                
                console.log("This Attack:" + attack);       
                if(!parseInt(parcel))
                {
                    console.log("This Parcel: " + parcel);
                    return{ 
                        status: 400,
                        result: { msg: "This parcel " + parcel}
                    };
                }

                return{ 
                    status: 400,
                    result: { msg: "This attack " + attack}
                };
            }

            return {
                status: 400,
                result: {msg: "This Room: " + room + " with the player with id: " + id}
            };
        }

        let sqlIn = `insert into traps (trap_player_id, trap_room_id, trap_attack_id, trap_parsel_id, trap_activation) values ($1, $2, $3, $4, 0)`;
            let result = await pool.query(sqlIn, [id, room, attack, parcel]);
            console.log(id);
            console.log(room);
            console.log(attack);
            console.log(parcel);
            let trap = result.rows;
            if (result == undefined)
            {
                return {
                    status: 404,
                    result: {msg: "something is missing"}
                };
            }
            
            if (result.rowCount == 0)
            {
                return {
                    status: 500,
                    result: {msg: "The update failed"}
                };
            }
            return {
                status: 200,
                result: {
                    msg: "You posted!"
                }
            };
    } catch (err) {
        console.log(err);
        return {status: 500, result: err}
    }
}
/*
Make the Update cards get starter information from all cards. This will require a new route with the player id as base.

Something like "/api/actions/${id}/ResetCooldowns".

This will be called once, every time the player plays a new game to reset their cards.

it will work as a post.
Will use the information from the GetAllAttackActions
after getting that info, update with the values from the base cards ( from the Attack Actions)
*/