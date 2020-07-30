var PLAY = 1;
var END = 0;
var gameState = PLAY;

var rocket;
var engine, world;
var bg;
var position;
var rock;
var obstacle,obstacle2,obstacle3,obstacle4, obstacle_image;
var planet, planet_image;
var planetGroup, obstaclesGroup1,obstaclesGroup2,obstaclesGroup3,obstaclesGroup4,obstaclesGroup5;
var ground, score;
var top, bottom,left,right;
var edges, bulletGroup, rand, bulletImage;
var dieSound, powerupSound, shootSound, disp, moveSound;
var restart, restaetImage, gameover, gameoverImage;


function preload(){
  obstacle_image = loadImage("./images/meteroid.png");
  planet0 = loadImage("./images/planet.png");
  planet1 = loadImage("./images/planet1.png");
  planet2 = loadImage("./images/planet2.png")
  groundImage = loadImage("./images/backgroung.png")
  rocketImage = loadImage("./images/Rocket.png");
  dieSound = loadSound("./sounds/explode.wav");
  powerupSound = loadSound("./sounds/powerup.wav");
  shootSound = loadSound("./sounds/shoot.wav");
  bulletImage = loadImage("./images/bullet.png");
  moveSound = loadSound("./sounds/move.wav");
  restartImage = loadImage("./images/restart.png");
  gameoverImage = loadImage("./images/gameover.png");
  
}


function setup(){
  createCanvas(600,600);
  rocket = createSprite(300,510,40,100);
  rocket.addImage("rocket",rocketImage);
  rocket.scale = 0.1;
  edges = new Group();
  obstaclesGroup1 = new Group();
  obstaclesGroup2 = new Group();
  obstaclesGroup3 = new Group();
  obstaclesGroup4 = new Group();
  obstaclesGroup5 = new Group();
  planetGroup = new Group();
  bulletGroup = new Group();
  var right = createSprite(600,300,1,600);
  edges.add(right);
  var left = createSprite(0,300,1,600);
  edges.add(left);
  var top = createSprite(300,0,600,1); 
  edges.add(top);
  var bottom = createSprite(300,600,600,1);
  edges.add(bottom);
  score = 0;
  restart = createSprite(300,300);
  restart.addImage(restartImage);
  restart.visible = false;
  gameover = createSprite(300,200);
  gameover.addImage("gameover",gameoverImage);
  gameover.visible = false;
  ground = createSprite(300,300,600,600);
  //ground.visible = false;
  ground.addImage("ground", groundImage);
  ground.y = ground.height/2;
  ground.velocityY = 5;
  ground.scale = 2;
  ground.depth = rocket.depth -5;
  
  
  
}

function draw(){
  background(225);
    text("Score: "+ score, 550,250);
  
  fontColor = "white";
  rocket.collide(edges);
  if(gameState===PLAY){
    if (ground.y > 700){
      ground.y = ground.height/2;        
    }
    
   
   if(frameCount%5===0){
    if (keyDown("space")){
      createBullet(rocket.x,rocket.y -33);
      shootSound.play();
       }
         }
    if(obstaclesGroup1.isTouching(rocket)){
    gameState = END;
    dieSound.play();
  }
  if(obstaclesGroup2.isTouching(rocket)){
    gameState = END;
    dieSound.play();
  }
  if(obstaclesGroup3.isTouching(rocket)){
    gameState = END;
    dieSound.play();
  }
  if(obstaclesGroup4.isTouching(rocket)){
    gameState = END;
    dieSound.play();
  }
  if(obstaclesGroup5.isTouching(rocket)){
    gameState = END;
    dieSound.play();
  }
    if(bulletGroup.isTouching(obstaclesGroup1)){
      obstaclesGroup1.destroyEach();
      bulletGroup.destroyEach();
      score = score + 20;
    }
    else if(bulletGroup.isTouching(obstaclesGroup2)){
      obstaclesGroup2.destroyEach();
      bulletGroup.destroyEach();
      score = score + 20;
    }
    else if(bulletGroup.isTouching(obstaclesGroup3)){
      obstaclesGroup3.destroyEach();
      bulletGroup.destroyEach();
      score = score + 20;
    }
    else if(bulletGroup.isTouching(obstaclesGroup4)){
      obstaclesGroup4.destroyEach();
      bulletGroup.destroyEach();
      score = score + 20;
    }
    else if(bulletGroup.isTouching(obstaclesGroup5)){
      obstaclesGroup5.destroyEach();
      bulletGroup.destroyEach();
      score = score + 20;
    }
    if(bulletGroup.isTouching(planetGroup)){
      score = score + 200;   
      planetGroup.destroyEach();
      bulletGroup.destroyEach();
    }

    console.log(score);
    
if(frameCount%50===0){
    var rand1 = Math.round(random(1,5));
    switch(rand1) {
      case 1: createObstacles1();
              break;
      case 2: createObstacles2();
              break;
      case 3: createObstacles3();
              break;
      case 4: createObstacles4();
              break;
      case 5: createObstacles5();
              break;
      default: break;
    }
  }
    move();
    createPlanets();
  }
 
  else if(gameState===END){
    obstaclesGroup1.setVelocityYEach(0);
    obstaclesGroup2.setVelocityYEach(0);
    obstaclesGroup3.setVelocityYEach(0);
    obstaclesGroup4.setVelocityYEach(0);
    obstaclesGroup5.setVelocityYEach(0);
    planetGroup.setVelocityYEach(0);
    obstaclesGroup1.setLifetimeEach(-1);
    obstaclesGroup2.setLifetimeEach(-1);
    obstaclesGroup3.setLifetimeEach(-1);
    obstaclesGroup4.setLifetimeEach(-1);
    obstaclesGroup5.setLifetimeEach(-1);
    planetGroup.setLifetimeEach(-1);
    bulletGroup.destroyEach();
    ground.velocityY = 0;
    restart.visible = true;
    gameover.visible = true;
    if(mousePressedOver(restart)) {
      reset();
    }
    }


  drawSprites();
  textStyle("roboto");
  textSize(20)
  text("Score: "+ score, 480,50);
  
}

