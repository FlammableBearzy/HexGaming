const width = 1000;
const height = 500;

let attack = [];

let card1;
let card2;
let card3;
function preload() {
    Attacks.preloadImages();
    card1 = new Attacks(100,100,0,0,8,1);
    card2 = new Attacks(100,100,100,0,8,2);
    card3 = new Attacks(100,100,200,0,15,3);
}

function setup() {
    var canvas = createCanvas(width, height);
    //card.pepo();
}

function draw() {
    background(100);
    //console.log("Card People being drawn");
    card1.pepo();
    card2.pepo();
    card3.pepo();
    //cardWaman.draw();
}

function mouseClicked()
{
    card1.clicked(mouseX, mouseY);
    card2.clicked(mouseX, mouseY);
    card3.clicked(mouseX, mouseY);
}