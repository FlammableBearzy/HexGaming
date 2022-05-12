let playerIdentifier = null;
class playerCreator{
    constructor(parcel, size, color, id){
        this.parcel = parcel;
        this.size = size;
        this.color = color;
        this.id = id;
    }
    
    
    playerPlacer(newParcel)
    {
        if(newParcel != null){
        this.parcel = newParcel;
        fill(this.color)
        circle(this.parcel.centerx, this.parcel.centery, this.size)
        }
        else
        {
            fill(this.color)
            circle(this.parcel.centerx, this.parcel.centery, this.size)
        }
    }
}