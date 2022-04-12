class boardBlockClass{
  constructor(x,y,w,h){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.centerx = x + w/2;
  this.centery = y + h/2;
  }

  builder() {
      rect(this.x,this.y,this.w, this.h);
  }
}