var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, monkey_stop ;
var bananaImage,obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground;
var servivalTime;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_stop = loadImage("sprite_1.png");
 
}



function setup() {
  createCanvas(600, 400);
  
  //creating the monkey
  monkey = createSprite(80,300,20,20);
  monkey.addAnimation("moving" , monkey_running);
  monkey.scale = 0.1;


 // monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
 // monkey.debug = true

  //creating the ground
  ground = createSprite(400,300,1200,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  console.log(ground.x);
  
   score = 0;
   //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  foodGroup = createGroup();

}

  

function draw() {
background(180);
    
  //creating the gameState:play
   if(gameState === PLAY){
     
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
  if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -12;

  }
       
     //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    if (monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
       score=score+2;
     
    }
     
     
     if(monkey.isTouching(obstaclesGroup)){
        gameState = END;

           
    }
         servivalTime = Math.ceil(frameCount/frameRate()); 
         
     spawnFoods();
     spawnObstacles();
   }
  //creating the gameState:end
      else if (gameState === END) {
          
        stroke("black");
        textSize(30);
        fill("red");
        text("Game Over",210,150);
        
        ground.velocityX = 0;
         foodGroup.setVelocityXEach(0);
         obstaclesGroup.setVelocityXEach(0);
      //  monkey.addImage(monkey_stop);
       monkey.destroy();
       
      }

      stroke("black");
       textSize(20);       
      fill("black");
   text("Servival Time :"+ servivalTime,100,50); 
  
     
//spawnFoods();
    // spawnObstacles();
   
  //creating the servival time
 servivalTime = 0;
  stroke("white");
  textSize(20);
  fill("white");
   text("score: "+ score,500,50);
   

  
  //making the monkey collide with the ground
    monkey.collide(ground);
  drawSprites();
}


function spawnFoods(){
   if (frameCount % 80 === 0){
     var banana = createSprite(600,Math.round(random(120,200)),10,40);
     banana.addImage(bananaImage);
     banana.velocityX = -5;
     banana.lifeTime = 300;
     banana.scale = 0.1;
     
     foodGroup.add(banana);

   }
  
}
function spawnObstacles(){
  if (frameCount%100 === 0){
    var obstacle = createSprite(600,270,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5;
    obstacle.scale = 0.1;
    obstacle.lifeTime = 300;
     //obstacle.setCollider("rectangle",0,0,10,10);
 // obstacle.debug = true
  
    
    
    obstaclesGroup.add(obstacle);
       
  
  
  }
}



