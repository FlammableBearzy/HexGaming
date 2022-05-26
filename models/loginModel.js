const { param } = require('../routes/index.js');
var pool = require('./connection.js');





module.exports.login = async function (username, password) {
    try{
        
        //let sql = `Select * from room, moveAction where room.room_game_id = $1 and moveAction.mov_player_id = $2 and mov_action_parselId = $3;`;
        //let result = await pool.query(sql, [id, player, parsel]);

        let sqlr = `Select player_id, player_health from player where player_name = $1 AND player_pass = $2;`;
        let resultl = await pool.query(sqlr, [username, password]);
        let player = resultl.rows[0];
        if (!player)
        {
            return { status: 404, result:{msg: "Player not found"}};
        } else {
            return {status: 200, result:{player}};
        }
    } catch (err) {
        console.log(err);
        return { status: 420, result: err };
    }
}
module.exports.register = async function (username, password) {
    try{
        
        let sqlL = `Select player_id from player where player_name = $1 AND player_pass = $2;`;
        let resultl = await pool.query(sqlL, [username, password]);
        let existantPlayer = resultl.rows[0];
        if (existantPlayer)
        {
            return { status: 404, result:{msg: "Player Already exists"}};
        } else {
            console.log("Arriving insert");
        let sqlr = `Insert Into player (player_name, player_pass, player_health) Values ($1, $2, 3)`;
        await pool.query(sqlr, [username, password]);
        
        let sql2 = `Select player_id from player where player_name = $1 AND player_pass = $2;`;
        let result2 = await pool.query(sql2, [username, password]);
        let playerid = result2.rows[0].player_id;

        let sqlM = `Insert Into moveAction (mov_action_id,mov_player_id, mov_action_parselid) Values ($1,$1, 1)`;
        await pool.query(sqlM, [playerid]);

        return {status: 200, result:{msg: "Player registered!"}};
    }
    } catch (err) {
        console.log(err);
        return { status: 420, result: err };
    }
}