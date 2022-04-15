let ActionID;

const imgCenterVertical = 0.4;
const imgRelWidth = 0.6;
const textCenterVertical = 0.8;


class Attacks {
    constructor(width, height, x, y, cooldown, action){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.cooldown = cooldown;
        this.action = action;
    };

    static async preloadImages()
    {
        let attackImage = {};
        let action = await getActions();
        for (let i of action)
        {
            ActionID = i.att_action_id;
            let ActionName = i.att_action_name;
            //ActionID.push(ActionID);
            //ActionName.push(ActionName);
            attackImage[ActionID] = loadImage('./images/' + ActionName + ActionID + '.png');
        }
        Attacks.initImgs(attackImage);
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
    
    pepo() {
        //console.log("ActionAttack Drawn Called")
        //console.log ("Prior If " + this.action);
        
        if (this != undefined && Attacks.attackImage != undefined)
        {
            //console.log(this.action);
            if(this.action)
            {
                imageMode(CENTER);
                let img = Attacks.attackImage[this.action];
                //console.log(Attacks.attackImage[this.action]);
                let ratio = (this.width * imgRelWidth) / img.width;
                image(img,this.x + this.width * (this.action - 1/2) * 3/4, this.y+this.height*imgCenterVertical, this.width*imgRelWidth,img.height*ratio);
                fill(0,0,0);
                //textAlign(CENTER,CENTER);
                //text(this.card,this.x+this.width/2,this.y+this.height*textCenterVertical);
                
            }
        }
        else {
            //console.log(this)
        };
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
        console.log("You pressed this " + this.action);
    };
}