
class Player{
    constructor(pos,body){
        this.pos = pos;
        this.body = body;
        this.health = 0;
        this.bullets = 0;
        this.coins = 0; 
        this.hearts = 0;
        this.direction = 1;
    }

    setBody(body){ 
        this.body = body;
    }
    setHealth(health){
        this.health = health;
    }
    setCoins(coins){
        this.coins = coins;
    }
    setHearts(hearts){
        this.hearts = hearts;
    }


}