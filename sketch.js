var flappy,flappyImg;
var bg6,ground,bg6Img,groundImg;
var gameOver,gameOverImg;
var  pipe1,pipe2,pipe1Img,pipe2Img
var restart,restartImg;
var score;
var coin, coinImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jumpSound , checkPointSound , gmSound


function preload(){
   flappyImg = loadImage("flappy1.png");
   
   bg6Img = loadImage("bg6.jfif")

   gameOverImg = loadImage("game over.png") 
   restartImg = loadImage("restart.png")
   
   pipe1Img = loadImage("upper pipes.png")
   pipe2Img = loadImage("down pipes.png")

   coinImg = loadImage("coin.png")
   
  groundImg = loadImage("fg.png")

  jumpSound = loadSound("jump.mp3")
  checkPointSound = loadSound("checkpoint.mp3")
  gmSound = loadSound("gm ov.mp3")
 }

function setup() {
   createCanvas(600,300) 
 
bg6= createSprite(300,150,70,30);
bg6.addImage(bg6Img);
bg6.scale = 2


flappy = createSprite(70,150,20,20)
flappy.addImage(flappyImg)
flappy.scale = 0.1
flappy.setCollider("circle",0,0,100)

ground = createSprite(300,430,600,10)
ground.addImage(groundImg)
ground.scale = 2.5

score = 0

restart = createSprite(305,200,5,5);
restart.addImage(restartImg);
restart.scale = 0.4;
restart.visible = false;

gameOver = createSprite(300,130,5,2)
gameOver.addImage(gameOverImg)
gameOver.scale = 0.5
gameOver.visible = false;

upperGrp = new Group();
downGrp  = new Group();
coinGrp  = new Group();
}



function draw() {
 background(200);
 
 if (gameState === PLAY) {

 if (keyDown("space")) {
flappy.velocityY = -3
jumpSound.play();
 }

 flappy.velocityY = flappy.velocityY + 0.4
 
ground.velocityX = -1

if (ground.x  < 280){
   ground.x = 300
}

if (flappy.isTouching(upperGrp) || flappy.isTouching(downGrp)) {
   gameState = END;
   gmSound.play();

 }
 if(flappy.isTouching(ground)){
   gameState = END;
   gmSound.play();
 }

 
 
if(frameCount % 75 === 0){
score++;
}
if(frameCount % 225 === 0){
   checkPointSound.play() ;
}
spawnPipes();
}

drawSprites();

if(gameState === END)  {
   ground.velocityX = 0;
   flappy.visible = false;
   flappy.x=70;
   flappy.y=150;
   upperGrp.setVelocityXEach(0);
   downGrp.setVelocityXEach(0);
   coinGrp.setVelocityXEach(0);
   upperGrp.setLifetimeEach(-1);
   downGrp.setLifetimeEach(-1);
   coinGrp.setLifetimeEach(-1);
   restart.visible  = true;
   gameOver.visible = true;
   textSize (30)
   fill ("blue")
   text ("press space + enter to restart",125,270)
   }

flappy.collide(ground)


if (keyDown(ENTER)){
   if (gameState === END){
   reset();
 }
}
 if (flappy.isTouching(coinGrp)){
   coinGrp.destroyEach();
   score = score + Math.round(random(4,10));
}

spCoin()



 fill ("red")
 textSize(25);
 text("Score:" + score,440,30); 
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  upperGrp.destroyEach();
  downGrp.destroyEach();
  coinGrp.destroyEach();
  score = 0;
  flappy.visible   = true;

}

function spawnPipes() {
   if (frameCount % 75 === 0 ){
      pipe1 = createSprite(700,0,10,100);
      pipe1.addImage(pipe1Img);
      pipe1.y = random(-80,30);
      pipe1.velocityX = -2;
      upperGrp.add(pipe1);
      upperGrp.setLifetimeEach(-1);

      pipe1.depth = gameOver.depth;
    gameOver.depth = pipe1.depth + 1;

    
        

      pipe2 = createSprite(700,462,10,100);
      pipe2.addImage(pipe2Img);
      pipe2.y = random(370,462);
      pipe2.velocityX = -2;
      downGrp.add(pipe2);
      downGrp.setLifetimeEach(-1);
   pipe2.depth = gameOver.depth;
    gameOver.depth = pipe2.depth + 1;

   }
}

function spCoin() {
   if (frameCount % 250 === 0) {
      coin = createSprite(600,150,40,10);
      coin.y = Math.round(random(120,150));
      coin.addImage(coinImg);
      coin.scale = 0.15;
      coin.velocityX = -2;
      coinGrp.add(coin);
      coinGrp.setLifetimeEach(-1);
}
}


