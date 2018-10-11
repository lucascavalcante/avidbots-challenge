'use strict';

class Map
{
    constructor(mapString)
    {
        const arrChar = mapString.split('');
        this.initialPosition = { x: 1, y: 1};
        this.usefulArea = 0;
        this.matrix = [];
        var cols = [];

        arrChar.forEach(element => {
            if(element === '\n') {
                this.matrix.push(cols);
                cols = [];
            } else {
                cols.push(element);
            }
            
            if(element === ' ')
                this.usefulArea++;
        });

        for(let i = 0; i < this.matrix.length; i++) {
            let row = this.matrix[i].join('');
            console.log(row);
        }

        this.setInitialRandomPosition();
    }

    setInitialRandomPosition()
    {
        const matY = Math.floor(Math.random() * (0, this.matrix.length)) + 0;
        const matX = Math.floor(Math.random() * (0, this.matrix[0].length)) + 0;

        if(this.matrix[matY][matX] !== " ") {
            this.setInitialRandomPosition();
            return;
        }

        this.initialPosition.x = matX;
        this.initialPosition.y = matY;
    }
}

module.exports = Map;