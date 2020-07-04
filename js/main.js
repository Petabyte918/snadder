var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor:'#000',
    // parent:'app',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug:false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update :update,
        render: render
    }
}; 

let game = new Phaser.Game(config);
let plateform = null;
let player = null;
let tiles = []; 
let dieNumber = 0;
let state = STATE.rolling;

function preload ()
{
    // this.load.setBaseURL('http://labs.phaser.io');
  
    this.load.image('sky', 'assets/images/background0.png');
    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('tile', 'assets/images/tile.png');
    this.load.image('die', 'assets/images/die.png');
    this.load.image('snakes', 'assets/images/snakes.png');
    this.load.image('ladders', 'assets/images/ladders.png');
    // this.load.spritesheet('snakes', 'assets/images/snakesheet.png',
    //     {frameWidth:72,frameHeight:147}
    // );
    this.load.spritesheet('male', 
        'assets/male.png',
        { frameWidth: 32, frameHeight: 42.6 }
    );

    this.load.json('levels', 'assets/levels/level.json');
}

function create ()
{   
    let data = this.cache.json.get('levels')
    /** game Background  */
    this.add.image(400, 300, 'sky');

    //  Event Emitter instance
    var emitter = new Phaser.Events.EventEmitter();

    /** plateforms  */
    plateforms = this.physics.add.staticGroup();
    createTiles();
    for(let tile of tiles){
        plateforms.create(tile.x,tile.y,'tile');
    }

    this.add.image(325, 275, 'ladders');
    this.add.image(325, 275, 'snakes');

    loadLevel(data,1,this);
    /** Die */
    let die = plateforms.create(650,500,'die');
    die.setInteractive();
    die.on('click',dieHandler,this);

    /** player */
    player = this.physics.add.sprite(100,450,'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);
    this.physics.add.collider(player,plateform);

    //  If a Game Object is clicked on, this event is fired.
    //  We can use it to emit the 'clicked' event on the game object itself.
    this.input.on('gameobjectup', function (pointer, gameObject)
    {
        gameObject.emit('click', gameObject);
    }, this);

    //  Display the game status 
    info = this.add.text(600, 10, '', { font: '30px Arial', fill: '#333' });

    // timer = this.time.addEvent({ delay: 10000, callback: gameOver, callbackScope: this });
}

function render() {

    game.debug.geom(line1);
    game.debug.lineInfo(line1, 32, 32);

    game.debug.text("Drag the handles", 32, 550);

}

function update(time,delta){
    // info.setText('Die: ' + dieNumber + '\nTime: ' + Math.floor(10000 - timer.getElapsed()));
    info.setText('Die: ' + dieNumber);

}

function createTiles(){
  // Create all the tiles from bottom to top
  let x = 0;
  let y = (ROWS - 1) * RESOLUTION;
  let dir = 1;
  for (let i = 0; i < COLS * ROWS; i++) {
    let tile = new Tile(x + TRANSLATE_X, y + TRANSLATE_Y, RESOLUTION, i, i + 1);
    tiles.push(tile);
    x = x + RESOLUTION * dir;
    // Move along a winding path up the ROWS
    if (x >= WIDTH || x <= -RESOLUTION) {
      dir *= -1;
      x += RESOLUTION * dir;
      y -= RESOLUTION;
    }
  }
}

function dieHandler (die)
{
    dieNumber = getRandom(1,6);
    // die.off('clicked', dieHandler);
    // die.input.enabled = false;
    // die.setVisible(false);
}

function gameOver (){
    if(state != null && state != 'undefined'){
        if(state == STATES.gameover){
            this.input.off('gameobjectup');
        }
    }
}

function getRandom(min,max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}

function loadLevel(data,number,context){
    let snakes = data.levels[number-1].snakes;
    let ladders = data.levels[number-1].ladders;
    // createSnakes(snakes,context);
    // createLadders(ladders,context);

}

function createSnakes(snakes,context){
   for(let i=0;i<snakes.length;i++){
       var pos1 = tiles[snakes[i].start].center();
       var pos2 = tiles[snakes[i].end].center();
       console.log(pos1,pos2,cartesian2Polar(pos1,pos2));
       var d =cartesian2Polar(pos1,pos2);
       context.add.line(pos1.x, pos1.y, d.distance, d.radians, 140, 0, 0x6666ff);
   }
 
} 

function createLadders(ladders,context){
    for(let i=0;i<ladders.length;i++){
        // console.log(ladders[i]);
    }
 
}

function cartesian2Polar(pos1,pos2){
    distance = Math.sqrt( (pos2.x-pos1.x)*(pos2.x-pos1.x) + (pos2.y-pos1.y)*(pos2.y-pos1.y) )
    radians = Math.tan((pos2.y-pos1.y)/(pos2.x-pos1.x)) / (180/Math.PI);
    // radians = Math.atan2(y,x) //This takes y first
    polarCoor = { distance:distance, radians:radians }
    return polarCoor
}

