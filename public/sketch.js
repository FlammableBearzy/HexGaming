//Board Related
let boardClass;
let newBoard = [,];

//Trap
let traps = [];
function setup() {
  
  createCanvas(window.innerWidth, window.innerHeight);
  boardClass = new board();

  newBoard = boardClass.createBoard(5,3,150);
  traps.push(new boardTrap(newBoard[3],1,1))
  traps[0].placeTrap();
}

function draw() {
    
}
