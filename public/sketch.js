let bb;
function setup() {
  
  createCanvas(window.innerWidth, window.innerHeight);
  bb = new boardBlockClass(100,100,100,100);
}

function draw() {
  background(220);
  bb.builder()
}