function move(){
  if(keyDown("LEFT_ARROW")){
    rocket.x = rocket.x - 10;
    //moveSound.play();
  }
  if(keyDown("RIGHT_ARROW")){
    rocket.x = rocket.x + 10;
    //moveSound.play();
  }
}

function createObstacles1(){
  var obstacle = createSprite(0,0,1,1);
  obstacle.x = Math.round(random(50,150));
  obstacle.y = Math.round(random(50,200));
  obstacle.addImage("obstacle",obstacle_image);
  obstacle.scale = 0.07;
  obstacle.velocityY = 5
  obstaclesGroup1.add(obstacle);
  if(frameCount%500===0){
    obstacle.velocityY = obstacle.velocityY + 5;
  }
}


function createObstacles2(){
    var obstacle1 = createSprite(0,0,1,1);
    obstacle1.x = Math.round(random(150,250));
    obstacle1.y = Math.round(random(50,200));
    obstacle1.addImage("obstacle1",obstacle_image);
    obstacle1.scale = 0.07;
    obstacle1.velocityY = 5
    obstaclesGroup2.add(obstacle1);
    if(frameCount%500===0){
      obstacle1.velocityY = obstacle1.velocityY + 5;
    }
  }

function createObstacles3(){
    var obstacle2 = createSprite(0,0,1,1);
    obstacle2.x = Math.round(random(250,350));
    obstacle2.y = Math.round(random(50,200));
    obstacle2.addImage("obstacle2",obstacle_image);
    obstacle2.scale = 0.07;
    obstacle2.velocityY = 5
    obstaclesGroup3.add(obstacle2);
    if(frameCount%500===0){
      obstacle2.velocityY = obstacle2.velocityY + 5;
    }
  }

function createObstacles4(){
    var obstacle3 = createSprite(0,0,1,1);
    obstacle3.x = Math.round(random(350,450));
    obstacle3.y = Math.round(random(50,200));
    obstacle3.addImage("obstacle3",obstacle_image);
    obstacle3.scale = 0.07;
    obstacle3.velocityY = 5
    obstaclesGroup4.add(obstacle3);
    if(frameCount%500===0){
      obstacle3.velocityY = obstacle3.velocityY + 5;
    }
  }

function createObstacles5(){
    var obstacle4 = createSprite(0,0,1,1);
    obstacle4.x = Math.round(random(450,550));
    obstacle4.y = Math.round(random(50,200));
    obstacle4.addImage("obstacle4",obstacle_image);
    obstacle4.scale = 0.07;
    obstacle4.velocityY = 5
    obstaclesGroup5.add(obstacle4);
    if(frameCount%500===0){
      obstacle4.velocityY = obstacle4.velocityY + 5;
    }
  }

console.log(score);

function createPlanets(){
  if(frameCount%200===0){
    var planet = createSprite(random(30,570),random(10,300),1,1);
    planet.velocityY = 5;
    planet.scale = 0.6;
    planetGroup.add(planet);
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: planet.addImage(planet0);
              break;
      case 2: planet.addImage(planet1);
              break;
      case 3: planet.addImage(planet2);
              break;
      default: break;
    }
  }
}

function createBullet(x,y) {
 var bullet= createSprite(100, 100, 5, 10);
  bullet.y = y;
  bullet.x = x;                                           
  bullet.shapeColor = "red";
  bullet.velocityY = -5;
  bullet.lifetime = 1000;
  bulletGroup.add(bullet);
  bullet.addImage("bullet",bulletImage);
  bullet.scale = 0.02 ; 
  }

  function reset(){
    gameState = PLAY;
    obstaclesGroup1.destroyEach();
    obstaclesGroup2.destroyEach();
    obstaclesGroup3.destroyEach();
    obstaclesGroup4.destroyEach();
    obstaclesGroup5.destroyEach();
    bulletGroup.destroyEach();
    planetGroup.destroyEach();
    score = 0;
    restart.visible = false;
    gameover.visible = false;
    rocket.x = 300;
    rocket.y = 510;
    ground.velocityY = 5;

  }

