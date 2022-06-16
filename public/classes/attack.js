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
