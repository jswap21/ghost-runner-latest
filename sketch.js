var tower,towerImage;
var ghost,ghostAni;
var door,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;
var invisibleblock,invisibleblocksGroup;
var gameState="play";
function preload(){
  towerImage = loadImage("tower.png");
  ghostAni=loadAnimation("ghost-jumping.png","ghost-standing.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
}

function setup(){
  createCanvas(600,600);
  tower=createSprite(300,300,600,600);
  towerImage= tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(400,400,20,20);
  ghost.addAnimation("ghost",ghostAni);
  ghost.scale=0.3;
  

  doorsGroup=new Group();
  climbersGroup = new Group();
  invisibleblocksGroup = new Group();
}   

function draw(){
  background(0);
  if(gameState==="play"){
  if(tower.y>400){
    tower.y =300;
  }
  
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
   if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  spawnDoors();
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleblocksGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
   gameState="end";
  }
 
  drawSprites();
  }
  
  if(gameState==="end"){
     stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250);
  }
}

function spawnDoors(){
  if(frameCount%240===0){
   // var door = createSprite(200,300);
  door=createSprite(200,-50,20,20);
  door.addImage("door",doorImage);
    climber=createSprite(200,20);
    climber.addImage("climber",climberImage);
    invisibleblock=createSprite(200,15,climber.width,2);
    
    door.x=Math.round(random(120,400));
    climber.x=door.x;
    invisibleblock.x=door.x;
    
    door.velocityY=1;
    climber.velocityY=1;
    invisibleblock.velocityY=1;
    
    door.lifetime=800;
    climber.lifetime=800;
    invisibleblock.lifetime=800;
    invisibleblock.debug=true;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleblocksGroup.add(invisibleblock);
    
    ghost.dept=door.depth;
    ghost.depth+=1;
  }
  
}