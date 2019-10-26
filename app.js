'use strict';

const CANVAS     = document.getElementById('canvas'),
      CTX        = CANVAS.getContext('2d'),
      WIDTH      = CANVAS.width  = 400,
      HEIGHT     = CANVAS.height = 400,
      CELL_SIZE  = 10,
      FINAL_SCORE = 3;

let intervalId;
class Ball {
    constructor() {
        this.positionX = WIDTH / 2;
        this.positionY = HEIGHT / 2;
        this.xSpeed    = -2;
        this.ySpeed    = 1;
        this.ballSize  =  CELL_SIZE;
    }

    draw() {
        CTX.fillStyle = 'red';
        CTX.beginPath();
        CTX.arc(this.positionX, this.positionY, CELL_SIZE, 0, Math.PI * 2, false);
        CTX.fill();
    }

    move() {
        this.positionX += this.xSpeed;
        this.positionY += this.ySpeed;
    }

    checkCollision() {
        // Goal to userLeft
        if (this.positionX < this.ballSize * 1.5) {
            counter.score[1]++;
            printCycle();
            clearInterval(intervalId);
            counter.score[1] != FINAL_SCORE ? setTimeout(gameCycle, 1000) : isWinner('Right');
        }

        // Goal to userRight
        if (this.positionX > WIDTH - this.ballSize * 1.5) {
            counter.score[0]++;
            printCycle();
            clearInterval(intervalId);
            counter.score[0] != FINAL_SCORE ? setTimeout(gameCycle, 1000) : isWinner('Left');
        }

        // Rebound from the bottom or from the top
        if (this.positionY < this.ballSize || this.positionY > HEIGHT - this.ballSize) {
            this.ySpeed = -this.ySpeed;
        }

        // bounce off the left player
        if (ball.positionX - CELL_SIZE <= CELL_SIZE * 2) {
            for (let i = 0; i < userLeft.body.length; i++) {
                if (ball.positionY + CELL_SIZE >= userLeft.body[0][1] - CELL_SIZE &&
                    ball.positionY - CELL_SIZE <= userLeft.body[5][1] + CELL_SIZE) {
                    this.xSpeed = -this.xSpeed;
                    return;
                }
            }
        }

        // bounce off the right player
        if (ball.positionX + CELL_SIZE >= WIDTH - CELL_SIZE * 2) {
            for (let i = 0; i < userRight.body.length; i++) {
                if (ball.positionY + CELL_SIZE >= userRight.body[0][1] - CELL_SIZE &&
                    ball.positionY - CELL_SIZE <= userRight.body[5][1] + CELL_SIZE) {
                    this.xSpeed = -this.xSpeed;
                    return;
                }
            }
        }
    }
}
class User {
    constructor (x) {
        this.positionX = x;
        this.positionY = HEIGHT / 2 - CELL_SIZE * 3;
        this.body = [];
    }

    draw () {
        for (let i = 0; i < 6; i++) {
            this.body[i] = [
                this.positionX, 
                this.positionY + CELL_SIZE * i
            ];
            CTX.fillStyle = 'gold';
            CTX.fillRect(this.body[i][0], this.body[i][1], CELL_SIZE, CELL_SIZE);
        }
    }

    move (direction) {
        if (direction === 'top' && this.positionY) {
            this.positionY -= CELL_SIZE;
            for (let i = 0; i < this.body.length; i++) {
                this.body[i].positionY = this.positionY;
            }
        }
        if (direction === 'down' && this.positionY < HEIGHT - CELL_SIZE*6) {
            this.positionY += CELL_SIZE;
            for (let i = 0; i < this.body.length; i++) {
                this.body[i].positionY = this.positionY;
            }
        }
        
    }
}
class ScoreCounter {
    constructor () {
        this.score = [0,0];
    }

    draw() {
        CTX.font = 'bold 100px Verdana';
        CTX.fillStyle = 'rgba(255, 255, 255, .1)';
        CTX.textAlign = 'center';
        CTX.textBaseline = 'top';
        CTX.fillText(`${this.score[0]}:${this.score[1]}`, WIDTH / 2, CELL_SIZE * 3);
    }
}

// moving players
document.addEventListener('keydown', event => {
    if      (event.keyCode == 87) userLeft.move('top');
    else if (event.keyCode == 83) userLeft.move('down');
    else if (event.keyCode == 38) userRight.move('top');
    else if (event.keyCode == 40) userRight.move('down');
});

let ball      = new Ball(),
    userLeft  = new User(CELL_SIZE),
    userRight = new User(WIDTH - CELL_SIZE * 2),
    counter   = new ScoreCounter();

let gameCycle = function () {
        ball.positionX      = WIDTH / 2;
        ball.positionY      = HEIGHT / 2;
        userLeft.positionY  = (HEIGHT / 2) - CELL_SIZE * 3;
        userRight.positionY = (HEIGHT / 2) - CELL_SIZE * 3;
        printCycle();

        setTimeout(() => {
            intervalId = setInterval(() => {
                printCycle();
                ball.move();
                ball.checkCollision();
            }, 20);
        }, 3000);
    },
    printCycle = function () {
        CTX.clearRect(0, 0, WIDTH, HEIGHT);
        counter.draw();
        userLeft.draw();
        userRight.draw();
        ball.draw();
    },
    isWinner = function (winner) {
        printCycle();
        CTX.font         = '30px Courier';
        CTX.fillStyle    = 'gold';
        CTX.textAlign    = 'center';
        CTX.textBaseline = 'middle';
        CTX.fillText('Game over!', + WIDTH / 2, HEIGHT / 2 - 35);
        CTX.fillText(winner + ' player', + WIDTH / 2, HEIGHT / 2 + 20);
        CTX.fillText('is winner!', + WIDTH / 2, HEIGHT / 2 + 55);
    };

gameCycle();