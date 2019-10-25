'use strict';

let canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = 400,
    height = canvas.height = 400,
    cellSize = 10,
    speedX = 5,
    speedY = -5;

class Cell {
    constructor (x, y, color) {
        this.positionX = x;
        this.positionY = y;
        this.color = color;
    }

    drawSquare () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.positionX, this.positionY, cellSize, cellSize);    
    }

    drawCircle () {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, cellSize, 0, Math.PI * 2, false);
        ctx.fill();
    }
}

class User {
    constructor (x, y, color) {
        this.positionX = x;
        this.positionY = y;
        this.color = color;
        this.body = [];
    }

    draw () {
        for (let i = 0; i < 6; i++) {
            this.body[i] = new Cell (
                this.positionX, 
                this.positionY + cellSize * i, 
                this.color
            );
            this.body[i].drawSquare();
        }
    }

    move (direction) {
        if (direction === 'top') {
            this.positionY -= cellSize;
            for (let i = 0; i < this.body.length; i++) {
                this.body[i].positionY = this.positionY;
            }
        }
        if (direction === 'down') {
            this.positionY += cellSize;
            for (let i = 0; i < this.body.length; i++) {
                this.body[i].positionY = this.positionY;
            }
        }
        
    }
}




let circle = new Cell(width / 2, height / 2, 'red').drawCircle(),
    leftUser = new User(cellSize, (height / 2) - cellSize * 3, 'gold'),
    rightUser = new User(width - cellSize*2, (height / 2) - cellSize * 3, 'gold');
    
    
// leftUser.draw();
rightUser.draw();


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
    ctx.clearRect(0, 0, width, height);
    leftUser.draw();
    rightUser.draw();

    
}, 100);






