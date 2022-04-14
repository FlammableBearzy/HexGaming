const movImgCenterVertical = 0.4;
const movImgRelWidth = 0.6;
const movTextCenterVertical = 0.8;

class Movement {
    //AttackPlayed = false;

    //static movementImage = {};
    constructor(width, height, x, y, cooldown, action){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.cooldown = cooldown;
        this.action = action;
    };

    static initImgs(imgHash){
        Movement.movementImage = imgHash;
    };
/*
    updateCooldown(cooldown)
    {
        this.cooldown = cooldown;
        
        if(AttackPlayed == true)
        {
            cooldown--;
        }
        if(cooldown == 0)
        {
            AttackPlayed == false;
        }
    };
*/    
    draw() {
        //console.log("MovementAttack Drawn Called")
        fill(100,100,100);
        stroke(0,0,0);     
        rect (this.x,this.y,this.width,this.height,5,5,5,5);
        console.log(this.action + "  Movement Action");
        if (this.action){
            //ImageMode(CENTER)
            console.log(this.action);
            //let img = Movement.attackImage[this.action]
            //console.log (Movement.attackImage[this.action])
            let ratio = (this.width * movImgRelWidth) / img.width;
            //Image(img, this.x + this.width/2, this.y + this.height * movmovImgCenterVertical, this.width * movImgRelWidth, img.height * ratio);
            fill(0, 0, 0);
            textAlig(CENTER, CENTER);
            text(this.action, this.x + this.width/2, this.y + this.height * movTextCenterVertical);
        }
    };

    setAction(action)
    {
        this.action = action;
        console.log(action)
    };

    getAction()
    {
        return this.action;
        console.log(this.action)
    };

    /*
    clicked(x, y)
    {
        return (x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height));
    };
    */
}