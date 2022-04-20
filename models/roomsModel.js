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
/*
module.exports.getRoomsByID = async function (id) {
    try {
        let sql = `Select room_id, room_name, room_state and room_id = $1`;
        let result = await pool.query(sql, [id]);
        if (result.rows.length > 0){
            let room = result.rows[0];
            return { status: 200, result: room};
        } else {
            return { status: 404, result: { msg: "No room with that id"} };
        }
    } catch (err) {
        console.log(err);
        return { status: 500, result: err};
    }
};
*/
module.exports.play = async function (player, parsel) {
    try{
        if(!parseInt(player) && !parseInt(parseInt))
        {
            console.log("This player: " + player + " and this parsel: " + parsel);
            return {
                status: 400,
                result: { msg: "This player: " + player + ", This parsel: " + parsel}
            };
        }

        let sqlU = "UPDATE moveAction SET mov_action_parselId = $1 WHERE mov_player_id = $2";
        let resultU = await pool.query(sqlU, [player, parsel]);

    } catch (err) {
        console.log(err);
        return { status: 500, result: err };
    }
}