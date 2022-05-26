//Canvas relatable
const width = 1000;
const height = 600;

//Board Related
let boardClass;
let newBoard = [];
let boardWidth = 6;
let boardHeight = 3;

//Trap
let traps = [];

//player
let player = [];
let playerRoomId = null;


//Movemet
let movementButtonArray = [];
let upArrow;
let downArrow;
let leftArrow;
let rightArrow;
let movementClass;

//Attacks
let attack = [];
let card1;
let card2;
let card3;

//Buttons
let choosePlayer1;
let choosePlayer2;
let reset;

let canClick = true;

//turn
let turnsClass;

let tester = false;
let parcela = null;

let cookies;

function preload() {
  Attacks.preloadAction();
    card1 = new Attacks(100,100,200,800,2,6,1);
    card2 = new Attacks(100,100,300,800,2,6,2);
    card3 = new Attacks(100,100,400,800,2,10,3);
}

function setup() {
  
  createCanvas(windowWidth, windowHeight);


  boardClass = new board();
  newBoard = boardClass.createBoard(boardWidth,boardHeight,200);

  player[1] =new playerCreator(newBoard[1], 150, "Blue",1);
  player[2] = new playerCreator(newBoard[18], 150, "Red", 2);
  turnsClass = new turn(1200,50, 200, player);
  Movement.StartGame(0, newBoard);
  console.log("Before Starting");
  Attacks.StartingActions(1); //insert player ID here
  console.log("After Starting");

  //movementClass = new Movement(player[playerRoomId].id, turnsClass);
  

  upArrow = new button("Up", 100,100,100,50,player);
  downArrow = new button("Down", 200,100,100,50,player);
  leftArrow = new button("Left", 300,100,100,50,player);
  rightArrow = new button("Right", 400,100,100,50,player);
  movementButtonArray.push(upArrow);
  movementButtonArray.push(downArrow);
  movementButtonArray.push(leftArrow);
  movementButtonArray.push(rightArrow);

  choosePlayer1 = new button("Player1", 100,50,100,50,player);
  choosePlayer2= new button("Player2", 200,50,100,50,player);
  reset = new button("Reset", 300,50,100,50,player);

  traps.push(new boardTrap(newBoard[7],1,1))
  traps.push(new boardTrap(newBoard[8],1,1))
  traps.push(new boardTrap(newBoard[15],1,1))
  traps.push(new boardTrap(newBoard[12],1,1))

  timerRefreshPage();

 
  let promise = ChipsAhoy.getMeCookies();
  promise.then(value => cookies = value);
  
}

function draw() {
  background(100);
  //resultTurn is a global variable present on the turns class. turns is declared in the set up
  if(resultTurn[1] != null && resultTurn[1].id == playerRoomId)
  {
    movementClass = new Movement(resultTurn[1].id);
  }
  Builder();

  if(playerRoomId == null)
  Selector();

  if(movementClass != null && resultTurn[1].id == playerRoomId)
  canClick = movementClass.movement(newBoard, movementButtonArray, player,canClick);
  if(mouseIsPressed == false)
  {
    canClick = true
  };

    card1.drawBase();
    card2.drawBase();
    card3.drawBase();
}


function Selector(){
  if(choosePlayer1.clicker(mouseX, mouseY, canClick && mouseIsPressed) && playerRoomId == null){
    playerRoomId = 1;
    canClick = false;
  }
  if(choosePlayer2.clicker(mouseX, mouseY, canClick && mouseIsPressed) && playerRoomId == null){
    playerRoomId = 2;
    canClick = false;
  }
  if(reset.clicker(mouseX, mouseY, canClick && mouseIsPressed) && playerRoomId == null){
    console.log("NEXT SCENE!");
    window.location.href = "loginScene.html";
    canClick = false;
  }
}

function Builder(){
  turnsClass.builder();

  newBoard = boardClass.createBoard(boardWidth,boardHeight,200);
  for (let i = 0; i < traps.length;i++){
    traps[i].placeTrap();
  }
  

  player[1].playerPlacer();
  player[2].playerPlacer();

  upArrow.buttonBuilder()
  downArrow.buttonBuilder()
  rightArrow.buttonBuilder()
  leftArrow.buttonBuilder()
  
  choosePlayer1.buttonBuilder()
  choosePlayer2.buttonBuilder()
  reset.buttonBuilder()
  //console.log(cookies)
}

function mouseClicked()
{
  card1.clicked(mouseX, mouseY);
  card2.clicked(mouseX, mouseY);
  card3.clicked(mouseX, mouseY);
}

function timerRefreshPage(){
  let currentPos = null;
  let posArray;
  setInterval(function () {
    
    if(currentPos == null || posArray[0] != null){
      console.log("Updating");
      currentPos = Movement.UpdatePositionsToClient();
    }
      console.log(currentPos.then(value => posArray = value));
  if(posArray != null){
    console.log(posArray[1] + posArray[0]);
    player[1].playerPlacer(newBoard[posArray[0]]);
    player[2].playerPlacer(newBoard[posArray[1]]);
  }
  }, 2000);
  
}

  






