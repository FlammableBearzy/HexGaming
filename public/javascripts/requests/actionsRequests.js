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
async function getUpdateAttackCooldown()
{
    try {
        const response = await fetch(`/api/actions/inPlay`);
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

async function postUpdateAttackCooldown(playerId, actionId, cooldown)
{
    try {
        console.log(cooldown);
        const response = await fetch(`/api/actions/inPlay`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ playerID: playerId, actionID: actionId, cooldownID: cooldown})
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