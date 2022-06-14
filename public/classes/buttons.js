
class button{
    constructor(text,x,y,w,h,actionButton){
        this.text = text;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.centerx = x + w/2;
        this.centery = y + h/2;
        this.actionButton = actionButton;
        
    }
    
    buttonBuilder(){
        
        fill("White")
        rect(this.x, this.y, this.w, this.h);
        fill("Black")
        text(this.text,this.x, this.centery)
        
    }
    clicker(mouseX, mouseY, is_Clicked){
        if((mouseX > this.x && mouseX < this.x + this.w) && (mouseY > this.y && mouseY < this.y + this.h) && is_Clicked){
            if(this.actionButton)
            //TurnManager.nextTurn();
            return true;
        } else
        {
            return false;
        }
    }
    

}