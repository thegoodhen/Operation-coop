var player;
var santa;
var buildingCtrl;
var scoreCtrl;
var gameCtrl;
var spritesheet;
var backgroundCtrl1;
var backgroundCtrl2;

function preload()
{
    spritesheet=loadImg('/snow/flakes32.png')
}

function setup() {
  // put setup code here
  new Canvas(800,600);
  console.log("KVOK!");
  //world.gravity.y=10;
  player=new Chicken();
  santa=new Santa();
  floor=new Sprite();
  floor.draw= ()=>{};
  backgroundCtrl1=new backgroundControl([209,209,250],1);
  backgroundCtrl2=new backgroundControl([175,175,242],2);
  //backgroundCtrl=new backgroundControl([0,50,70],3);
  buildingCtrl=new buildingControl();
  scoreCtrl=new scoreControl();
  gameCtrl=new gameControl();
  floor.w=1000;
  floor.h=10;
  floor.y=560;
  floor.collider='static';
  song = loadSound("/music/jingle_bells.mp3")
  song.setVolume(0.4)
}

function draw() {
  background([20,20,200]);
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
    if(!song.isPlaying())
    {
      song.play();
    }
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
