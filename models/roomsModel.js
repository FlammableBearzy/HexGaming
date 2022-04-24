const { param } = require('../routes/index.js');
var pool = require('./connection.js');

module.exports.getAllRooms = async function(){
    try{
        let sql = `Select * from room`;
        let result = await pool.query(sql);
        let rooms = result.rows;

        return{
            status: 200,
            result: rooms
        };
    } catch (err) {
        console.log(err);
        return{
            status: 500,
            return: err
        };
    }
}

module.exports.getGameByID = async function (id) {
    try {
        let sql = `Select * from room where room_game_id = $1;`;
        let result = await pool.query(sql, [id]);
        if (result.rows.length > 0){
            let game = result.rows[0];
            return { status: 200, result: game};
        } else {
            return { status: 404, result: { msg: "No room with that id"} };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, result: err};
    }
};

module.exports.play = async function (id ,player, parsel, direction) {
    try{
        if (!parseInt(id))
        {
            if(!parseInt(player) && !parseInt(parseInt))
            {
                console.log("This player: " + player + " and this parsel: " + parsel);
                return {
                    status: 400,
                    result: { msg: "This player: " + player + ", This parsel: " + parsel}
                };
            }
            console.log("This room id is: " + id);
            return { status: 400, result: { msg: "Room id must be a number" } };           
        }

        //let sql = `Select * from room, moveAction where room.room_game_id = $1 and moveAction.mov_player_id = $2 and mov_action_parselId = $3;`;
        //let result = await pool.query(sql, [id, player, parsel]);

        let sqlr = `Select * from room, moveAction where room.room_game_id = $1;`;
        let resultr = await pool.query(sqlr, [id]);
        let room = resultr.rows[0];
        if (!room)
        {
            return { status: 404, result: { msg: "No room with that id" } };
        } else {
            let sqlU = "UPDATE moveAction SET mov_action_parselId = $2 WHERE mov_player_id = $1;";
        console.log(player);
        console.log(parsel);
        console.log(direction);
        parsel = parsel + direction;
        let resultU = await pool.query(sqlU, [player, parsel]);
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

        
        //let resultU = await pool.query(sqlU, [player, parsel],(arg) => promise(arg));
    } catch (err) {
        console.log(err);
        return { status: 420, result: err };
    }
}