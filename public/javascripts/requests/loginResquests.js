
async function login(username, password)
{
   try {
    const response = await fetch(`/api/login`,
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username: username, password: password})
    });
    if (response.status == 200)
    {
        var result = await response.json();
        return result;   
    } else {
        //Trear errors like 404 here
        console.log(response);
    }
} catch (err){
    //Treat 500 errors here
    console.log(err);
}
};
async function register(username, password)
{
   try {
    const response = await fetch(`/api/login/register`,
    {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username: username, password: password})
    });
    if (response.status == 200)
    {
        var result = await response.json();
        return result;   
    } else {
        //Trear errors like 404 here
        console.log(response);
    }
} catch (err){
    //Treat 500 errors here
    console.log(err);
}
};
async function getCookies() {
    try {
        const response = await fetch(`/api/login/cookieJar`);
        
        
        if (response.status == 200)
        {
            console.log("Getting Cookies");
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