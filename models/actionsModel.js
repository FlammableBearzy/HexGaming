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

module.exports.getUpdateCooldown = async function()
{
    try{
    let sql = `select * from attackInGame;`;
    let result = await pool.query(sql);
    let attInGame = result.rows;
        return {
            status: 200,
            result: attInGame
        };
    } catch (err){
        console.log(err);
    }
}

module.exports.postUpdateCooldown = async function(action, player, cooldown){
    try{
        if(!parseInt(action) && !parseInt(player))
        {
            if(!parseInt(cooldown))
            {
                console.log("This cooldown: " + cooldown);
                return {
                    status: 400,
                    result: {msg: "This cooldown: " + cooldown}
                };
            }
            consolo.log("This must be a number of the action: " + action + " of the player with id: " + player);
            return {
                status: 400,
                result: {msg: "This must be a number of the action: " + action + " of the player with id: " + player}
            };
        }
/*
    let sql = `select * from attackInGame where attackInGame.att_IG_player_id = $1 and attackInGame.att_IG_action_id = $2;`;
    let result = await pool.query(sql, [player, action]);
        if (result.rows.length > 0){
            let attInGame = result.rows[0];
            return {
                status: 200,
                result: attInGame
            };
        }
    let coold = result.rows[0].cooldown;
    //let cooldown = result.row[0].att_IG_cooldown */
    let sql2 = "UPDATE attackInGame SET att_IG_cooldown = $1 where att_IG_player_id = $2 and att_IG_action_id = $3";
    console.log(cooldown);
    console.log(player);
    console.log(action);
    let result2 = await pool.query(sql2, [cooldown, player, action]);
    if (result2 == undefined)
    {
        return {
            status: 404,
            result: {msg: "something is missing"}
        };
    }

    if (result2.rowCount == 0)
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

    } catch (err){
        console.log(err);
    }    
}
