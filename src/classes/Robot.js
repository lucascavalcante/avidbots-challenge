'use strict';

class Robot
{
    constructor(map)
    {
        this.position = map.initialPosition;
        this.matrix = map.matrix;
        this.usefulArea = map.usefulArea;
        this.path = [];
        this.cleanedArea = 0;
        this.clean();
    }

    start()
    {
        let startTime = Date.now();
        let timerInterval = setInterval(() => {
            if(this.cleanedArea === this.usefulArea){
                this.clean();
                clearInterval(timerInterval);
                let endTime = Date.now();
                let timeDuration = endTime - startTime;
                console.log("Cleaning task is done.");

                for(let i = 0; i < this.matrix.length; i++) {
                    console.log(this.matrix[i].join(''));
                }
                // io.emit('finish', {
                //     timeDuration: timeDuration*0.001,
                //     msg: "Task complete."
                // })
                return;
            }

            if(!this.isWallOrCleaned('top')){
                this.walk('top');
                this.path.push('down');
                return;
            }
            if(!this.isWallOrCleaned('down')){
                this.walk('down');
                this.path.push('top');
                return;
            }
            if(!this.isWallOrCleaned('right')){
                this.walk('right');
                this.path.push('left');
                return;
            }
            if(!this.isWallOrCleaned('left')){
                this.walk('left');
                this.path.push('right');
                return;
            }
            // backward
            this.walk(this.path.pop());
        }, 200);
    }

    isWallOrCleaned(direction)
    {
        let pos = { x: this.position.x, y: this.position.y };

        switch(direction) {
            case 'top':
                pos.x = this.position.x;
                pos.y = this.position.y - 1;
                break;
            case 'down':
                pos.x = this.position.x;
                pos.y = this.position.y + 1;
                break;
            case 'left':
                pos.x = this.position.x - 1;
                pos.y = this.position.y;
                break;
            case 'right':
                pos.x = this.position.x + 1;
                pos.y = this.position.y;
                break;
        }

        if(this.matrix[pos.y][pos.x] === '-' || this.matrix[pos.y][pos.x] === '#')
            return true;

        return false;
    }

    clean()
    {
        this.matrix[this.position.y][this.position.x] = '-';
        this.cleanedArea++;
    }

    currentPosition()
    {
        this.matrix[this.position.y][this.position.x] = '*';
    }

    walk(direction)
    {
        console.log('move: ' + direction);

        let end = 0;
        let currentPos = 0;
        let pos = { x: this.position.x, y: this.position.y };

        switch(direction){
            case 'top': 
                currentPos = this.position.y;
                end = 0;
                pos.y = this.position.y - 1;
                break;
            case 'right': 
                currentPos = this.position.x;
                end = this.matrix[this.position.y].length - 1;
                pos.x = this.position.x + 1;
                break;
            case 'down': 
                currentPos = this.position.y;
                end = this.matrix.length-1;
                pos.y = this.position.y + 1;
                break;
            case 'left': 
                currentPos = this.position.x;
                end = 0;
                pos.x = this.position.x-1;
                break;
            default: break;
        }

        if(currentPos === end || this.matrix[pos.y][pos.x] === '#'){
            return false;
        }
        this.position.x = pos.x;
        this.position.y = pos.y;
        this.clean();
        return true;
    }
}

module.exports = Robot;