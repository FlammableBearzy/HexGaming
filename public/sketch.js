//Board Related
let boardClass;
let newBoard = [];

//Trap
let traps = [];
function setup() {
  
  createCanvas(window.innerWidth, window.innerHeight);
  boardClass = new board();

  newBoard = boardClass.createBoard(6,3,150);
  traps.push(new boardTrap(newBoard[7],1,1))
  traps.push(new boardTrap(newBoard[8],1,1))
  traps.push(new boardTrap(newBoard[15],1,1))
  traps.push(new boardTrap(newBoard[12],1,1))
  
}

function draw() {
  for (let i = 0; i < traps.length;i++){
    traps[i].placeTrap();
  }
}
