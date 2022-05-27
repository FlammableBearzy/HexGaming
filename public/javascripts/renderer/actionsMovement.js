const movImgCenterVertical = 0.4;
const movImgRelWidth = 0.6;
const movTextCenterVertical = 0.8;

let actionId;
let parcel;
let res;

class Movement {
    
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
    static async GetPlayerPositions()
    {
      let parcels = await GetPlayersPositions();
      //console.log(parcels);
      return parcels;
    }
    static async UpdateDirection(direction, cookie)
    {
        await play(direction, cookie)
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
    
    movement(board, arrows,player, canClick, cookie){
        let upArrow = arrows[0];
        let downArrow = arrows[1];
        let leftArrow = arrows[2];
        let rightArrow = arrows[3];
        let newBoard = board;
        if(upArrow.clicker(mouseX, mouseY, canClick && mouseIsPressed)){
          //player[this.id].playerPlacer(newBoard[player[this.id].parcel.parcelId - boardWidth]);
          Movement.UpdateDirection("Up", cookie);
         
          return false;
        }
        if(rightArrow.clicker(mouseX, mouseY, canClick && mouseIsPressed)){
          Movement.UpdateDirection("Right", cookie);
          console.log("Clicked right");
          
          return false;
        }
        if(leftArrow.clicker(mouseX, mouseY, canClick && mouseIsPressed)){
          Movement.UpdateDirection("Left", cookie);
          
          return false;
        }
        if(downArrow.clicker(mouseX, mouseY, canClick && mouseIsPressed)){
          Movement.UpdateDirection("Down", cookie);
         
          return false;
        }
      }
      
      

    

    
}