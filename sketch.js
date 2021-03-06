
var gift,helicopter,backgroundImg,slider,helicopterImg,giftImg,ground,helicopterImg2,serveBackground,endBackground;
var edges;
var background_1,background_2,background_3,slider_1,slider_2,sound1,sound2,sound3,sound4,sound5,sound7,sound6;
var GroupGift,rand;
var score=0;
var lives=3;
var frequency;
var gameState="serve";
var resetFlag=false;
var myTouch=[];
var pos, temp_pos;
var first = true;

function preload(){
    helicopterImg = loadImage("images/helicopter.png");
    helicopterImg2 = loadImage("images/helicopter2.png");
    giftImg = loadImage("images/package.png");
    backgroundImg = loadImage("images/background3.png");
    serveBackground= loadImage("images/background.jpg");
    endBackground= loadImage("images/gameOver.png");
    background_1=loadImage("images/background2.jpg");
    background_2=loadImage("images/background4.jpg");
    background_3=loadImage("images/background5.jpg");
    slider_1=loadImage("images/basket1.png");
    slider_2=loadImage("images/basket2.png");
    sound1=loadSound("sounds/arcade_game_level_up_tone.mp3")
    sound2=loadSound("sounds/oh no.mp3")
    sound3=loadSound("sounds/oh yes.mp3")
    sound4=loadSound("sounds/PM_FN_Events_LvlUps_PowerUps_12.mp3")
    sound5=loadSound("sounds/SMALL_CROWD_APPLAUSE-Yannick_Lemieux-1268806408.mp3")
    sound6=loadSound("sounds/3797250_female-voice-try-again_by_urbazon_preview.mp3")

}
    
function setup(){
    createCanvas(900,1100);
    edges=createEdgeSprites();

    ground= createSprite(width/2,height/2,width,height)
    ground.addImage("serveBG",serveBackground);
    ground.addImage("playBG",backgroundImg);
    ground.addImage("endBG",endBackground);
    ground.addImage("noonBG",background_1);
    ground.addImage("eveningBG",background_2);
    ground.addImage("nightBG",background_3);
    ground.scale=3
    
   
    

    helicopter= createSprite(120,60)
    helicopter.addImage("helicopterforward",helicopterImg);
    helicopter.addImage("helicopterbackward",helicopterImg2);
    helicopter.scale=0.47;
    helicopter.velocityX=3;

    slider = createSprite(width,height-25,150,20)
    slider.addImage("S1",slider_1);
    slider.addImage("S2",slider_2);
    slider.scale=0.50;

    //slider.shapeColor="red";
    GroupGift=new Group()
    
}

