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
let player1Pos;
let player2Pos;


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


let canClick = true;

//turn
let turnsClass;
let canPlay;
let currentTurn;


let tester = false;
let parcela = null;

let cookies = null;

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
  //Movement.StartGame(0, newBoard);

  console.log("Before Starting");
  Attacks.StartingActions(1); //insert player ID here
  console.log("After Starting");

  movementClass = new Movement();
  

  upArrow = new button("Up", 100,100,100,50,player);
  downArrow = new button("Down", 200,100,100,50,player);
  leftArrow = new button("Left", 300,100,100,50,player);
  rightArrow = new button("Right", 400,100,100,50,player);
  movementButtonArray.push(upArrow);
  movementButtonArray.push(downArrow);
  movementButtonArray.push(leftArrow);
  movementButtonArray.push(rightArrow);

  

  traps.push(new boardTrap(newBoard[7],1,1))
  traps.push(new boardTrap(newBoard[8],1,1))
  traps.push(new boardTrap(newBoard[15],1,1))
  traps.push(new boardTrap(newBoard[12],1,1))

  timerRefreshPage();

 
  let promise = ChipsAhoy.getMeCookies();
  promise.then(value => cookies = value);
  TurnManager.getTurns();
}

function draw() {
  background(100);
  
  
  Builder();

  if(movementClass != null)
  canClick = movementClass.movement(newBoard, movementButtonArray, player,canClick, cookies);

  if(mouseIsPressed == false)
  {
    canClick = true
  };

    card1.drawBase();
    card2.drawBase();
    card3.drawBase();

  if(cookies != null)
  {
    playerRoomId = cookies.userId;
  }
  if(player1Pos != null)
  player[1].playerPlacer(newBoard[player1Pos]);
  if(player2Pos != null)
  player[2].playerPlacer(newBoard[player2Pos]);
  
}




function Builder(){
  turnsClass.builder();

  newBoard = boardClass.createBoard(boardWidth,boardHeight,200);
  for (let i = 0; i < traps.length;i++){
    traps[i].placeTrap();
  }
  
  

  upArrow.buttonBuilder()
  downArrow.buttonBuilder()
  rightArrow.buttonBuilder()
  leftArrow.buttonBuilder()
  
 
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
    TurnManager.getTurns();
      let promiseResult;
      currentPos = Movement.GetPlayerPositions();
      if(currentPos != undefined){
        
        currentPos.then(value => {
          player1Pos = value.rows[0].mov_action_parselid;
          player2Pos = value.rows[1].mov_action_parselid;
        });
      
        
      }
      console.log(cookies);
  }, 1000);
  
}
class TurnManager
{
  static async getTurns()
  {
      let turnsGet = await getTurn();
      if(turnsGet != undefined)
      currentTurn = turnsGet.rows[0].room_turns;
  }
  static async nextTurn(cookie)
  {
      await turnChanger(cookie);
  }
}

  






