const movImgCenterVertical = 0.4;
const movImgRelWidth = 0.6;
const movTextCenterVertical = 0.8;

let actionId;
let parcel;
let res;

class Movement {
    constructor(id){
        this.id = id; 
    }
    static async GetCurrentParcel(id)
    {
        let action = await getActions();
        
        for (let i of action[1])
        {
          
          if(i.mov_player_id == id)
          {
            return i.mov_action_parselid;
          }
        }        
    }; 
    static async UpdateDirection(direction, newBoard, player, thisMovement)
    {
        
        let id = await this.GetCurrentParcel(1);
        if(id != null){
          parcel = await play(1,id,1, direction);
          console.log(thisMovement.id);
          player[thisMovement.id].playerPlacer(newBoard[id + direction]);
          return parcel;
        }
    }; 
    static async StartGame(id,newBoard)
    {
          parcel = await play(1,1,1, 0);
          player[1].playerPlacer(newBoard[1]);
          let parcel2 = await play(2,18,1, 0);
          player[2].playerPlacer(newBoard[18]);
    };
    static async UpdatePositionsToClient()
    {
        let parcelID1 = await this.GetCurrentParcel(1);
        let parcelID2 = await this.GetCurrentParcel(2);
        return [parcelID1, parcelID2];
    } 
    
    movement(board, arrows,player, canClick){
        let upArrow = arrows[0];
        let downArrow = arrows[1];
        let leftArrow = arrows[2];
        let rightArrow = arrows[3];
        let newBoard = board;
        if(upArrow.clicker(mouseX, mouseY, canClick && mouseIsPressed)){
          //player[this.id].playerPlacer(newBoard[player[this.id].parcel.parcelId - boardWidth]);
          Movement.UpdateDirection(-boardWidth, newBoard, player, this);
          return false;
        }
        if(rightArrow.clicker(mouseX, mouseY, canClick && mouseIsPressed)&& (player[this.id].parcel.parcelId) % boardWidth != 0){
          Movement.UpdateDirection(1, newBoard, player, this);
          return false;
        }
        if(leftArrow.clicker(mouseX, mouseY, canClick && mouseIsPressed) && (player[this.id].parcel.parcelId - 1) % boardWidth != 0){
          Movement.UpdateDirection(-1, newBoard, player, this);
          return false;
        }
        if(downArrow.clicker(mouseX, mouseY, canClick && mouseIsPressed)){
          Movement.UpdateDirection(boardWidth, newBoard, player, this);
          return false;
        }
      }
      
      

    

    
}