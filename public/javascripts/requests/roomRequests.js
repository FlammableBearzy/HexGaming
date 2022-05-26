

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


async function play(parselId, roomId, direction){
    try {
        console.log("We entered the play function");
        const response = await fetch(`/api/rooms/${roomId}/plays`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({parselID: parselId, direction: direction})
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
async function enqueue(){
    try {
        const response = await fetch(`/api/rooms/enqueue`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({})
        });
        console.log(response.status);
        if (response.status == 200)
        {
            return "Success";   
        } else {
            //Trear errors like 404 here
            console.log(response);
        }
    } catch (err){
        //Treat 500 errors here
        console.log(err);
    }
}


async function matchMake(){
    try {
        console.log("We entered the play function");
        const response = await fetch(`/api/rooms/matchMaking`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        });
        console.log("Responding1");
        if (response.status == 200 || response.status == 202)
        {
            console.log("Responding2");
            var status = await response.status;
            console.log(status);
            return status;   
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

async function getRoomById() 
{
    try {
        const response = await fetch(`/api/rooms/getRoomById`);
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
