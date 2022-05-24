


let username;
let password;
let loginButton;
let registButton;
let canClick = true;
let isLogined = false;
let canDrawMatchMaking = false;
let matchMakingText;
let pendingMatch = false;


function setup(){
    createCanvas(windowWidth, windowHeight);
    username = createInput('Username');
    password = createInput('Password');
    username.position(windowWidth/2,windowHeight/2-20);
    password.position(windowWidth/2,windowHeight/2);

    loginButton = new button("Login",windowWidth/2, windowHeight/2+20,100,20,false);
    registButton = new button("Registration",windowWidth/2+100, windowHeight/2+20,100,20,false);
    
    loginButton.buttonBuilder();
    registButton.buttonBuilder();
}
function draw()
{
    if(!mouseIsPressed) canClick = true;
    if(loginButton.clicker(mouseX, mouseY, canClick && mouseIsPressed))
    {
        successLogin = LoginClass.doLogin(username.value(), password.value());
    }
    if(registButton.clicker(mouseX, mouseY, canClick && mouseIsPressed))
    {
        LoginClass.doRegister(username.value(), password.value());
        canClick = false;
    }
    if(playerIdentifier != null && !isLogined)
    {
        window.alert("Login successful");
        //window.location.href = "game.html";
        isLogined = true;
        canDrawMatchMaking = true;
        pendingMatch = true;
        Tinder.enqueuer();
        
    }
    if(canDrawMatchMaking)
    {
        username.position(windowWidth *2, windowHeight);
        password.position(windowWidth *2, windowHeight);
        createCanvas(windowWidth, windowHeight);
        
        canDrawMatchMaking = false;
    }
    if(pendingMatch){

    }
}

class LoginClass{
    static async doLogin(user, pass)
    {
        let canLogin = await login(user, pass);
        if(canLogin != undefined){
            playerIdentifier = canLogin.player.player_id; 
        }
        
    }
    static async doRegister(user, pass)
    {
        let canLogin = await register(user, pass);
        window.alert(canLogin.msg);
    }
}

class Tinder
{
    static async enqueuer()
    {
        let msg = await enqueue();
        console.log("In message:" + msg);
        if(msg != null){
            console.log("Trying to call matchmaker");
           let msg2 = await matchMake();
           console.log(msg2);
        }
    }
    static async getARoom()
    {
        let roomId = await getRoomById();
    
    }

}