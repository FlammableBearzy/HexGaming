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


module.exports.turnChanger = async function (id) {
    try{
        
        if (!parseInt(id)){

            return { status: 400, result: { msg: "Room id must be a number" } };           
        }

        //let sql = `Select * from room, moveAction where room.room_game_id = $1 and moveAction.mov_player_id = $2 and mov_action_parselId = $3;`;
        //let result = await pool.query(sql, [id, player, parsel]);
        
        
        let sqlr = `Select * from room where room_id = $1;`; // removed a room.room_game_id, and placed room_game_id;
        let resultr = await pool.query(sqlr,[id]);
        let room = resultr.rows[0].room_id;
        let currentTurn = resultr.rows[0].room_turns;
        
        if (!room && !currentTurn)
        {
            return { status: 404, result: { msg: "No room: "+ room + "; currentTurn: " + currentTurn}};
        } else {
            
            let newTurn = currentTurn + 1;
            let newPlayer = resultr.rows[0].room_lastturnplayer_id;
            if(newTurn %2 == 0){
                if(newPlayer == resultr.rows[0].room_player1_id){
                    newPlayer = resultr.rows[0].room_player2_id
                }
                else
                {
                    newPlayer = resultr.rows[0].room_player1_id
                }
            }
            let sqlU = "UPDATE room SET room_turns = $2, room_lastturnplayer_id = $3 WHERE room_id = $1;";
            let resultU = await pool.query(sqlU, [room, newTurn, newPlayer]);
            
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
        let sql2 = `Select * from room where room_id = $1;`; // removed a room.room_game_id, and placed room_game_id;
        let result2 = await pool.query(sql2,[id]);
        return {
            status: 200,
            result: {result: result2}
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
        
        let id1;
        let id2;
        
        if(queue.count >= 2){
            id1 = queue.dequeue();
            id2 = queue.dequeue();

            let sql2 = 'Select * From room where room_player1_id = $1 OR room_player1_id = $2 OR room_player2_id = $1 OR room_player2_id = $2';
            let result2 = await pool.query(sql2,[id1, id2]);
            if(result2.rowCount > 0)
            return {status: 400, msg: "Already in room"}
            
            let sql = "INSERT INTO room (room_state, room_player1_id, room_player2_id, room_turns, room_lastturnplayer_id, lastactivity) Values ('Playing', $1, $2, 0, $1, $3)"
            await pool.query(sql, [id1, id2, Date.now()]);

            let sql3 = `Update moveAction SET mov_action_parselid = 1 where mov_player_id = $1`
            await pool.query(sql3,[id1]);
            let sql4 = `Update moveAction SET mov_action_parselid = 18 where mov_player_id = $1`
            await pool.query(sql4,[id2]);

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

module.exports.getTurns = async function (id) {
    try{
        
        let sql = "Select room_turns, room_lastturnplayer_id from room where room_id = $1"
        let result2 = await pool.query(sql,[id])
        
        return{status:200, result: result2}
        
    } catch (err) {
        console.log(err);
        return { status: 420, result: err };
    }
}


module.exports.getRoomById = async function (id) {
    try{
        
        let sql = "Select * from room where room_player1_id = $1 OR room_player2_id = $1"
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
            
            let item = this.list[this.head];
            this.list[this.head] = null;
            this.head++;
            this.count--;
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
setInterval(async function(){
    let currentTime = Date.now();
    let sql = `SELECT * from room`;
    let result = await pool.query(sql);
    for(i = 0; i < result.rowCount; i++ )
    {
        if(result.rows[i].lastactivity != null){
            console.log(currentTime - parseInt(result.rows[i].lastactivity))
            
            if(currentTime - parseInt(result.rows[i].lastactivity) > 30000){
                
                let sql2 = `Delete from room where room_id = $1`;
                let result2 = await pool.query(sql2, [result.rows[i].room_id]);
            }
        }
    }
}, 3000)
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