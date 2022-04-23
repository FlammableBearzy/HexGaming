const width = 1000;
const height = 500;

let attack = [];

let card1;
let card2;
let card3;

let testing;
function preload() {
    Attacks.preloadAction();
    card1 = new Attacks(100,100,0,0,6,1);
    card2 = new Attacks(100,100,100,0,6,2);
    card3 = new Attacks(100,100,200,0,10,3);
}

function setup() {
    var canvas = createCanvas(width, height);
    //kekw();
    //card.pepo();
}

function draw() {
    background(100);
    //console.log("Card People being drawn");
    card1.pepo();
    card2.pepo();
    card3.pepo();

    //console.log(testing);
    //cardWaman.draw();
}

function mouseClicked()
{
    card1.clicked(mouseX, mouseY);
    card2.clicked(mouseX, mouseY);
    card3.clicked(mouseX, mouseY);
}

async function kekw()
{
    testing = await play(1, 10);
}