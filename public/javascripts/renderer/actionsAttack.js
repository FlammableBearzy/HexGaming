const imgCenterVertical = 0.4;
const imgRelWidth = 0.6;
const textCenterVertical = 0.8;


class Attacks {
    AttackPlayed = false;

    static attackImage = {};
    constructor(width, height, x, y, cooldown, action){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.cooldown = cooldown;
        this.action = action;
    };

    static initImgs(imgHash){
        Attacks.attackImage = imgHash;
    };

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
    
    draw() {
        fill(100,100,100);
        stroke(0,0,0);     
        rect (this.x,this.y,this.width,this.height,5,5,5,5);

        if (this.card){
            ImageMode(CENTER)
            console.log(this.action);
            let img = Attacks.attackImage[this.action]
            console.log (Attacks.attackImage[this.action])
            let ratio = (this.width * imgRelWidth) / img.width;
            Image(img, this.x + this.width/2, this.y + this.height * imgCenterVertical, this.width * imgRelWidth, img.height * ratio);
            fill(0, 0, 0);
            textAlig(CENTER, CENTER);
            text(this.action, this.x + this.width/2, this.y + this.height * textCenterVertical);
        }
    };

    setAction(action)
    {
        this.action = action;
    };

    getAction()
    {
        return this.action;
    };

    clicked(x, y)
    {
        return (x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height));
    };
}