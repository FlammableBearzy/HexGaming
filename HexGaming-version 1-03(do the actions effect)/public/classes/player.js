class playerCreator{
    constructor(parcel, size, color){
        this.parcel = parcel;
        this.size = size;
        this.color = color;
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
    attackplacer(newParcel){
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