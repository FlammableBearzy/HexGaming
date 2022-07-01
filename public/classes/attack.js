class attackCreator{
    constructor(parcel, size, color, id)
    {
        this.parcel = parcel;
        this.size = size;
        this.color = color;
        this.id = id;
    }

    attackplacer(newParcel)
    {
        console.log("Before if in attackplacer");
        if(newParcel != null)
        {
            console.log("Inside if in attackplacer");
            this.parcel = newParcel;
            fill(this.color)
            circle(this.parcel.centerx, this.parcel.centery, this.size)
        }
        else
        {
            console.log("Inside else in attackplacer");
            fill(this.color)
            circle(this.parcel.centerx, this.parcel.centery, this.size)
        }
    }

    HorizontalAttack(board)
    {
        let row = RowCalculator(this.parcel.parcelId);
        for(let i = 1; i < board.length; i++)
        {
            if(RowCalculator(board[i].parcelId) == row)
            damageParcels.push(board[i]);
        }
        
    }
    BombAttack(board)
    {
            damageParcels.push(board[this.parcel.parcelId]);
            if(this.parcel.parcelId != 6 && this.parcel.parcelId != 12 && this.parcel.parcelId != 18)
            damageParcels.push(board[this.parcel.parcelId+1]);
            if(this.parcel.parcelId != 1 && this.parcel.parcelId != 7 && this.parcel.parcelId != 13)
            damageParcels.push(board[this.parcel.parcelId -1]);
            if(this.parcel.parcelId < 13)
            damageParcels.push(board[this.parcel.parcelId +6]);
            if(this.parcel.parcelId > 6)
            damageParcels.push(board[this.parcel.parcelId - 6]);
    }
    VerticalAttack(board)
    {
        let collum = CollumCalculator(this.parcel.parcelId);
        for(let i = 1; i < board.length; i++)
        {
            if(CollumCalculator(board[i].parcelId) == collum)
            {
                damageParcels.push(board[i]);
            }
        }
    }
    
}
function AttackDisplayer()
{
    if(traps.length == 0)
      {
        
        for(let i = 0; i < damageParcels.length; i++){
          console.log("Traps");
          traps.push(new boardTrap(damageParcels[i],1,1));
        }
        
      }
      else
      {
        traps = [];
        damageParcels = [];
      }
}
