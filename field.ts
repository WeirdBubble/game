import { Cell, Candy, OnMovement } from './cells';
import {random} from 'lodash';
import { Pockemon, Direction } from './pockemon';


export interface FieldParametres {
    width : number;
    height : number; 
}

// function onMovement(pockemon: Pockemon, direction: Direction) {}



export class Field {
    private cells : Cell[][];

    constructor(parametres: FieldParametres = {
        height: 5, 
        width: 5
    }) {
        const onMovementCreate = (x: number, y: number): OnMovement => {
            return (pockemon, direction) => {
                const movementAllowed = (): boolean => {
                    switch (direction) {
                        case Direction.right: 
                            return (x + 1) < (parametres.width);
                        case Direction.left:
                            return (x - 1) >= (0);
                        case Direction.down:
                            return (y + 1) < (parametres.height);
                        case Direction.up:
                            return (y - 1) >= (0); 
                    };
                  
                };

                const newCoords = (): {x: number; y: number} => {
                    switch (direction) {
                        case Direction.right:                             
                            return {
                                x: x + 1,
                                y: y
                            };
                        case Direction.left:
                            return {
                                x: x - 1,
                                y: y
                            };
                        case Direction.down:
                            return {
                                x: x,
                                y: y + 1
                            }
                        case Direction.up:
                            return {
                                x: x,
                                y: y - 1
                            }; 
                    };
                  
                };

                

                if (movementAllowed()) {
                    this.cells[x][y].pockemon = undefined;
                    const newPoint = newCoords();
                    this.cells[newPoint.x][newPoint.y].pockemon = pockemon;
                    console.log(`Pockemon has moved to (${newPoint.x};${newPoint.y})`);
                    
                } else {
                    console.error(`ajaja!!!`);
                }
            };
        }

        this.cells = [];
        for (let x = 0; x < parametres.width; x++ ){
            this.cells[x] = [];
            for (let y = 0; y < parametres.height; y++){
                this.cells[x][y] = new Cell(onMovementCreate(x, y));
            }
        }
        // this.cells = createArray([5,5], () => new Cell(onMovementCreate(x, y)));
        //this.cells.forEach(i => console.log(i));

        const candyX = random(1, parametres.width - 1);
        const candyY = random(1, parametres.height - 1);
        const candy : Candy = random(0, 1);
        this.cells[candyX][candyY].candy = candy;
        const pockemon = new Pockemon();
        this.cells[0][0].pockemon = pockemon;
        
        pockemon.move(Direction.up);




        // function randomPockemonXY() {
        //     const x = random(0, parametres.width - 2);
        //     const y = random(0, parametres.height - 2);
        //     if ( x != candyX && y != candyY){
        //         return this.cells[x][y];
        //     } else { 
        //         if(x == candyX){
        //         return this.cells[parametres.width - 1][y];
        //         } else {
        //             return this.cells[x][parametres.height - 1];
        //         }
        //     }
        // }
        
         
        



    }
}

