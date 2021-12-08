var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg
var zombieGrp
var bullet 
var bulletGrp
var score=0

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImg= loadImage("assets/zombie.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
zombieGrp=new Group()
bulletGrp= new Group()

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(0); 



  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 bullet= createSprite(displayWidth-1150, player.y-25, 20, 10);
 bullet.velocityX=20
 bulletGrp.add(bullet)


 player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
spawnZombies()
if(zombieGrp.isTouching(bulletGrp)){
  for(var i=0;i<zombieGrp.length;i++){
  if(zombieGrp[i].isTouching(bulletGrp))
{
  score=score+1
  zombieGrp[i].destroy()
  bulletGrp.destroyEach()
}
}
}
drawSprites();
textSize(30)
fill("white")
text("Score: "+score,displayWidth-100, 50)
}

function spawnZombies(){
  if(frameCount%65===0){

  zombie= createSprite(random(700,1300), random(100,500))
  zombie.addImage(zombieImg)
  zombie.velocityX=-3
  zombie.scale= 0.14
  zombie.lifetime=400
  zombieGrp.add(zombie)
}
}