//Board Related
let boardClass;
let newBoard = [];
let boardWidth = 6;
let boardHeight = 3;

//Trap
let traps = [];

//player
let player = [];
let playerRoomId = 0;


//buttons
let upArrow;
let downArrow;
let leftArrow;
let rightArrow;
let movementClass;
let movementButtonArray = [];

let canClick = true;


function setup() {
  
  createCanvas(windowWidth, windowHeight);
  boardClass = new board();
  
  newBoard = boardClass.createBoard(boardWidth,boardHeight,200);

  player.push (new playerCreator(newBoard[1], 150, "Blue"));
  player.push(new playerCreator(newBoard[18], 150, "Red"));
  movementClass = new Movement(playerRoomId);

  upArrow = new button("Up", 100,100,100,50,null);
  downArrow = new button("Down", 200,100,100,50,null);
  leftArrow = new button("Left", 300,100,100,50,null);
  rightArrow = new button("Right", 400,100,100,50,null);
  movementButtonArray.push(upArrow);
  movementButtonArray.push(downArrow);
  movementButtonArray.push(leftArrow);
  movementButtonArray.push(rightArrow);

  traps.push(new boardTrap(newBoard[7],1,1))
  traps.push(new boardTrap(newBoard[8],1,1))
  traps.push(new boardTrap(newBoard[15],1,1))
  traps.push(new boardTrap(newBoard[12],1,1))
  
  player[0].playerPlacer();
  player[1].playerPlacer();

  upArrow.buttonBuilder()
  downArrow.buttonBuilder()
  rightArrow.buttonBuilder()
  leftArrow.buttonBuilder()


  canClick = movementClass.movement(newBoard, movementButtonArray, player,canClick);
  if (canClick == false){
    console.log("Hehhehe");
  }
  if(mouseIsPressed == false){
    canClick = true};
}

function draw() {
  
  newBoard = boardClass.createBoard(boardWidth,boardHeight,200);
  for (let i = 0; i < traps.length;i++){
    traps[i].placeTrap();
  }



  player[0].playerPlacer();
  player[1].playerPlacer();
  


  movement();
  if(mouseIsPressed == false){
    canClick = true};
    
  
}



