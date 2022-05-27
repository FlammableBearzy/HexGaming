
let ActionID;
let ActionName;

let PlayerID;
let IngameAction;
let IngameCooldown;

let PlayableCard = true;

const imgCenterVertical = 0.4;
const imgRelWidth = 0.6;
const textCenterVertical = 0.8;


class Attacks {
    constructor(width, height, x, y, id, cooldown, action){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.id = id;
        this.cooldown = cooldown;
        this.action = action;
    };

    static async preloadAction()
    {
        
        let attackImage = {};
        let action = await getActions();
        for (let i of action[0])
        {
            ActionID = i.att_action_id;
            ActionName = i.att_action_name;
            attackImage[ActionID] = loadImage('./images/' + ActionName + ActionID + '.png');
        }
        Attacks.initImgs(attackImage);
        
    }; 

    static initImgs(imgHash){
        Attacks.attackImage = imgHash;
    };

    drawBase() {
        //console.log("ActionAttack Drawn Called")
        //console.log ("Prior If " + this.action);        
        if (this != undefined && Attacks.attackImage != undefined && this.id != undefined)
        {
            //console.log(this.action);
            //if(this.action)
            {
                imageMode(CENTER);
                let img = Attacks.attackImage[this.action];
                let offsetX = this.width / 2;
                let offsetY = this.height / 2;
                //console.log(Attacks.attackImage[this.action]);
                //let ratio = (this.width * imgRelWidth) / img.width;
                image(img,this.x +(this.action * 1/2) + offsetX, this.y + this.height - offsetY, this.width, this.height);
                fill(0,0,0);
                textAlign(CENTER,CENTER);
                textSize(30);
                text(this.action,this.x+this.width/2,this.y+this.height*3/2*textCenterVertical);

                textSize(12);
                textAlign(LEFT);

                //console.log(this.id);
            }
        }
        else {
            //console.log(this)
        };
    };

    static async StartingActions(id)
    {
        let iniCard = await postResetCooldown(id);
        //console.log(iniCard);
        return iniCard;
    };

    static async UpdateActionsPerRound(id, action)
    {
        let iniCard = await postUpdateAttackCooldownByPlayer(id, action);
        // if( cooldown != undefined )
        // {
        //     console.log(iniCard);
        //     if(this.action = action)
        //     {
        //         for (let i of iniCard)
        //         {
        //             console.log(i);
        //             //console.log(iniCard);
        //             let actionCooldown = i.att_action_cooldown;
        //             console.log("Inside first if");
        //             if( this.cooldown == actionCooldown)
        //             {
        //                 console.log("if they match");
        //                 PlayableCard = true;
        //             } else {
        //                 console.log("if they dont match");
        //                 console.log(actionCooldown)
        //                 cooldown++;
        //                 console.log(cooldown);
        //                 PlayableCard = false;
        //             }
        //             console.log("End");
        //         }
                return iniCard;
        //  }

        //}
        //return [iniCard, this.cooldown];

    }


    clicked(x, y)
    {
        if(x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height))
        {
            console.log("This has been pressed " + this.action);
            Attacks.UpdateActionsPerRound(this.id, this.action, this.cooldown);
        }    
    };
}