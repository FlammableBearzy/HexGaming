let ActionID;
let ActionName;
let ActionCooldown;

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
//Serves to get the images for the cards
    static async preloadImages()
    {
        let attackImage = {};
        let action = await getActions();
        for (let i of action)
        {
            ActionID = i.att_action_id;
            ActionName = i.att_action_name;
            ActionCooldown = i.att_action_cooldown;
            attackImage[ActionID] = loadImage('./images/' + ActionName + ActionID + '.png');
        }
        Attacks.initImgs(attackImage);
    }; 

    static initImgs(imgHash){
        Attacks.attackImage = imgHash;
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
                let offsetX = this.width / 2;
                let offsetY = this.height / 2;
                //console.log(Attacks.attackImage[this.action]);
                //let ratio = (this.width * imgRelWidth) / img.width;
                image(img,this.x +(this.action * 1/2) + offsetX, this.y + this.height - offsetY, this.width, this.height);
                fill(0,0,0);
                //textAlign(CENTER,CENTER);
                //text(this.card,this.x+this.width/2,this.y+this.height*textCenterVertical);
            }
        }
        else {
            //console.log(this)
        };
    };
//Checks the cooldown of the attacks
    setAction(action)
    {
        //this.cooldown = att_action_cooldown;
        this.action = action;
    };

    getAction()
    {
        return this.action;
    };

    clicked(x, y)
    {
        if(x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height))
        {
            console.log("You pressed this " + this.action);

            if (this != undefined)
            {
                this.cooldown--;
                if (this.cooldown == -1)
                {
                    this.cooldown = 8;
                }
                console.log(this.cooldown);
                //This currently has an error of undefined.
                //console.log(att_action_cooldown);
                return;
            }

        }
        
    };

    updateCooldown(cooldown)
    {
        this.cooldown = cooldown;
        
        let ClickUpdate;

        //if (this != undefined && Attacks.attackImage != undefined)
    };

}