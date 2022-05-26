const { param } = require('../routes/index.js');
var pool = require('./connection.js');

let queue = null;
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

/*module.exports.getGameByID = async function (id) {
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
};*/

module.exports.play = async function (player, parsel, direction) {
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

        let sqlr = `Select * from moveAction where mov_player_id = $1;`;
        let resultr = await pool.query(sqlr, [player]);
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
module.exports.turnChanger = async function (id) {
    try{
        
        if (!parseInt(id)){

            return { status: 400, result: { msg: "Room id must be a number" } };           
        }

        //let sql = `Select * from room, moveAction where room.room_game_id = $1 and moveAction.mov_player_id = $2 and mov_action_parselId = $3;`;
        //let result = await pool.query(sql, [id, player, parsel]);
        let id2 = 1;
        console.log(id);
        let sqlr = `Select * from room where room_game_id = 1;`; // removed a room.room_game_id, and placed room_game_id;
        let resultr = await pool.query(sqlr);
        let room = resultr.rows[0].room_id;
        let currentTurn = resultr.rows[0].room_turns;
        console.log(room);
        if (!room && !currentTurn)
        {
            return { status: 404, result: { msg: "No room: "+ room + "; currentTurn: " + currentTurn}};
        } else {
            let newTurn = currentTurn + 1;
            let sqlU = "UPDATE room SET room_turns = $2 WHERE room_id = $1;";
            let resultU = await pool.query(sqlU, [room, newTurn]);
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
module.exports.queueJoiner = async function (id) {
    try{
        if(id == null)  return { status: 400, msg: "No Id was identified!" }
        if(queue == null) queue = new Queue2();
        let canQueue = true;
        let currentId = queue.head;
        for(i = 0; i < queue.count; i++){
            if(id == queue.list[currentId])
            {
                canQueue = false;
                break;
            }
        }
        if(canQueue)
        {
            queue.enqueue(id);
            console.log(queue.list);
            return { status: 200, msg: "Enqueued" }
        }
        else
        {
            return { status: 421, msg: "Player was already in the queue!"}
        }
        

    } catch (err) {
        console.log(err);
        return { status: 420, result: err };
    }
}


module.exports.matchMaking = async function () {
    try{
        if(queue == null) queue = new Queue2();
        console.log("Matching");
        let id1;
        let id2;
        if(queue.count >= 2){
            id1 = queue.dequeue();
            id2 = queue.dequeue();
            console.log("Enquing:" + id1 + " and " + id2);
            let sql = "INSERT INTO room (room_state, room_player1_id, room_player2_id, room_turns) Values ('Playing', $1, $2, 0)"
            await pool.query(sql, [id1, id2]);
            return {status: 200, msg: "Joined a room!"}
        }
        else
        {
            return {status: 202, msg: "No partners found!"}
        }
    } catch (err) {
        console.log(err);
        return { status: 420, result: err };
    }
}
module.exports.getRoomById = async function (id) {
    try{
        console.log("Player id:" + id);
        let sql = "Select room_id from room where room_player1_id = $1 OR room_player2_id = $1"
        let result2 = await pool.query(sql,[id])
        return{status:200, result: result2}
        
    } catch (err) {
        console.log(err);
        return { status: 420, result: err };
    }
}
module.exports.getTurns = async function (id) {
    try{
        console.log("Room id:" + id);
        let sql = "Select room_turns from room where room_id = $1"
        let result2 = await pool.query(sql,[id])
        return{status:200, result: result2}
        
    } catch (err) {
        console.log(err);
        return { status: 420, result: err };
    }
}

class Queue2
{
    constructor()
    {
        this.list = [];
        this.head = 0;
        this.tail =0;
        this.count = 0;
    }
    enqueue(item){
        this.list[this.tail] = item;
        this.tail++;
        this.count++;
    }
    dequeue(){
        if(!this.isEmpty())
        {
            console.log("Head: " + this.head + "Value: " + this.list[this.head])
            let item = this.list[this.head];
            this.list[this.head] = null;
            this.head++;
            this.count--;
            console.log(item);
            return item;
        }
        else
        {
            return null;
        }
    }
    isEmpty(){
        return this.count == 0;
    }
}
/*setInterval(async function(){
    try{
        if(queue == null) queue = new Queue2();
        console.log("Matching");
        let id1;
        let id2;
        if(queue.count >= 2){
            id1 = queue.dequeue();
            id2 = queue.dequeue();
            console.log("Enquing:" + id1 + " and " + id2);
            let sql = "INSERT INTO room (room_state, room_player1_id, room_player2_id, room_turns) Values ('Playing', $1, $2, 0)"
            await pool.query(sql, [id1, id2]);
            return {status: 200, msg: "Joined a room!"}
        }
        else
        {
            return {status: 400, msg: "No partners found!"}
        }
    } catch (err) {
        console.log(err);
        return { status: 420, result: err };
    }
}, 1000);*/