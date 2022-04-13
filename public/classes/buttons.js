class button{
    constructor(text,x,y,w,h,sprite){
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.centerx = x + w/2;
        this.centery = y + h/2;
        this.sprite = sprite;
    }
    
    buttonBuilder(){
        if (this.sprite == null){
        fill("White")
        rect(this.x, this.y, this.w, this.h);
        fill("Black")
        text(this.text,this.centerx, this.centery)
        }
    }
    clicker(mouseX, mouseY, is_Clicked){
        if((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h) && is_Clicked){
            return true;
        } else {return false;}
    }
    

}