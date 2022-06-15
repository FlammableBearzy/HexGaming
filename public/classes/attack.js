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
}