'use strict';

const CANVAS = document.getElementById('canvas'),
      CTX = CANVAS.getContext('2d'),
      WIDTH = CANVAS.width = 400,
      HEIGHT = CANVAS.height = 400,
      CELL_SIZE = 10;

let speedX = 5,
    speedY = -5;

class Cell {
    constructor (x, y) {
        this.positionX = x;
        this.positionY = y;
    }

    drawSquare(color) {
        CTX.fillStyle = color;
        CTX.fillRect(this.positionX, this.positionY, CELL_SIZE, CELL_SIZE);    
    }

    drawCircle(color) {
        CTX.fillStyle = color;
        CTX.beginPath();
        CTX.arc(this.positionX, this.positionY, CELL_SIZE, 0, Math.PI * 2, false);
        CTX.fill();
    }
}

class User {
    constructor (x, y) {
        this.positionX = x;
        this.positionY = y;
        this.body = [];
    }

    draw () {
        for (let i = 0; i < 6; i++) {
            this.body[i] = new Cell (
                this.positionX, 
                this.positionY + CELL_SIZE * i, 
            );
            this.body[i].drawSquare('gold');
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

let circle = new Cell(WIDTH / 2, HEIGHT / 2).drawCircle('red'),
    leftUser = new User(CELL_SIZE, (HEIGHT / 2) - CELL_SIZE * 3),
    rightUser = new User(WIDTH - CELL_SIZE*2, (HEIGHT / 2) - CELL_SIZE * 3);
    
    
/**
 * Двигаем игроков
 * Левый: W - 87 - вверх, S - 83 - вниз
 * Правый: Стрелка вверх - 38 - вверх, Стрелка вниз - 40 - вниз
 */
document.addEventListener('keydown', event => {
    if (event.keyCode === 87) {
        leftUser.move('top');                     console.log('left top');
    } else if (event.keyCode === 83) {
        leftUser.move('down');                    console.log('left down');
    } else if (event.keyCode === 38) {
        rightUser.move('top');                    console.log('right top');
    } else if (event.keyCode === 40) {
        rightUser.move('down');                   console.log('right down');
    }
});

setInterval(() => {
    CTX.clearRect(0, 0, WIDTH, HEIGHT);
    leftUser.draw();
    rightUser.draw();
}, 100);






