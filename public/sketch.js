//Board Related
let boardClass;
let newBoard = [];
let boardWidth = 6;
let boardHeight = 3;

//Trap
let traps = [];

//player
let player = [];
let playerId = 1;
let playerRoomId = 0;


//Movemet
let movementButtonArray = [];
let upArrow;
let downArrow;
let leftArrow;
let rightArrow;
let movementClass;

//Buttons
let choosePlayer1;
let choosePlayer2;
let reset;

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

  choosePlayer1 = new button("Player1", 100,50,100,50,null);
  choosePlayer2= new button("Player2", 200,50,100,50,null);
  reset = new button("Reset", 300,50,100,50,null);

  traps.push(new boardTrap(newBoard[7],1,1))
  traps.push(new boardTrap(newBoard[8],1,1))
  traps.push(new boardTrap(newBoard[15],1,1))
  traps.push(new boardTrap(newBoard[12],1,1))
  
}

function draw() {
  
  newBoard = boardClass.createBoard(boardWidth,boardHeight,200);
  for (let i = 0; i < traps.length;i++){
    traps[i].placeTrap();
  }



  player[0].playerPlacer();
  player[1].playerPlacer();

  upArrow.buttonBuilder()
  downArrow.buttonBuilder()
  rightArrow.buttonBuilder()
  leftArrow.buttonBuilder()
  
  choosePlayer1.buttonBuilder()
  choosePlayer2.buttonBuilder()
  reset.buttonBuilder()

  Selector();


  canClick = movementClass.movement(newBoard, movementButtonArray, player,canClick);
  if (canClick == false){
    console.log("Hehhehe");
    //movementClass.GetCurrentParcel(playerId);
  }
  if(mouseIsPressed == false){
    canClick = true};
}
function Selector(){
  if(choosePlayer1.clicker(mouseX, mouseY, canClick && mouseIsPressed)){
    console.log("Player1");
    canClick = false;
  }
  if(choosePlayer2.clicker(mouseX, mouseY, canClick && mouseIsPressed)){
    console.log("Player2");
    canClick = false;
  }
  if(reset.clicker(mouseX, mouseY, canClick && mouseIsPressed)){
    console.log("Reset");
    canClick = false;
  }
}
  






