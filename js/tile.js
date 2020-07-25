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
        // this.snadder = 0;
        this.tileFeature = null;
        this.featureType = null;
        this.featureBody = null;
    }

    center(){
        return {
            x:this.x+this.wh/2,
            y:this.y-this.wh/2
        }
    }
}