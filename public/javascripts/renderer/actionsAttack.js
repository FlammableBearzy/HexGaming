class Attacks {
    static attackImage = {};
    constructor(width, height, x, y, cooldown){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.card = card;
    };

    static initImgs(imgHash){
        Attacks.attackImage = imgHash;
    };

    draw() {
        fill(100,100,100);
        stroke(0,0,0);     
        rect (this.x,this.y,this.width,this.height,5,5,5,5);

        if (this.card){
            
        }
    }
}