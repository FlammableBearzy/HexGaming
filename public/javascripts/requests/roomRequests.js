async function play(playerId, parselId){
    try {
        console.log("We entered the play function");
        const response = await fetch(`/api/rooms/1/plays`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ playerID: playerId, parselID: parselId})
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