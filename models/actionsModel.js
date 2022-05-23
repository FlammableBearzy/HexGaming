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

module.exports.getUpdateCooldownByPlayer = async function(id)
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

module.exports.postUpdateCooldownByPlayer = async function(id, action, cooldown){
    try{
        if(!parseInt(action))
        {
            if(!parseInt(cooldown))
            {
                console.log("This cooldown: " + cooldown);
                return {
                    status: 400,
                    result: {msg: "This cooldown: " + cooldown}
                };
            }
            consolo.log("This must be a number of the action: " + action + " of the player with id: " + id);
            return {
                status: 400,
                result: {msg: "This must be a number of the action: " + action + " of the player with id: " + id}
            };
        }

            let sqls = `select * from attackInGame where att_ig_player_id = $1;`;
            let result = await pool.query(sqls, [id]);
            let attInGame = result.rows;
            if (!attInGame){
                return { status: 404, result: {msg: "There's no player with that ID"}}
            } else {
                let sqlU = "UPDATE attackInGame SET att_IG_cooldown = $1 WHERE att_IG_action_id = $2;";
                console.log(cooldown);
                console.log(action);

                let resultU = await pool.query(sqlU, [cooldown, action]);
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
                        msg: "You posted!"
                    }
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
            let sqlU = "UPDATE attackInGame SET att_IG_cooldown = attackAction.att_action_cooldown FROM attackAction WHERE attackAction.att_action_id = attackInGame.att_IG_action_id;";

            let resultU = await pool.query(sqlU);
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
                    msg: "You posted!"
                }
            };
        }
    } catch (err){
    console.log(err);
    return { status: 500, result: err};
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