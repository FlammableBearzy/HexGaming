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

/*
async function UpdateAttackCooldown()
{
    try {
        const response = await fetch(`/api/actions/${actionId}`);
        if (response.status == 200)

    } catch (err) {

    }

};
*/

/*
async function postMove(roomId, playerId)
{
    try{
        const response = await fetch(`/api/rooms/${roomId}/move`)

    }
};
*/