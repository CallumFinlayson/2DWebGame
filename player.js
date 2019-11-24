(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

//variables
//var player;
var pwidth = 5;
var pheight = 5;
var PlayerXstartX = 26;
var PlayerXstartY = 234;
var PlayerYstartX = 929;
var PlayerYstartY = 234;
var px;
var py;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = 960;
var height = 640;
canvas.width = width;
canvas.height = height;
var keys = [];
var gravity = 1;
var jumping = false;
var xTeamSize;
var yTeamSize;
var xScoreLabel; //Text value
var yScoreLabel; //Text value
var xTeamScore = 0; //Int value
var yTeamScore = 0; //Int value
//must be sent to false to begin only true now to test code
var isPlayerX = false;
var isPlayerY = true;
var playerColour;
var Xcolour = "red";
var Ycolour = "blue";
var onPlatform = false;
flagCarryingByX = false;
flagCarryingByY = false;
var playerSpeed;
var jumpSpeed = 4;

if (isPlayerY) {
    px = PlayerYstartX;
    py = PlayerYstartY;
    //playerColour = Ycolour;
}
if (isPlayerX) {
    px = PlayerXstartX;
    py = PlayerXstartY;
    //playerColour = Xcolour;
}

var platforms = {
    start : function() {
        //making the platforms
        //red team starting point and red flag start point
        //ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(0,240,100,10);
        //Flag
        if (!flagCarryingByY) {
            ctx.fillRect(10,209,10,30);
        }
        //blue team starting point and blue flag start point
        ctx.fillStyle = "blue";
        ctx.fillRect(860,240,100,10);
        //Flag
        if (!flagCarryingByX) {
            ctx.fillRect(940,209,10,30);
        }
        //Making the platforms
        ctx.fillStyle = "black";
        ctx.fillRect(140,340,75,10); 
        ctx.fillRect(745,340,75,10); 
        ctx.fillRect(0,540,75,10); 
        ctx.fillRect(885,540,75,10); 
        ctx.fillRect(442.5,490,75,10); 
        ctx.fillRect(442.5,340,75,10); 
        ctx.fillRect(140,440,75,10); 
        ctx.fillRect(745,440,75,10); 
        ctx.fillRect(291.25,390,75,10); 
        ctx.fillRect(593.75,390,75,10);
        //Floor of the canvas 
        //return player to start position if they hit this
        ctx.fillStyle = "orange";
        ctx.fillRect(0,630,960,10);
    }
}

function isCarryingFlagplayerOnPlatform() {
    //red base
    if (((px>=0)&&(px<=100))&&((py>=209)&&(py<=250))) { //ctx.fillRect(0,240,100,10);
        jumping = false;
        py = 209;
        onPlatform = true;
        if (isPlayerX) {
            updateScore();
        } 
    }
    //blue base
    else if (((px>=860)&&(px<=960))&&((py>=209)&&(py<=250))) { //ctx.fillRect(860,240,100,10);
        jumping = false;
        py = 209;
        onPlatform = true;
        if (isPlayerY) {
            updateScore();
        }
    }
    //black platforms
    else if (((px>=140)&&(px<=215))&&((py>=309)&&(py<=350))) { //ctx.fillRect(140,340,75,10);
        jumping = false;
        py = 309;
        onPlatform = true;
    } else if (((px>=745)&&(px<=820))&&((py>=309)&&(py<=350))) { //ctx.fillRect(745,340,75,10);
        jumping = false;
        py = 309;
        onPlatform = true;
    } else if (((px>=0)&&(px<=75))&&((py>=509)&&(py<=550))) { //ctx.fillRect(0,540,75,10);
        jumping = false;
        py = 509;
        onPlatform = true;
    } else if (((px>=885)&&(px<=960))&&((py>=509)&&(py<=550))) { //ctx.fillRect(885,540,75,10);
        jumping = false;
        py = 509;
        onPlatform = true;
    } else if (((px>=442.5)&&(px<=517.5))&&((py>=459)&&(py<=500))) { //ctx.fillRect(442.5,490,75,10);
        jumping = false;
        py = 459;
        onPlatform = true;
    } else if (((px>=442.5)&&(px<=517.5))&&((py>=309)&&(py<=350))) { //ctx.fillRect(442.5,340,75,10);
        jumping = false;
        py = 309;
        onPlatform = true;
    } else if (((px>=140)&&(px<=215))&&((py>=409)&&(py<=450))) { //ctx.fillRect(140,440,75,10);
        jumping = false;
        py = 409;
        onPlatform = true;
    } else if (((px>=745)&&(px<=820))&&((py>=409)&&(py<=450))) { //ctx.fillRect(745,440,75,10);
        jumping = false;
        py = 409;
        onPlatform = true;
    } else if (((px>=291.25)&&(px<=366.25))&&((py>=359)&&(py<=400))) { //ctx.fillRect(291.25,390,75,10);
        jumping = false;
        py = 359;
        onPlatform = true;
    } else if (((px>=593.75)&&(px<=668.75))&&((py>=359)&&(py<=400))) { //ctx.fillRect(593.75,390,75,10);
        jumping = false;
        py = 359;
        onPlatform = true;
    } else {
        onPlatform = false;
    }
}
function isPlayerOnPlatform() {
    //red base
    if (((px>=0)&&(px<=100))&&((py>=234)&&(py<=250))) { //ctx.fillRect(0,240,100,10);
        jumping = false;
        py = 234;
        onPlatform = true;
        if (isPlayerY) {
            flagCarryingByY = true;
            py = 209;
            pwidth = 10;
            pheight = 30;
        }
    }
    //blue base
    else if (((px>=860)&&(px<=960))&&((py>=234)&&(py<=250))) { //ctx.fillRect(860,240,100,10);
        jumping = false;
        py = 234;
        onPlatform = true;
        if (isPlayerX) {
            flagCarryingByX = true;
            py = 209;
            pwidth = 10;
            pheight = 30;
        } 
    }
    //black platforms
    else if (((px>=140)&&(px<=215))&&((py>=334)&&(py<=350))) { //ctx.fillRect(140,340,75,10);
        jumping = false;
        py = 334;
        onPlatform = true;
    } else if (((px>=745)&&(px<=820))&&((py>=334)&&(py<=350))) { //ctx.fillRect(745,340,75,10);
        jumping = false;
        py = 334;
        onPlatform = true;
    } else if (((px>=0)&&(px<=75))&&((py>=534)&&(py<=550))) { //ctx.fillRect(0,540,75,10);
        jumping = false;
        py = 534;
        onPlatform = true;
    } else if (((px>=885)&&(px<=960))&&((py>=534)&&(py<=550))) { //ctx.fillRect(885,540,75,10);
        jumping = false;
        py = 534;
        onPlatform = true;
    } else if (((px>=442.5)&&(px<=517.5))&&((py>=484)&&(py<=500))) { //ctx.fillRect(442.5,490,75,10);
        jumping = false;
        py = 484;
        onPlatform = true;
    } else if (((px>=442.5)&&(px<=517.5))&&((py>=334)&&(py<=350))) { //ctx.fillRect(442.5,340,75,10);
        jumping = false;
        py = 334;
        onPlatform = true;
    } else if (((px>=140)&&(px<=215))&&((py>=434)&&(py<=450))) { //ctx.fillRect(140,440,75,10);
        jumping = false;
        py = 434;
        onPlatform = true;
    } else if (((px>=745)&&(px<=820))&&((py>=434)&&(py<=450))) { //ctx.fillRect(745,440,75,10);
        jumping = false;
        py = 434;
        onPlatform = true;
    } else if (((px>=291.25)&&(px<=366.25))&&((py>=384)&&(py<=400))) { //ctx.fillRect(291.25,390,75,10);
        jumping = false;
        py = 384;
        onPlatform = true;
    } else if (((px>=593.75)&&(px<=668.75))&&((py>=384)&&(py<=400))) { //ctx.fillRect(593.75,390,75,10);
        jumping = false;
        py = 384;
        onPlatform = true;
    } else {
        onPlatform = false;
    }
}

function playerOnPlatform() {
    if (flagCarryingByX || flagCarryingByY) {
        isCarryingFlagplayerOnPlatform();
    } else {
        isPlayerOnPlatform();
    }
}
function updatePlayer() {
    //player size
    if (isPlayerX) {
        if (flagCarryingByX) {
            pwidth = 10;
            pheight = 30;
        }
    } else if (isPlayerY) {
        if (flagCarryingByY) {
            pwidth = 10;
            pheight = 30;
        }
    } else {
        pwidth = 5;
        pheight = 5
    }
    //player colour
    if (isPlayerX && flagCarryingByX) {
        Xcolour = "blue";
    } else if (isPlayerY && flagCarryingByY) {
        Ycolour = "red";
    }
}
function scorePoint() {
    if (isPlayerX) {
        flagCarryingByX = false;
        xTeamScore = xTeamScore + 1;
    } else if (isPlayerY) {
        flagCarryingByY = false;
        yTeamScore = yTeamScore + 1;
    }
}
function updateScore() {
    if (isPlayerX && flagCarryingByX) {
        scorePoint();
        pwidth = 5;
        pheight = 5;
        colour = "red"
        Xcolour = colour;
    } 
    else if (isPlayerY && flagCarryingByY) {
        scorePoint();
        pwidth = 5;
        pheight = 5;
        colour = "blue"
        Ycolour = colour;
    }
}
function jump() {
    if (onPlatform) {
        py = py - 10;
        gravity = -5;
        setTimeout(Fetchdata, 450);
        updatePlayer();         
    }
}
function Fetchdata() {
    gravity = 1;
}            
//game functionallity
function update() {
    timer();
    // check keys
    if (keys[38]) {
        // up arrow
        if (onPlatform) {
            jump();
            jumping = true;
        }
    }
    if (keys[39]) {
        // right arrow
        px = px + 1;
        updatePlayer();
        jumping = true;
        playerOnPlatform();
    }                              
    if (keys[37]) { 
        //left arrow
        px = px -1;
        updatePlayer();
        jumping = true;
        playerOnPlatform();
    }
    if (jumping) {
        playerOnPlatform();
        py = py + gravity;
    }
  
    //Staying in the game canvas
    if (px >= width-pwidth) {
        px = width- pwidth;
    } else if (px <= 0) {         
        px = 0;     
    } else if(((px>=0)&&(px<=960))&&(py>=624)){ //ctx.fillRect(0,630,960,10);
        if (isPlayerX) {
            px = PlayerXstartX;
            py = PlayerXstartY;
        } else if (isPlayerY) {
            px = PlayerYstartX;
            py = PlayerYstartY;
        }
    //The floor is lava
    } else if(flagCarryingByX || flagCarryingByY){ //ctx.fillRect(0,630,960,10);
        if (((px>=0)&&(px<=960))&&(py>=599)){
            if (isPlayerX) {
                flagCarryingByX = false;
                pheight = 5;
                pwidth = 5;
                px = PlayerXstartX;
                py = PlayerXstartY;
                Xcolour = "red";
            } else if (isPlayerY) {
                flagCarryingByY = false;
                pheight = 5;
                pwidth = 5;
                px = PlayerYstartX;
                py = PlayerYstartY;
                Ycolour = "blue";
            }
        }
    } else if (py <=0){
        py = 0;
    }
    updatePlayer();
    playerOnPlatform();
    ctx.clearRect(0,0,width,height);
    var colour;
    if (isPlayerX) {
        colour = Xcolour;
    } else if (isPlayerY) {
        colour = Ycolour;
    }
    ctx.fillStyle = colour;
    ctx.fillRect(px, py, pwidth, pheight);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(0,0, 960, 60);
    xScoreLabel = "Red Team Score: " + xTeamScore;
    xScoreLabel.fontsize = "30px";
    yScoreLabel = "Blue Team Score: " + yTeamScore;
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(xScoreLabel, 10,40);
    ctx.fillText(yScoreLabel, 650, 40);
    platforms.start();
    requestAnimationFrame(update);
}

document.body.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});    
    
window.addEventListener("load", function(){
    //createPlayers();
    update();
});
