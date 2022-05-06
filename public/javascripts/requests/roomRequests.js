
async function getRoom(gameId) {
    try {
        const response = await fetch(`/api/rooms/${gameId}`);
        console.log("There was an input with mouse");
        if (response.status == 200)
        {
            var room = await response.json();
            return room;  
        } else {
            //Trear errors like 404 here
            console.log(response);
        }
    } catch (err){
        //Treat 500 errors here
        console.log(err);
    }
}


async function play(playerId, parselId, gameId, direction){
    try {
        console.log("We entered the play function");
        const response = await fetch(`/api/rooms/${gameId}/plays`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ playerID: playerId, parselID: parselId, direction: direction})
        });
        if (response.status == 200)
        {
            var parsel = await response.json();
            return parsel;   
        } else {
            //Trear errors like 404 here
            console.log(response);
        }
    } catch (err){
        //Treat 500 errors here
        console.log(err);
    }
}
async function turnChanger(roomId){
        try {
            console.log("In roomRequests");
            const response = await fetch(`/api/rooms/${roomId}/turnChanger`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ id: roomId })
            });
            if (response.status == 200)
            {
                var turn = await response.json();
                return turn;   
            } else {
                //Trear errors like 404 here
                console.log(response);
            }
        } catch (err){
            //Treat 500 errors here
            console.log(err);
        }
}