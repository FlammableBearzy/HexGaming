let resultTurn = [];
class turn{
    constructor(x,y,size, player){
        this.x = x;
        this.y = y;
        this.size = size;
        this.centerx = this.x + (this.size/2);
        this.centery = this.y + (this.size/2);
        this.currentTurn = 0;
        this.turnCounter = 0;
        this.index = 0;
        this.player = player;
    }
    builder(){
        fill("White");
        rect(this.x, this.y, this.size, this.size);
        fill("Black");
        text("Current turn:\n" + this.currentTurn,this.centerx, this.centery);
    }

    nextTurn(){
        console.log("In turns");
        
        this.currentTurn++;
        this.turnCounter++;
        if(this.turnCounter == 2){
            if(this.index == 0) this.index = 1; else this.index = 0;
            this.turnCounter = 0;
        }
        resultTurn[0] = this.currentTurn;
        resultTurn[1] =this.player[this.index];
        console.log(resultTurn[1].id);
    }


}