function draw(){
    background("black");
    drawSprites();
    console.log(gameState)
    if(gameState === "serve"){
        stroke("black");
    fill("red");
    strokeWeight(10);
    textSize(20);
        text("WELCOME",270,350);
        text("touch anywhere on the game screen to start the game",100,580);
        text("Press on Left side to move left  (on the game scren)",5,500);
        text("Press on right side to move right  (on the game scren)",5,540);
        helicopter.visible=false;
        slider.visible=false;
        if(keyDown("space")||touches.length>0 ){
            gameState="play";
            touches=[];
        }
    }
    else if (gameState === "play"){
        if(resetFlag){
            helicopter.velocityX=3;
            resetFlag=false;
        }
        ground.changeImage("playBG",backgroundImg)
        helicopter.visible=true;
        slider.visible=true;

        

        //slider.collide(edges[0]);
        //slider.collide(edges[1]);
        
     if(slider.x<75){
         slider.x=75;
     }
     if(slider.x>width-75){
        slider.x=width-75;
    }
    frequency=Math.round(random(50,100))
    if(frameCount % frequency === 0){
        //rand=Math.round(random(1,3));
        //console.log(rand)
        spawnGift();
    }
     
    if(helicopter.x>width-120){
        //console.log(helicopter.x)
        helicopter.changeImage("helicopterbackward",helicopterImg2);
        helicopter.velocityX=-3
        //console.log(helicopter.velocityX)
    }

    
    if(helicopter.x<50){
        //console.log("forward"+helicopter.x)
        helicopter.changeImage("helicopterforward",helicopterImg);
        helicopter.velocityX=3
    } 
   // console.log(score)
    for(var i=0;i<GroupGift.length;i++){
        if(GroupGift.get(i) !== null && GroupGift.isTouching(slider)){
            if(score>=0 && score<=1500){
            score+=30
            }
            else if(score>=1500 && score<=3000){
                score+=45
                }
                else if( score<=3000 && score<=4500){
                    score+=55
                    }
                else {
                        score+=60
                        }

            GroupGift.get(i).destroy();
           sound3.play();
        }
        

        if(GroupGift.get(i) !== null && GroupGift.isTouching(edges[3])){
            GroupGift.get(i).destroy();
            lives--
            sound2.play();
        }
        if( lives <= 0 || score === 10500){
            gameState="end";
            sound6.play();
            sound5.play();
        }

       }
       if(score>=1500){
        ground.changeImage("noonBG",background_1);
        GroupGift.setVelocityYEach(3.8);
        ground.scale=2;
    }
    if(score>=3000){
        ground.changeImage("eveningBG",background_2);
        ground.scale=4.3;
        GroupGift.setVelocityYEach(4.5);

        frequency=Math.round(random(40,80))
        if(frameCount % frequency === 0){
            spawnGift();
        }
        slider.changeImage("S2",slider_2)
        //slider.velocityX=40;
    }
    if(score>=4500){
        ground.changeImage("nightBG",background_3);
        GroupGift.setVelocityYEach(5);
        ground.scale=3;

        frequency=Math.round(random(70,120))
        if(frameCount % frequency === 0){
            spawnGift();
            
        }
    } 

        if(score>=7500){
            //console.log(score)
            ground.changeImage("playBG",backgroundImg);
            GroupGift.setVelocityYEach(6.5);
            ground.scale=3;
    
            frequency=Math.round(random(100,150))
            if(frameCount % frequency === 0){
                spawnGift();
            }
    }
    //console.log(score)
    if(score===3075){
        sound1.play();
    }
    if(score===4515){
        sound4.play();
    }
    if(score===6015){
        sound5.play();
    }
    if(score===8955){
        sound1.play();
    }
}
   else if( gameState === "end"){
       ground.changeImage("endBG",endBackground);
       ground.scale=1;

       stroke("white"); 
       fill("blue");
       strokeWeight(5);
       textSize(30);
       text("Press anywhere on the game screen to restart the game",100,100);
       
      
       helicopter.visible=false;
       slider.visible=false;
       helicopter.velocityX=0;
       GroupGift.destroyEach();

       
   }
   if((keyDown("r")|| touches.length>0)&& gameState==="end"){
       ground.changeImage("serveBG",serveBackground)  
       gameState="serve";
       ground.scale=3
       helicopter.x=120;
       slider.x=width/2;
       GroupGift.destroyEach();
       lives=3;
       score=0;
       helicopter.changeImage("helicopterforward",helicopterImg) ;
       //helicopter.velocityX=3
       resetFlag=true;
       touches=[];
}

    if(gameState !== "serve"){
    stroke("lime");
    fill("white");
    strokeWeight(3);
    textSize(20);
    text("SCORE : "+score,30,30);
    text("LIVES : "+lives,width-115,30);
    }
    //console.log(gameState)
}
/*function keyPressed(){
    if(keyIsDown(LEFT_ARROW)){
        slider.x-=getVelocity();
        //console.log(slider.x)
    }
    if(keyIsDown(RIGHT_ARROW)){
        slider.x+=getVelocity();
       // console.log("right"+slider.x)
    }
}*/
function spawnGift(){
    //console.log("spawnGift")
       var gift= createSprite(helicopter.x,65);
        gift.addImage(giftImg);
        gift.scale=0.2;
        //var rand=Math.round(random(1,3))
        gift.velocityY=3;
        gift.lifeTime=height/3+20
        GroupGift.add(gift)
        
}
/*function getVelocity(){
    if (score<1500){
        return 45;
    }
    else if(score>=1500 || score<3000) {
        return 50;
    }
    else if(score>=3000 || score<4500){
        return 55;
    }
    else if(score>=4500 || score<6000){
        return 60;
    }
    else {
        return 65;
    }
}*/


function touchStarted(){
    console.log("start",mouseX) 
    return false;
  }
  
  function touchMoved(){
    //stroke(255, 0, 0);
    //line(touchX, touchY, ptouchX, ptouchY);
    
    //console.log("touchmoved mouse",mouseX) 
    slider.x = mouseX
    //slider.y = mouseY
    return false;
  }
  
  function touchEnded(){
    //stroke(0, 0, 255);
    //line(touchX, touchY, ptouchX, ptouchY);
   
    //console.log("touchEnded touch",touchX)
    //console.log("touchend",mouseX)
    slider.x = mouseX
    //slider.y = mouseY
    return false;
  }
