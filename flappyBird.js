var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//audio files
var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

//some variables
var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.1;

var score = 0;

//load images
var bird = new Image();
var bGround = new Image();
var fGround = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bGround.src = "images/bGround.png";
fGround.src = "images/fGround.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//on key down
document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 35;
    fly.play();
}

//pipe coords
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
};

//draw Images
function draw(){

    ctx.drawImage(bGround,0,0);

    for(var i = 0; i<pipe.length; i++){

        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

        pipe[i].x--;

        if (pipe[i].x == 125){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        //detect collision

        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fGround.height){
            location.reload(); // reload the page
        }

        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
    }
    ctx.drawImage(fGround,0,cvs.height - fGround.height);
    ctx.drawImage(bird,bX,bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
}

draw();