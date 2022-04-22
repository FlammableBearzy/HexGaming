var ActionID = [];
var ActionName = [];

var puta =  getActions();
// spacing horizontally will be relative to card width and to width space
const spaceBetweenCards = 1;
const cardSpaceToBorder = 0.5;

// spacing on top and bottom are in pixels, since we need to place text there
const topSpace = 60;
const bottomSpace = 90;

class CardManager
{
    constructor(width, height, x, y, ActionID)
    {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;

        let nCards = 1 + ActionID.length;

        this.cardWidth = width / (nCards + cardSpaceToBorder * 2 + spaceBetweenCards);
        this.cardHeight = height - topSpace - bottomSpace;

        this.cardValues = [];
        for (let id in ActionID)
        {
            this.cardValues.push(new Attacks(this.cardWidth, this.cardHeight, x + this.cardWidth * cardSpaceToBorder + id * this.cardWidth, y + topSpace, 8, ActionID[id]));
        }

    };


    
/*    static async preloadImages()
    {
        let attackImage = {};
        let action = await getActions();
        for (let i of action)
        {
            let ActionID = i.att_action_id;
            let ActionName = i.att_action_name;
            ActionID.push(ActionID);
            ActionName.push(ActionName);
            attackImage[ActionName, ActionID] = loadImage('./images/' + ActionName + ActionID + '.png');
        }
        Attacks.initImgs(attackImage);
    };
*/
};