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
        update :update
    }
}; 

let game = new Phaser.Game(config);
let plateform = null;
let player = null;
let tiles = []; 

function preload ()
{
    // this.load.setBaseURL('http://labs.phaser.io');
  
    this.load.image('sky', 'assets/background0.png');
    // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    // this.load.image('red', 'assets/particles/red.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('tile', 'assets/images/tile.png');
    this.load.spritesheet('male', 
        'assets/male.png',
        { frameWidth: 32, frameHeight: 42.6 }
    );
}

function create ()
{
    this.add.image(400, 300, 'sky');
  
    plateforms = this.physics.add.staticGroup();
    // platforms.create(400, 568, 'tile').setScale(2).refreshBody();

    createTiles();
    for(let tile of tiles){
        // console.log(JSON.stringify(tile));
        plateforms.create(tile.x,tile.y,'tile');
    }

    player = this.physics.add.sprite(100,450,'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);
    this.physics.add.collider(player,plateform);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
}

function update(time,delta){
    
}

function createTiles(){
  // Create all the tiles from bottom to top
  let x = 0;
  let y = (ROWS - 1) * RESOLUTION;
  let dir = 1;
  for (let i = 0; i < COLS * ROWS; i++) {
    let tile = new Tile(x+100, y + 80, RESOLUTION, i, i + 1);
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
