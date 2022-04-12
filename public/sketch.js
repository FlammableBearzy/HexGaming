//Board Related
let boardClass;
let newBoard = [];

//Trap
let traps = [];

//player
let player1;
let player2;
function setup() {
  
  createCanvas(window.innerWidth, window.innerHeight);
  boardClass = new board();
  
  newBoard = boardClass.createBoard(6,3,150);

  player1 = new playerCreator(newBoard[1], 75, "Blue");
  player2 = new playerCreator(newBoard[18], 75, "Red");
  traps.push(new boardTrap(newBoard[7],1,1))
  traps.push(new boardTrap(newBoard[8],1,1))
  traps.push(new boardTrap(newBoard[15],1,1))
  traps.push(new boardTrap(newBoard[12],1,1))
  
}

function draw() {
  newBoard = boardClass.createBoard(6,3,150);
  player1.playerPlacer();
  player2.playerPlacer();
  for (let i = 0; i < traps.length;i++){
    traps[i].placeTrap();
  }
}
