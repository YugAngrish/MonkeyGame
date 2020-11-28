
var monkey , monkey_running, ground;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0
var survivalTime = 0
gameState = 1
PLAY = 1
END = 0
var Click_HERE_to_Retry = "Click_HERE_to_Retry"
highScore = 0

function preload(){
   monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}
function setup() {
  createCanvas(600,450);
 monkey = createSprite(50,403,3,3) ;
monkey.addAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
monkey.scale = 0.1
  monkey.addAnimation("sprite_8.png")
  ground = createSprite(300,440,900,13)
  ground.velocityX = -5
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  //monkey.debug = true
  monkey.setCollider("rectangle",20,20)
  obstacleGroup.setColliderEach ("circle",10,10)
 
}
function draw() {
  background("white")
 // background(0)
  
  if(gameState===PLAY){
    
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach()
    score = score + 2 }
  
   if(monkey.isTouching(obstacleGroup)){  
    gameState = END
  }
   survivalTime = Math.ceil(frameCount/getFrameRate())}
 else if(gameState===END){
  // foodGroup.destroyEach()
   // obstacleGroup.destroyEach()
   
   foodGroup.setVelocityXEach(0)
   obstacleGroup.setVelocityXEach(0)
   
   foodGroup.setLifetimeEach(-1)
   obstacleGroup.setLifetimeEach(-1)
   frameCount = 10
   
   fill(0)
  stroke(0)
  strokeWeight(1)
  textSize(20)
  text("BETTER LUCK NEXT TIME" , 200,200)

  highScore = score
   
   ground.velocityX = 0
  
   //survivalTime = 0
  }
  
  

  fill(0)
  stroke(0)
  strokeWeight(1)
  textSize(15)
  text("Score = "+ score , 400,50)
  
   fill(0)
  stroke(0)
  strokeWeight(1)
  textSize(15)
  text("HighScore = "+ highScore , 400,35)
  
  fill(0)
  stroke(0)
  strokeWeight(1)
  textSize(15)
  text("Survival Time = "+ survivalTime , 150,50)
  
  
 
  
  createEdgeSprites()
  monkey.collide(ground)

 monkey.velocityY = monkey.velocityY + 0.8
  
  if(ground.x<150){
    ground.x = ground.width/2
  }
     if(keyDown("space")&& monkey.y>=370){
    monkey.velocityY = -15
  } 
  food()
  obstacle()
  drawSprites();
}

function food(){
  if(frameCount%160===0){
  var food
  food = createSprite(600,random(200,250),3,3)
  food.addImage(bananaImage)
  food.scale = 0.101
  food.lifeTime = 60
  food.velocityX = -(5 + score/10)
  
  foodGroup.add(food)
}
}
function obstacle(){
  if(frameCount%120===0){
  var obstacle
  obstacle = createSprite(600,403,3,3)
  obstacle.addImage(obstacleImage)
  obstacle.scale = 0.17
  obstacle.lifeTime = 60
  obstacle.velocityX = -(5 + score/10)
    monkey.depth = obstacle.depth + 1
   monkey.depth = monkey.depth + 1
 // obstacle.debug = true
   obstacle.setCollider("circle",15,15) 
  obstacleGroup.add(obstacle)
}
}




