class boardParcel{
  constructor(x,y,w,h,parcelId){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.parcelId = parcelId;
  this.centerx = x + w/2;
  this.centery = y + h/2;
  }

  builder() {
    rect(this.x,this.y,this.w, this.h);
    text(this.parcelId, this.centerx, this.centery, 40)
  }
}

class board{
    
    createBoard(sizeX,sizeY,squareSize){
      let board = [];
      let i = 1;
      for (let y = 1; y <= sizeY; y++){
        for (let x = 1; x <= sizeX; x++ ){
              let bp = new boardParcel(squareSize* x,squareSize *y,squareSize,squareSize, i)
              bp.builder()
              board[i] = bp;
              i++;
        }
      }
      return board;
    }
}

class boardTrap{
    constructor(parcel, effect, triggerTime){
        this.parcel = parcel;
        this.effect = effect;
        this.triggerTime = triggerTime;
    }
    
    placeTrap(){
      fill("Green");
      rect(this.parcel.x,this.parcel.y,this.parcel.w,this.parcel.h);
      
    }
}