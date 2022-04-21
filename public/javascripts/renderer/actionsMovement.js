const movImgCenterVertical = 0.4;
const movImgRelWidth = 0.6;
const movTextCenterVertical = 0.8;

let actionId;
let parcel;

class Movement {
    constructor(id){
        this.id = id; 
    }
    static async GetCurrentParcel(id)
    {
        let action = await getActions();
        for (let i of action)
        {
          if(i.mov_player_id == id)
          {
            parcel = i.mov_parcel;
            return parcel;
          }
        }        
    }; 
    
    movement(board, arrows,player, canClick){
        let upArrow = arrows[0];
        let downArrow = arrows[1];
        let leftArrow = arrows[2];
        let rightArrow = arrows[3];
        let newBoard = board;
        if(upArrow.clicker(mouseX, mouseY, canClick && mouseIsPressed)){
          player[this.id].playerPlacer(newBoard[player[this.id].parcel.parcelId - boardWidth]);
          return false;
        }
        if(rightArrow.clicker(mouseX, mouseY, canClick && mouseIsPressed)&& (player[this.id].parcel.parcelId) % boardWidth != 0){
          player[this.id].playerPlacer(newBoard[player[this.id].parcel.parcelId + 1]);
          return false;
        }
        if(leftArrow.clicker(mouseX, mouseY, canClick && mouseIsPressed) && (player[this.id].parcel.parcelId - 1) % boardWidth != 0){
          player[this.id].playerPlacer(newBoard[player[this.id].parcel.parcelId - 1]);
          return false;
        }
        if(downArrow.clicker(mouseX, mouseY, canClick && mouseIsPressed)){
          player[this.id].playerPlacer(newBoard[player[this.id].parcel.parcelId + boardWidth]);
          return false;
        }
      }

    

    
}