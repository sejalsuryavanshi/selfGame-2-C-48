var cloudBoyImg;
var cloudBoy;
var mountain, mountainImg;
var badCloud, badCloudImg, badCloudGroup;
var gameState=play, play=1, end=2;
var bird, birdImg, birdGroup;
var gameOver, gameOverImg;
 var restart, restartImg;
var bg, bgImg;
var coin, coinImg;
var coinGroup;
var score=0;
var coin=0;

function preload() {
cloudBoyImg=loadImage("cloud boy.png");
mountainImg=loadImage("mountain.png");
badCloudImg=loadImage("bad cloud.png");
birdImg=loadImage("bird1.png");
gameOverImg=loadImage("gameEnd.png");
restartImg=loadImage("restart.png");
bgImg=loadImage("sky3.jpg");
coinImg=loadImage("coin.png");

}

function setup() {
createCanvas(600,600);


bg=createSprite(300,300,10,10);
bg.addImage(bgImg);
bg.scale=1.5;

mountain=createSprite(190,230,10,10);
mountain.addImage(mountainImg);
mountain.scale=1.6;

cloudBoy=createSprite(110,265,10,10);
cloudBoy.addImage(cloudBoyImg);
cloudBoy.scale=0.5;

gameOver=createSprite(300,250,20,20);
gameOver.addImage(gameOverImg);
gameOver.scale=0.3
gameOver.visible=false;

restart=createSprite(300,350,20,20);
restart.addImage(restartImg);
restart.scale=0.3
restart.visible=false;

 badCloudGroup=createGroup();
 birdGroup=createGroup();
 coinGroup=createGroup();
}

function draw() {
background("#44C6D6");

  cloudBoy.debug=false;
  cloudBoy.setCollider("rectangle",-100,3,120,240)

  badCloudGroup.debug=true;

   //gameState is play;
    if(gameState===play){

      score= score+Math.round(getFrameRate()/50)

      bg.velocityX=-4;

     if(bg.x<0){
      bg.x=bg.width/2; 
     }
    console.log("cloudBoy");

    if(keyDown("SPACE")&& cloudBoy.y>=20){
      cloudBoy.velocityY=-5
    }
    
    cloudBoy.velocityY=cloudBoy.velocityY+0.2;
   
    if(birdGroup.isTouching(cloudBoy)){
      cloudBoy.velocityY=0;
      gameState=end;
    }
    
    if(badCloudGroup.isTouching(cloudBoy)){
      cloudBoy.velocityY=0;
      gameState=end;
    }
    
    if(cloudBoy.isTouching(coinGroup)){
      coin=coin+1;
      coinGroup.destroyEach();
    }


    if(cloudBoy.y>600){
     gameState=end;
     cloudBoy.velocityY=0;
    }

    if(cloudBoy.y< 0){
      gameState=end;
      cloudBoy.velocityY=0;
     }

   

    mountain.velocityX=-4;

    spawnbadCloud();
    spawnbird();
    spawncoin();

    }

    
  
    if(keyDown("S")){
      gameState=play;
    }

 


//GameState end;
if(gameState===end){

 gameOver.visible=true;
 restart.visible=true;

bg.velocityX=0;



birdGroup.destroyEach();
badCloudGroup.destroyEach();
coinGroup.destroyEach()

}
 
if(mousePressedOver(restart)){
  gameState=play;
  coin=0;
  score=0;
  gameOver.visible=false;
  restart.visible=false;
  //bg.velocityX=-4;
  //spawnbadCloud();
  //spawnbird();
  //spawncoin();
  cloudBoy.y=265;
  mountain.visible=true;
  mountain.velocityX=-4;
  mountain.x=190;
  mountain.y=230;
 
}

  drawSprites();

  fill("black");
  textSize(20)
  text("Press S to start the Game",250,40);

  text("Score:"+score,100,40);
  text("Coin:"+coin,20,40)
}

function spawnbadCloud(){

  if(frameCount%350===0){
    var badCloud=createSprite(610,300,20,20);
    badCloud.y=Math.round(random(50,550));
    badCloud.velocityX=-6;
    badCloud.addImage(badCloudImg);

  
    badCloud.lifetime=600;
    badCloud.scale=0.4
    badCloudGroup.add(badCloud)
  }
}

function spawnbird(){

  if(frameCount%200===0){
  var bird=createSprite(610,300,20,22);
  bird.y=Math.round(random(50,550))
  bird.velocityX=-6;
  bird.addImage(birdImg);
  
  bird.lifetime=600;
  bird.scale=0.2;
  birdGroup.add(bird);
   
  }
}
  


function spawncoin(){

  if(frameCount%150===0){
    var coin=createSprite(610,300,20,20);
    coin.y=Math.round(random(50,550));
    coin.velocityX=-6;
    coin.addImage(coinImg);

  
    coin.lifetime=600;
    coin.scale=0.2
    coinGroup.add(coin)
  }
}
