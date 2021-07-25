var car1, car1Img
var car2, car2Img
var gameOver, gameOverImg
var bg, track
var heart1, heart2, heart3, heartImg
var opponentCarGroup
var powerup, powerupIMG
var powerUpGroup
var score = 0
var PLAY = 1
var END = 0
var gameState = 1

function preload(){
  car1Img = loadImage("car1.png")
  car2Img = loadImage("car2.png")
  bg = loadImage("track2.png")
  gameOverImg = loadImage("GameOver2.png")
  heartImg = loadImage("heartPowerupIMG.png")
  powerupIMG = loadImage("powerUp.png")
  
}
function setup() {
  //createCanvas(400,800);

  //track = createSprite(200,300)
  //track.addImage("bg", bg)
  //track.scale = 1.55
  //track.y = track.height / 2
  //createCanvas(windowWidth, windowHeight);
  createCanvas(400,1000);
  // Moving background
  track=createSprite(200,200);
  track.addImage(bg);
  track.scale = 2.2
  track.velocityY = 4;

  car1 = createSprite(100, 750, 50, 50);
  car1.addImage("car1Img", car1Img)
  car1.scale = 0.25
  //car1.velocityY = -3
  heart1 = createSprite(250,50,35,35)
  heart1.addImage("heartImg", heartImg)
  heart1.scale = 0.15

  heart2 = createSprite(300,50,35,35)
  heart2.addImage("heartImg", heartImg)
  heart2.scale = 0.15

  heart3 = createSprite(350,50,35,35)
  heart3.addImage("heartImg", heartImg)
  heart3.scale = 0.15
  
  opponentCarGroup = new Group()
  powerUpGroup = new Group()



  //car2 = createSprite(300, 700, 50, 50);

}

function draw() {
  background("white"); 
  opponentCar();
  spawnPowerUp()


  //image(bg, 0,-displayHeight*4,displayWidth, displayHeight*5);
  if(track.y > 400){
    track.y = 400/2
  }

  if(keyDown(LEFT_ARROW)){
    car1.x -= 5
  }
  if(keyDown(RIGHT_ARROW)){
    car1.x +=5
  }

  if(opponentCarGroup.isTouching(car1)){
    opponentCarGroup.destroyEach()
    score -= 50
    heart1.remove()
    //gameState = END
  }

  //if(heart1.remove() && opponentCarGroup.isTouching(car1)){
   // heart2.remove()
  //}
  
  if(powerUpGroup.isTouching(car1)){
    powerUpGroup.destroyEach()
    score += 100
    track.velocityY += 1
    car2.velocityY += 2
  }
  //if(opponentCarGroup.isTouching(car1) && score < 50){
  //  gameState = END
  //}

  if(gameState === END){
    gameOver = createSprite(200, 500, 100,100)
    gameOver.addImage("gameOver", gameOverImg)
    gameOver.scale = 0.5
    car1.x = 100
    car1.y = 750
    opponentCarGroup.destroyEach();
    track.velocityY = 0
  }
  
  

  drawSprites();
  textSize(20)
  fill("white")
  text("Score: " + score, 50,50)
}

function opponentCar(){
  if(frameCount % 220 === 0){
    score += 50
    car2 = createSprite(random(50,350), random(100,800), 50,50)
    car2.addImage("car2Img", car2Img)
    car2.scale = 0.25
    car2.velocityY = 2
    opponentCarGroup.add(car2)
  }

}

function spawnPowerUp(){
  if(frameCount % 255 === 0){
    powerup = createSprite(random(50,350), random(100,800), 50,50)
    powerup.addImage("powerUp", powerupIMG)
    powerup.scale = 0.15
    powerup.velocityY = 1
    powerUpGroup.add(powerup)
  }
}