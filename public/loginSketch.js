

let username;
let password;
let loginButton;
let registButton;
let canClick = true;


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
        console.log(successLogin.isFulfilled);
        canClick = false;
    }
    if(registButton.clicker(mouseX, mouseY, canClick && mouseIsPressed))
    {
        LoginClass.doRegister(username.value(), password.value());
        canClick = false;
    }
}

class LoginClass{
    static async doLogin(user, pass)
    {
        let canLogin = await login(user, pass);
        return canLogin;
        
    }
    static async doRegister(user, pass)
    {
        let canLogin = await register(user, pass);
        console.log(canLogin)
        if(canLogin !=null){
            return true;
        }else return false;
        console.log(canLogin.player.player_id);
    }

}