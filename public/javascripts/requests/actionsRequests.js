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