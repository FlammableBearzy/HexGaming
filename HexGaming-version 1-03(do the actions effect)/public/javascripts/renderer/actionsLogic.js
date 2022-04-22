let ActionID;
let ActionName;
let ActionCooldown;
let attackanimationX= width / 2;;
let attackanimationY= height; 
let parcel;
let cards=[]
//logic of the attacks of the cards
class logicA{
    constructor(id){
        this.id=id
    }
    
    static async getCurrentParcel()
    {
        let action = await getActions();
        for (let i of action)
        {
            ActionID = i.att_action_id;
            ActionName = i.att_action_name;
            ActionCooldown = i.att_action_cooldown;
            parcel = i.mov_parcel;
        }
    }; 
    drawattack(attackanimationX,attackanimationY,){
        stroke(50);
        fill(100);
        ellipse(attackanimationX, attackanimationY, parcel.parcelId.x,parcel.parcelId.y);
        
    }
    Vattack(board, canClick){
        let Vattack= cards[2]
        let newBoard=board
        switch (Vattack.clicker(mouseX, mouseY, canClick && mouseIsPressed)) {
            case 0:
                cards[this.id].attackplacer(newBoard[cards[this.id].parcel.parcelId - boardWidth]);
                drawattack(attackanimationX,attackanimationY)
                break;
            case 1:
                cards[this.id].attackplacer(newBoard[cards[this.id].parcel.parcelId + boardWidth]);    
    }
}
    Hattack(board, canClick){
        let Hattack= cards[1]
        let newBoard= board
        switch((Hattack.clicker(mouseX, mouseY, canClick && mouseIsPressed) && (cards[this.id].parcel.parcelId - 1) % boardWidth != 0)){
                case 0 :
                cards[this.id].attackplacer(newBoard[cards[this.id].parcel.parcelId - 1]);
                break;
                case 1:
                    cards[this.id].attackplacer(newBoard[cards[this.id].parcel.parcelId + 1]);

    }
    }
    bomb(board, canClick){
        newBoard= board
        let bomb=cards[3]
        if(bomb.clicker(mouseX, mouseY, canClick && mouseIsPressed )&& (bomb[this.id].parcel.parcelId) % boardWidth != 0 && (cards[this.id].parcel.parcelId - 1)){
            cards[this.id].attackplacer(newBoard[player[this.id].parcel.parcelId - boardWidth]);
            return false;
      }
    }
}