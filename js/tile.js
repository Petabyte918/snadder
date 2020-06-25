/**
 * Tile 
 */
class Tile{
    
    constructor(x, y, wh, index, next){
        this.x = x;
        this.y = y;
        this.wh = wh;
        // index and next
        // TODO: (next is probably redundant?)
        this.index = index;
        this.next = next;
        this.snadder = 0;
        // Checkboard pattern
        if (this.index % 2 == 0) {
            this.color = 200;
        } else {
            this.color = 100;
        }
    }

    setup(){

    }   

    show(){

    }
}