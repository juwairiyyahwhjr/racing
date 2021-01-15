var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;
var cycleBell,pinkCG,yellowCG,redCG;
var player1,player2,player3;
var gameOverImg
var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOver, restart;


var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload()
{
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 =                     loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
    cycleBell = loadSound("sound/bell.mp3");
    gameOverImg = loadImage("images/gameOver.png"); 

}

function setup(){
  
createCanvas(1200,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;

gameOver = createSprite(500,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();

  
}

function draw() {
  background(0);
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,450,30);
  
  if(gameState===PLAY){
  
    distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 )
  {
    path.x = width/2;
  }
    
  if(keyDown("space")) 
  {
    cycleBell.play();
  }
    
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0)
  {
    if (select_oppPlayer == 1) 
    {
      pinkCyclists();
    } 
    else if (select_oppPlayer == 2)
    {
      yellowCyclists();
    }
    else 
    {
      redCyclists();
    }
  }
  if(pinkCG.isTouching(mainCyclist))
  {
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("Player1",oppPink2Img);
  }
    
  if(yellowCG.isTouching(mainCyclist))
  {
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("Player2",oppYellow2Img);
    console.log("yellow girl");
  }
  if(redCG.isTouching(mainCyclist))
  {
      gameState = END;
      player3.velocityY = 0;
    player3.addAnimation("Player3",oppRed2Img);
  }
  
    
 }else if (gameState === END) 
 {
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 350,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
if(pinkCG.isTouching(mainCyclist))
  {
    
     //player1.velocityY = 0;
     player1.changeAnimation("Player1",oppPink2Img);
  }
    
  if(yellowCG.isTouching(mainCyclist))
  {
     
      //player2.velocityY = 0;
      player2.changeAnimation("Player2",oppYellow2Img);
    console.log("yellow girl");
  }
  if(redCG.isTouching(mainCyclist))
  {
      
      //player3.velocityY = 0;
      player3.changeAnimation("Player3",oppRed2Img);
  }
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW"))
    {
      reset();
    }
 }
  
  
  
}
function pinkCyclists()
{
  player1 =createSprite(1100,Math.round(random(50, 250),10,10));
  player1.scale =0.06;
  player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}
function yellowCyclists()
{
  player2 =createSprite(1100,Math.round(random(50, 250),10,10));
  player2.scale =0.06;
  player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer1",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
  
}
function redCyclists()
{
  player3 =createSprite(1100,Math.round(random(50, 250),10,10));
  player3.scale =0.06;
  player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer1",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
  
}
function reset(){
  
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  
  distance = 0;
}