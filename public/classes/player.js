class playerCreator{
    constructor(parcel, size, color){
        this.parcel = parcel;
        this.size = size;
        this.color = color;
    }
    
    playerPlacer()
    {
        fill(this.color)
        circle(this.parcel.centerx, this.parcel.centery, this.size)
    }
}