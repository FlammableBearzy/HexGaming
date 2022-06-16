

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
let damageParcels = [];


let canClick = true;

//turn
let turnsClass;
let canPlay;
let currentTurn = null;
let turnsText;


let tester = false;
let parcela = null;

//Room
let room = null;
let roominfo = null;
let cookies = null;
let whoIsPlaying = null; 


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

  player[1] = new playerCreator(newBoard[1], 150, "Blue",1);
  player[2] = new playerCreator(newBoard[18], 150, "Red", 2);
  attack[1] = new attackCreator(newBoard[3], 150, "Green", 1)
  attack[2] = new attackCreator(newBoard[3], 150, "Red", 2)
  //turnsClass = new turn(1200,50, 200, player);
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

  
  


  timerRefreshPage();

 
  let promise = ChipsAhoy.getMeCookies();
  promise.then(value => cookies = value);
  //TurnManager.getTurns();
 

  room = RoomManager.getRoom();
  //attack[1].HorizontalAttack(newBoard);
  attack[2].VerticalAttack(newBoard);

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
  
  if(player1Pos != null)
  player[1].playerPlacer(newBoard[player1Pos]);
  if(player2Pos != null)
  player[2].playerPlacer(newBoard[player2Pos]);
}




function Builder(){
  if(roominfo != null){
  
  fill("Black");
  textSize(30);
  turnsText = text("Number of actions done: " + roominfo.rows[0].room_turns + "\nCurrently playing: " + whoIsPlaying,windowWidth/2,100);
  }
  textSize(20);

  newBoard = boardClass.createBoard(boardWidth,boardHeight,200);
  for (let i = 0; i < traps.length;i++){
    traps[i].placeTrap();
  }
  
  
  textSize(20);
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
  setInterval( function () {
      AttackDisplayer();

      
      room = RoomManager.getRoom();
      let promiseResult;
      currentPos = Movement.GetPlayerPositions();
      if(currentPos != undefined){
        
        currentPos.then(value => {
          if(room != null){
            if(playerRoomId != null){

              if(value.rows[0].mov_player_id == cookies.userId)
              {
                if(playerRoomId == 1){
                  player1Pos = value.rows[0].mov_action_parselid;
                  player2Pos = value.rows[1].mov_action_parselid;
                }
                else
                {
                  player1Pos = value.rows[1].mov_action_parselid;
                  player2Pos = value.rows[0].mov_action_parselid;
                }
              }

              if(value.rows[1].mov_player_id == cookies.userId)
              {
                if(playerRoomId == 1){
                  player1Pos = value.rows[1].mov_action_parselid;
                  player2Pos = value.rows[0].mov_action_parselid;
                }
                else
                {
                  player1Pos = value.rows[0].mov_action_parselid;
                  player2Pos = value.rows[1].mov_action_parselid;
                }
            }
          }
          
          }
        });
      }
      //console.log(cookies);
  }, 1000);
  
}
/*class TurnManager
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
}*/
function PlayerIdentifier(room)
{
    if(cookies != null)
    {
      if(cookies.userId == room.rows[0].room_player1_id)
        playerRoomId = 1;
        else
        playerRoomId = 2;
    }
}

class RoomManager{

  static async getRoom()
  {
    
    let room = await getRoom();
    PlayerIdentifier(room);
    roominfo = room;
    if(cookies != null){
      if(room.rows[0].room_lastturnplayer_id == cookies.userId)
      {
        whoIsPlaying = "You!";
      }
      else whoIsPlaying = "Other Player";
    }
    
    currentTurn = room.rows[0].room_turns;
  }  
  
}
