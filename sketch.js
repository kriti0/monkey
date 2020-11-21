var monkey, monkeyRunning;
var ground;
var banana, bananaImage;
var obstacle, obstacleImage;
var fGroup, oGroup;
var gameState="play";
var score = 0;

function preload(){
  monkeyRunning = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup(){
  createCanvas(600,600);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running", monkeyRunning);
  monkey.scale = 0.1
  
  ground = createSprite(300,550,600,10);
  
  fGroup = new Group();  
  oGroup = new Group();  
}

function draw(){
  background("lightblue");
   text("score:"+score,500,50);
  
  if(gameState==="play"){
  score = Math.round(frameCount/frameRate());
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  Banana();
  Obstacle();  
  
    
  if(oGroup.isTouching(monkey)){
  gameState = "end";
  }
    if(gameState==="end"){
    monkey.velocityY = 0;
    oGroup.setVelocityXEach(0);
    fGroup.setVelocityXEach(0);    
    oGroup.setLifetimeEach(-1);
    fGroup.setLifetimeEach(-1);
    monkey.destroy();
      score = 0;
    }
  }
  drawSprites();
}

function Banana(){
  if(frameCount%80===0){
    banana = createSprite(600,300,10,40);
    banana.y = random(300,450);
    banana.velocityX = -6;
    banana.addImage(bananaImage);
    banana.scale = 0.1; 
    banana.lifetime = 300; 
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    fGroup.add(banana);
  }
}

function Obstacle(){
  if(frameCount%80===0){
    obstacle = createSprite(800,530,10,40);  
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1; 
    obstacle.lifetime = 300; 
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    oGroup.add(obstacle);
  }
}