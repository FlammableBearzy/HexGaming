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

    static async preloadAction()
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

    async actionsCooldown()
    {
        let action = await this.getAction();
        for (let i of action)
        {
            ActionCooldown = i.att_action_cooldown;
            console.log(ActionCooldown);
        }

        /*
        let action = await getActions();
        for (let i of action)
        {
            ActionCooldown = i.att_action_cooldown;
            // temp = i.att_action_cooldown;
            // console.log("Pepo1" + ActionID);
            // ActionaCooldown = this.cooldown;
            // this.cooldown = cooldown
            console.log("Pepo2" + ActionID);
        }

        if (this != undefined && ActionCooldown != undefined)
        {

            console.log(ActionCooldown);
            // cooldown--;
            // if (cooldown == -1)
            // {
            //     cooldown = temp;
            // }
            // console.log(this.cooldown);
            return;
        }
        */
        //return 1;
    }

    
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
            console.log("This has been pressed");
            console.log(Attacks.attackCooldown);
            if(Attacks.attackCooldown != undefined)
            {
                try{
                    console.log("Went through");
                } catch (err) {
                    console.log("got an error");
                }
            }
        }
        
    };

}