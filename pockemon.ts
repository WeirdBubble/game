
import {Observer, Observable} from 'rxjs';

export enum Direction {right, left, up, down}

export class Pockemon {
    private pack: number;
    private isfull: boolean;
    private event: Observer<Direction>;

    readonly movement: Observable<Direction>;

    constructor() {
       this.pack = 0;
       this.isfull = false;
       this.movement = Observable.create((observe: Observer<Direction>) => {
           this.event = observe;
       });
    }

    move(direction: Direction): void {
        this.event.next(direction);
    }
}