var MainGame = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'main',
    plateform : null,
    player : new Player(0,null),
    tiles : [],
    diceNumber : 0,
    step : 0,
    state : STATES.rolling,
    snakes : [],
    ladders : [],
    fairies : [],
    demons : [],
    tasks : [],
    avator : 5,
    message : "",
    initialize:

    function MainGame ()
    {
        Phaser.Scene.call(this, { key: 'main', active: false });
    },

    preload:function(){
        // this.load.setBaseURL('http://labs.phaser.io');
  
        this.load.image('sky', 'assets/images/background0.png');
        // this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        // this.load.image('red', 'assets/particles/red.png');
        // this.load.image('ground', 'assets/platform.png');
        // this.load.image('star', 'assets/star.png');
        // this.load.image('bomb', 'assets/bomb.png');
        this.load.image('glow', 'assets/images/glowtile.png');
        this.load.image('tile', 'assets/images/tile.png');
        this.load.image('dice', 'assets/images/dice.png');
        this.load.image('snakes', 'assets/images/snakes.png');
        this.load.image('ladders', 'assets/images/ladders.png');
        
        this.load.spritesheet('male', 
            'assets/images/avators.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.spritesheet('fairy', 
            'assets/images/fairy.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        this.load.spritesheet('cobra', 
            'assets/images/cobras.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        this.load.spritesheet('demon', 
            'assets/images/demons.png',
            { frameWidth: 48, frameHeight: 48 }
        );

        this.load.json('levels', 'assets/levels/level.json');
    
    },
  
    create:function(){
        
        let data = this.cache.json.get('levels');
        /** game Background  */
        this.add.image(400, 300, 'sky');
    
        //  Event Emitter instance
        var emitter = new Phaser.Events.EventEmitter();
        this.loadLevel(data,1,this);
    
        /** plateforms  */
        plateforms = this.physics.add.staticGroup();
        this.createTiles();
        for(let tile of this.tiles){
            plateforms.create(tile.x,tile.y,'tile');
        }
    
        this.add.image(325, 275, 'ladders');
        // this.add.image(325, 275, 'snakes');
        this.addFeaturesToTiles(this);
        // for(let tile of tiles){
        //     console.log(tile.index,tile.featureType);
        // }
    
        /** fairies */
        this.anims.create({
            key: 'hover',
            frames: this.anims.generateFrameNumbers('fairy', { start: 3, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        /** snakes */
        this.anims.create({
            key: 'cobraHover',
            frames: this.anims.generateFrameNumbers('cobra', { start: 12, end: 35 }),
            frameRate: 8,
            repeat: -1
        });
        /** demon */
        this.anims.create({
            key: 'demonHover',
            frames: this.anims.generateFrameNumbers('demon', { start: 12, end: 35 }),
            frameRate: 8,
            repeat: -1
        });
        /** Dice */
        let dice = plateforms.create(650,500,'dice');
        dice.setInteractive();
        dice.on('click',this.diceHandler,this);
    
        /** player */
        p = this.add.sprite(TRANSLATE_X,HEIGHT,'male');
        p.setScale(0.8);
        this.player.setBody(p);
        this.anims.create({
            key: 'won',
            frames: this.anims.generateFrameNumbers('male', { start: 68, end: 71 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('male', { start: 84, end: 86 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({ 
            key: 'right',
            frames: this.anims.generateFrameNumbers('male', { start: 100, end: 103 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'stand',
            frames: this.anims.generateFrameNumbers('male', { start: 68, end: 68 }),
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
        this.diceNumberText  = this.add.text(600, 10, '', { font: '30px Arial', fill: '#333' });
        this.currentStepText = this.add.text(600, 70, '', { font: '30px Arial', fill: '#333' });
        this.messageText     = this.add.text(200, 600,'', { font: '40px Arial', fill: '#3f527b'});
        // timer = this.time.addEvent({ delay: 10000, callback: gameOver, callbackScope: this });
    },
  
    render:function(){
        game.debug.geom(player);
        // game.debug.lineInfo(line1, 32, 32);
        game.debug.text("Drag the handles", 32, 550);
    },

    update:function(time,delta){
            // info.setText('Die: ' + diceNumber + '\nTime: ' + Math.floor(10000 - timer.getElapsed()));
            this.diceNumberText.setText('Dice: ' + this.diceNumber);
            this.currentStepText.setText('Current pos: ' + (this.player.pos+1));
            this.messageText.setText("!! "+this.message + " !!");
            for(tile of this.tiles){
                if(tile.tileFeature != null){
                    if(tile.featureType == 'fairy'){
                        tile.featureBody.anims.play('hover',true);
                    }
                    if(tile.featureType == 'snake'){
                        tile.featureBody.anims.play('cobraHover',true);
                    }
                    if(tile.featureType == 'demon'){
                        tile.featureBody.anims.play('demonHover',true);
                    }
                }
            }
            if(this.state == STATES.rolling && this.player.pos ==0){
                this.player.body.anims.play('stand',true);
            }
            if(this.diceNumber>0 && this.state == STATES.moving ){
                if(this.tiles[this.player.pos +this.diceNumber] != 'undefined' && this.tiles[this.player.pos +this.diceNumber] != null){
                    
                    let current = this.tiles[this.player.pos];
                    if(this.tiles[this.player.pos +this.diceNumber].tileFeature !=null 
                        && this.tiles[this.player.pos +this.diceNumber].featureType != 'fairy' 
                        && this.tiles[this.player.pos +this.diceNumber].featureType != 'demon'){

                        if(this.tiles[this.player.pos +this.diceNumber].featureType == 'snake'){
                            this.player.pos = this.tiles[this.player.pos +this.diceNumber].tileFeature.end  -1;
                        }
                        else if(this.tiles[this.player.pos +this.diceNumber].featureType == 'ladder'){
                            this.player.pos += (this.tiles[this.player.pos +this.diceNumber].tileFeature.end - this.player.pos) -1;
                        }
                    }
                    else{
                        next =  this.tiles[this.player.pos +this.diceNumber];
                        this.player.pos += this.diceNumber;
                    } 
                    
                    if(current.y != this.tiles[this.player.pos].y){
                        this.player.direction *= -1;
                    }
                    if(this.player.direction>0){
                        this.player.body.anims.play('right',true);
                    }
                    else{
                        this.player.body.anims.play('left',true);
                    }
                    this.player.body.x = this.tiles[this.player.pos].x;
                    this.player.body.y = this.tiles[this.player.pos].y;
                    this.state = STATES.rolling; 

                    if(this.player.pos+1 == 100){
                        this.message = "You Won the game";
                        console.log("You Won the game !!")
                        this.state = STATES.won;
                        this.player.body.anims.play('won',true);

                    }
                }
                else{
                    this.message = "Wait for next turn"
                    console.log('wait for next turn !!');
                    this.state = STATES.rolling;
                    if(this.player.pos+1 == 100){
                        this.message = "You Won the game";
                        console.log("You Won the game !!")
                        this.state = STATES.won;

                    }


                }
                
            }
    },


    createTiles:function(){
        // Create all the tiles from bottom to top
        let x = 0;
        let y = (ROWS - 1) * RESOLUTION;
        let dir = 1;
        for (let i = 1; i <= COLS * ROWS; i++) {
          let tile = new Tile(x + TRANSLATE_X, y + TRANSLATE_Y, RESOLUTION, i, i + 1);
          this.tiles.push(tile);
          x = x + RESOLUTION * dir;
          // Move along a winding path up the ROWS
          if (x >= WIDTH || x <= -RESOLUTION) {
            dir *= -1;
            x += RESOLUTION * dir;
            y -= RESOLUTION;
          }
        }
    },

    diceHandler:function(dice)
    {
        if(this.state == STATES.rolling){
            this.diceNumber = getRandom(1,6);
            this.state = STATES.moving;
        }
        // die.off('clicked', dieHandler);
        // die.input.enabled = false;
        // die.setVisible(false);
    },

    gameOver:function(){
          if(state != null && state != 'undefined'){
              if(state == STATES.gameover){
                  this.input.off('gameobjectup');
              }
          }
    },

    loadLevel:function(data,number,context){
          snakes  = data.levels[number-1].snakes;
          ladders = data.levels[number-1].ladders;
          fairies = data.levels[number-1].fairies;
          demons  = data.levels[number-1].demons;
          tasks   = data.levels[number-1].tasks;
          // createSnakes(snakes,context);
          // createLadders(ladders,context);
    },

    addFeaturesToTiles:function(contex){
          for(tile of this.tiles){
              for(snake of snakes){
                  if(snake.start == tile.index){
                      tile.tileFeature = snake;
                      tile.featureType = 'snake';
                      tile.featureBody = contex.add.sprite(tile.x,tile.y ,'cobra');
                      tile.featureBody.setScale(1.1);
      
                  }
                  // if(snake.end == tile.index){
                  //     tile.tileFeature = snake;
                  //     tile.featureType = 'snakeend';
                  //     tile.featureBody = contex.add.image(tile.x,tile.y, 'glow');
                  //     tile.featureBody.setScale(1.1);
                  // }
              }
              for(ladder of ladders){
                  if(ladder.start == tile.index){
                      tile.tileFeature = ladder;
                      tile.featureType = 'ladder';
                  }
              }
              for(fairy of fairies){
                  if(fairy.start == tile.index){
                      tile.tileFeature = fairy;
                      tile.featureType = 'fairy';
                      tile.featureBody = contex.add.sprite(tile.x,tile.y ,'fairy');
                      tile.featureBody.setScale(0.5);
                  }
              }
              for(demon of demons){
                  if(demon.start == tile.index){
                      tile.tileFeature = demon;
                      tile.featureType = 'demon';
                      tile.featureBody = contex.add.sprite(tile.x,tile.y ,'demon');
                      tile.featureBody.setScale(1.3);
                  }
              }
          }
    }


});




/**
 * Update the screen refresh
 * @param {*} time 
 * @param {*} delta 
 */
function mainUpdate(){
    
}

