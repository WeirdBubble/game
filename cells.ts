import {random} from 'lodash';
import {Pockemon} from './pockemon';
import {Direction} from './pockemon';

export type OnMovement = (pockemon: Pockemon, direction: Direction) => void;

export enum Candy {free, chargeable};

export class Cell{
    private coins: number;
    private _pockemon?: Pockemon;

    candy?: Candy;

    onMovement: OnMovement;

    set pockemon(pockemon: Pockemon | undefined) {
        // console.log()
        this._pockemon = pockemon;
        
        if (pockemon) {
            pockemon.movement.subscribe((direction: Direction) => {
                console.log(Direction[direction]);
                this.onMovement(pockemon, direction);
            });
        }
    }
    get pockemon(): Pockemon | undefined {
        return this._pockemon;
    }

    constructor(onMovement: OnMovement) {
        this.coins = random(0, 5);
        this.onMovement = onMovement;
    }
}