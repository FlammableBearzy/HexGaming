async function getActions()
{
   try {
       const response = await fetch(`/api/actions`);
       
       if (response.status == 200)
        {
           var actions = await response.json();
           return actions;
        } else {
           console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
};

async function GetPlayersPositions()
{
   try {
       const response = await fetch(`/api/actions/parcels`);
       
       if (response.status == 200)
        {
           var actions = await response.json();
           return actions;
        } else {
           console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
};

async function getUpdateAttackCooldownByPlayer(playerId)
{
    try {
        const response = await fetch(`/api/actions/${playerId}/inPlay`);
        if (response.status == 200)
        {
            var action = await response.json();
            return action;
        } else {
           console.log(response);
        }

    } catch (err) {
        console.log(err);
    }
}



async function postUpdateAttackCooldownByPlayer(playerId, actionId, cooldown)
{
    try {
        console.log(cooldown);
        const response = await fetch(`/api/actions/${playerId}/inPlay`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ actionID: actionId, cooldownID: cooldown})
        });
        if (response.status == 200)
        {
            var action = await response.json();
            return action;
        } else {
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }

};

async function postResetCooldown(playerId) 
{
    try {
    const response = await fetch(`/api/actions/${playerId}/ResetCooldowns`,
    {
        method: "POST",
        headers: {"Content-Type": "application/json"}
        //body: JSON.stringify({ actionID: actionId, cooldownID: cooldown })
    });

    if (response.status == 200)
    {
        var action = await response.json();
        return action;
    } else {
        console.log(response);
    }

    } catch (err) {
        console.log(err);
    }
}

async function play(direction, cookie){
    try {
        console.log("We entered the play function");
        const response = await fetch(`/api/actions/plays`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({direction: direction, cookie : cookie})
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

async function postTrapPlacing(playerId, roomId, attackId, parcelId)
{
    try {
        const response = await fetch(`/api/actions/${playerId}/PlaceTraps`,
        {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({ roomID: roomId, attackID: attackId, parcelID: parcelId })
        });

        if (response.status == 200)
        {
            var action = await response.json();
            return action;
        } else {
            console.log(response);
        }
    } catch (err) {
        console.log(err);
    }
}