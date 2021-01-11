//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, fruit, monster, fruitGroup, enemyGroup, score, r, randomFruit, position;
var swordImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage
var gameOverSound, knifeSwoosh
var gameOver;
var reset;
var resetImg;
var back,backImg;

function preload() {

  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
    resetImg = loadImage("reset.png");
  gameOverImage = loadImage("gameover.png")
  backImg = loadImage("fruit ninja.jpg");
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
}



function setup() {
  createCanvas(600, 600);
back = createSprite(300,300);
  back.addImage(backImg);
  back.scale = 2;
  
  //creating sword
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7

  reset = createSprite(300,300);
  reset.addImage(resetImg);
  reset.scale = 0.1;
  reset.visible = false;
  
   gameOver = createSprite(300,200);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 1;
  gameOver.visible = false;

  //set collider for sword
  sword.setCollider("rectangle", 0, 0, 40, 40);

  // Score variables and Groups
  score = 0;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  fruitGroup2 = createGroup();
//  sword.debug = true;
}

function draw() {
  background("#EDDA74");
  //knifeSwooshSound.play()

  if (gameState === PLAY) {

    //Call fruits and Enemy function
    fruits();
    Enemy();
    Enemy2();
    fruits2();

    // Move sword with mouse
    sword.y = World.mouseY;
    sword.x = World.mouseX;

    // Increase score if sword touching fruit
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();

      knifeSwooshSound.play();
      score = score + 2;
    } 
    if (fruitGroup2.isTouching(sword)) {
      fruitGroup2.destroyEach();

      knifeSwooshSound.play();
      score = score + 2;
    }
    else {
      // Go to end state if sword touching enemy
      if (enemyGroup.isTouching(sword)) {
        gameState = END;
        //gameover sound
        gameOverSound.play()

        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        reset.visible = true;
        gameOver.visible= true;
        // Change the animation of sword to gameover and reset its position
        //sword.addImage(gameOverImage);
        
        sword.x = 200;
        sword.y = 200;
      }
    }
  }
  if(mousePressedOver(reset)){
     console.log("reset");
     restartGame();
  }

  drawSprites();

  //Display score
  fill("red");
  textSize(30);
  text("Score : " + score, 280, 30);
}


function Enemy() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(50, 350));
    monster.velocityX = -(8 + (score / 10));
    monster.setLifetime = 50;

    enemyGroup.add(monster);
  }
}
function Enemy2() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(0, 400, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(50, 350));
    monster.velocityX = (8 + (score / 10));
    monster.setLifetime = 50;

    enemyGroup.add(monster);
  }
}



function fruits() {
  if (World.frameCount % 60 === 0) {
    position = Math.round(random(1, 2));
    fruit = createSprite(400, 200, 20, 20);
    console.log(position)
    //using random variable change the position of fruit, to make it more challenging


    if (position === 1) {

      fruit.x = 400;
      fruit.velocityX = 7;
      console.log(fruit.velocity)
    }
    //     else
    //     {
    //       if(position===2){

    //       fruit.x=0;

    //       //Increase the velocity of fruit after score 4 or 10
    //       fruit.velocityX=7+(score/4);
    //       }
    //     }
    fruit.scale = 0.2;
    //fruit.debug=true;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 340));

    fruit.velocityX = -7;
    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }
}

function fruits2() {
  if (World.frameCount % 60 === 0) {
    position = Math.round(random(1, 2));
    fruit = createSprite(0, 200, 20, 20);
    console.log(position)
    //using random variable change the position of fruit, to make it more challenging


    if (position === 1) {

      fruit.x = 400;
      fruit.velocityX = -7;
      console.log(fruit.velocity)
    }
    //     else
    //     {
    //       if(position===2){

    //       fruit.x=0;

    //       //Increase the velocity of fruit after score 4 or 10
    //       fruit.velocityX=7+(score/4);
    //       }
    //     }
    fruit.scale = 0.2;
    //fruit.debug=true;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(10, 390));

    fruit.velocityX = 10;
    fruit.setLifetime = 100;

    fruitGroup2.add(fruit);
  }
}
function restartGame(){
  
  gameState = PLAY;
  fruitGroup.destroyEach();
  enemyGroup.destroyEach();
  
  reset.visible = false;
  gameOver.visible=false;
  score = 0;
}