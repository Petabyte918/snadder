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
let player = new Player(0,null);
let tiles = []; 
let diceNumber = 0;
let state = STATES.rolling;
let snakes = array();
let ladders = array();

/**
 * Preload all the assets required of game.
 */
function preload ()
{
    // this.load.setBaseURL('http://labs.phaser.io');
  
    this.load.image('sky', 'assets/images/background0.png');
    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('glow', 'assets/images/glowtile.png');
    this.load.image('tile', 'assets/images/tile.png');
    this.load.image('dice', 'assets/images/dice.png');
    this.load.image('snakes', 'assets/images/snakes.png');
    this.load.image('ladders', 'assets/images/ladders.png');
    // this.load.spritesheet('snakes', 'assets/images/snakesheet.png',
    //     {frameWidth:72,frameHeight:147}
    // );
    this.load.spritesheet('male', 
        'assets/images/male.png',
        { frameWidth: 32, frameHeight: 32 }
    );

    this.load.json('levels', 'assets/levels/level.json');
}

/**
 * Setup all the environment and configs
 */
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
    
    /** Dice */
    let dice = plateforms.create(650,500,'dice');
    dice.setInteractive();
    dice.on('click',diceHandler,this);

    /** player */
    player = this.add.sprite(TRANSLATE_X,HEIGHT,'male');
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('male', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('male', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

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

/**
 * for debuging
 */
function render() {

    game.debug.geom(player);
    // game.debug.lineInfo(line1, 32, 32);

    game.debug.text("Drag the handles", 32, 550);

}

/**
 * Update the screen refresh
 * @param {*} time 
 * @param {*} delta 
 */
function update(time,delta){
    // info.setText('Die: ' + diceNumber + '\nTime: ' + Math.floor(10000 - timer.getElapsed()));
    info.setText('Dice: ' + diceNumber);
    if(diceNumber>0)
        player.anims.play('right',true);
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

function diceHandler (dice)
{
    diceNumber = getRandom(1,6);
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

function loadLevel(data,number,context){
    // snakes = data.levels[number-1].snakes;
    // ladders = data.levels[number-1].ladders;
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


function movePlayer(current,steps){

}