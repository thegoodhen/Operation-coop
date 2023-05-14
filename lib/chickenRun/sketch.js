var player;
var santa;
var buildingCtrl;
var scoreCtrl;
var gameCtrl;

function setup() {
  // put setup code here
  new Canvas(800,600);
  console.log("KVOK!");
  //world.gravity.y=10;
  player=new Chicken();
  santa=new Santa();
  floor=new Sprite();
  floor.draw= ()=>{};
  backgroundCtrl=new backgroundControl([0,200,250],1);
  backgroundCtrl=new backgroundControl([0,100,170],2);
  backgroundCtrl=new backgroundControl([0,50,70],3);
  buildingCtrl=new buildingControl();
  scoreCtrl=new scoreControl();
  gameCtrl=new gameControl();
  floor.w=1000;
  floor.h=10;
  floor.y=560;
  floor.collider='static';
}

function draw() {
  background(220);
  if(kb.pressing('left'))
  {
    player.moveLeft();
  }
  if(kb.pressing('right'))
  {
    player.moveRight();
  }
  if(kb.pressing('up'))
  {
    player.moveUp();
  }
  if(kb.pressing('down'))
  {
    player.moveDown();
  }
  if(kb.pressing('enter'))
  {
    player.reset();
    gameCtrl.reset();
    buildingCtrl.reset();
    scoreCtrl.reset();
  }
  player.step();
  santa.step();
  buildingCtrl.step();
  // put drawing code here
  
  //fill('white')
  //clear();
  //rect(0,0,800,600);
}
