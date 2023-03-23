var bar1=document.getElementById("bar-1");
var ai=document.getElementById("bar-2");
var ball=document.getElementById("ball");
var movement=25;

const thisBar1="Bar-1";
const thisBar2="AI";
const storeName="abc";
const storeScore=123;

let whichBar;
let moveX=2;
let moveY=2;
let ballMoving;
let border=12;
let score;
let gameStart=false;
const net = document.createElement('div');
net.classList.add('net');
document.body.appendChild(net);

const netHeight = 2; 
const netWidth = window.innerWidth; 

net.style.position = 'absolute';
net.style.top = '50%';
net.style.transform = 'translateY(-50%)';
net.style.height = netHeight + 'px';
net.style.width = netWidth + 'px';
net.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; 
const speed = 20;

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    player1Direction = -1;
  } else if (event.key === 'ArrowRight') {
    player1Direction = 1;
  } else if (event.key === 'a') {
    player2Direction = -1;
  } else if (event.key === 'd') {
    player2Direction = 1;
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    player1Direction = 0;
  } else if (event.key === 'a' || event.key === 'd') {
    player2Direction = 0;
  }
});

setInterval(() => {

  player1X += player1Direction * speed;
  if (player1X < 0) {
    player1X = 0;
  } else if (player1X + barWidth > containerWidth) {
    player1X = containerWidth - barWidth;
  }
  bar1.style.left = player1X + 'px';

  player2X += player2Direction * speed;
  if (player2X < 0) {
    player2X = 0;
  } else if (player2X + barWidth > containerWidth) {
    player2X = containerWidth - barWidth;
  }
  bar2.style.left = player2X + 'px';
}, 2.5);


localStorage.setItem(storeScore,"null");
localStorage.setItem(storeScore,"null");
(function(){
    highScore=localStorage.getItem(storeScore);
    whichBar=localStorage.getItem(storeName);
    if(whichBar==="null" || highScore==="null"){
        alert("Please Press Enter to start");
        highScore=0;
        whichBar=thisBar1;
    }
    else{
        alert(whichBar + " has maximum score of " + highScore*1);
    }
    gameReset(whichBar);
})();

function gameReset(barName){
    bar1.style.left=((window.innerWidth-bar1.offsetWidth)/2)+"px";
    ai.style.left=((window.innerWidth-ai.offsetWidth)/2)+"px";
    ball.style.left=((window.innerWidth-ball.offsetWidth)/2)+"px";

    if(barName === thisBar1){
        ball.style.top=ai.getBoundingClientRect().y-ai.getBoundingClientRect().height+"px";
        moveY=-2;
    }
    else if(barName === thisBar2){
        ball.style.top=bar1.getBoundingClientRect().height+"px";
        moveY=2;       
    }


    score=0;
    gameStart=false;
}
function changeBackgroundColor(color) {
  const container = document.querySelector('#container');
  container.style.backgroundColor = color;
}

document.addEventListener('keydown', function(event) {

  if (event.keyCode == 68 || event.keyCode == 39) {
    if (parseInt(bar1.style.left) < (window.innerWidth - bar1.offsetWidth - border)) {
      bar1.style.left = parseInt(bar1.style.left) + movement + 'px';
    }
  }

  if (event.keyCode == 65 || event.keyCode == 37) {
    if (parseInt(bar1.style.left) > border) {
      bar1.style.left = parseInt(bar1.style.left) - movement + 'px';
    }
  }

  if (event.keyCode == 13) {
    if (!gameStart) {
      gameStart = true;
      let ballRect = ball.getBoundingClientRect();
      let ballX = ballRect.x;
      let ballY = ballRect.y;
      let ballDia = ballRect.width;

      let bar1Height = bar1.offsetHeight;
      let aiHeight = ai.offsetHeight;
      let bar1Width = ai.offsetWidth;
      let aiWidth = ai.offsetWidth;

      ballMoving = setInterval(function() {
        let bar1X = bar1.getBoundingClientRect().x;
        let aiX = ai.getBoundingClientRect().x;

        let ballCentre = ballX + ballDia / 2;

        ballX += moveX;
        ballY += moveY;

        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        if (((ballX + ballDia) > window.innerWidth) || (ballX < 0)) {
          moveX = -moveX;
        }

        if (ballY <= bar1Height) {
          moveY = -moveY;
          score++;

          if ((ballCentre < bar1X) || (ballCentre > (bar1X + bar1Width))) {
            dataStoring(score, thisBar2);
          }
        }

        if ((ballY + ballDia) >= (window.innerHeight - aiHeight)) {
          moveY = -moveY;
          score++;

          if ((ballCentre < aiX) || (ballCentre > (aiX + aiWidth))) {
            dataStoring(score, thisBar1);
          }
        }

        let aiCentre = aiX + aiWidth / 2;
        if (ballCentre > aiCentre && aiX + aiWidth < window.innerWidth - border) {
          ai.style.left = parseInt(ai.style.left) + movement / 5 + 'px';
        } else if (ballCentre < aiCentre && aiX > border) {
          ai.style.left = parseInt(ai.style.left) - movement / 5 + 'px';
        }
      }, 5);
    }
  }
});



function dataStoring(scoreObtained, winningBar) {
  let currentScore = parseInt(localStorage.getItem(storeScore)) || 0;
  const newScore = currentScore + 1;
  if (newScore >= 20) {
    localStorage.setItem(storeScore, "20");
    alert("Game over. The winner is " + winningBar + " with a score of 20");
    clearInterval(ballMoving);
    gameReset(winningBar);
  } else {
    localStorage.setItem(storeScore, newScore.toString());
    alert("Point scored by " + winningBar + ". Current score: " + newScore);
  }
  localStorage.setItem(storeName, winningBar);
}


