var GameMain = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'GameMain',
    userPin:null,
    initialize:

    function GameMain ()
    {
        Phaser.Scene.call(this, { key: 'GameMain', active: false });
    },

    preload: function ()
    {
        this.load.image('snake_large','assets/images/snake-large.png');

    },

    create: function ()
    {

        this.bg0 = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'sky').setScale(1.7);
        this.bg1 = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg0').setScale(1.7);
        this.bg2 = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg1').setScale(1.7);
        this.bg3 = this.add.image(980/2, 1742/2, 'gamebg3').setScale(2.06,2.2);
        this.bg4 = this.add.image(window.gameDescriptor.screenWidth/2, 1210, 'bg3').setScale(1);

        
        // this.add.image(500,100,'wood_up').setScale(0.65,1);
        this.shop_close = this.add.image(900,80,'btn_pause').setScale(0.4).setScrollFactor(0);
        this.menu = this.add.image(80,80,'btn_menu').setScale(0.4);
        this.menu.setInteractive();
        this.menu.on('click',this.gotoMenu,this);
        this.menu.setScrollFactor(0);

        this.add.image(500,1680,'wood_down').setScale(0.65).setScrollFactor(0);
        
        this.add.image(170,1700,'wood_table').setScale(1,0.8).setScrollFactor(0);
        this.add.image(100,1700,'coins').setScale(0.15).setScrollFactor(0);
        this.coins = this.add.dynamicBitmapText(150,1677,'fire',window.gameDescriptor.coins,35).setScrollFactor(0);


        this.add.image(700,1700,'wood_btn').setScale(0.6).setScrollFactor(0);
        this.add.image(800,1700,'wood_btn').setScale(0.6).setScrollFactor(0);
        this.add.image(900,1700,'wood_btn').setScale(0.6).setScrollFactor(0);
        this.add.image(700,1700,'love_potion').setScale(0.2).setScrollFactor(0);
        this.add.image(800,1700,'cup').setScale(0.2).setScrollFactor(0);
        this.add.image(900,1700,'hammer').setScale(0.2).setScrollFactor(0);

        
        
        this.userPinFake = this.add.image(
            window.gameDescriptor.tiles[window.gameDescriptor.playerPos].x,
            window.gameDescriptor.tiles[window.gameDescriptor.playerPos].y,
            'user_pin'
        ).setScale(0.9).setOrigin(0.5,1);
        
        this.add.image(900,1500,'icon_back3').setScale(1).setScrollFactor(0);
        this.dice = this.add.sprite(900,1505,'dice').setScale(2);
        this.dice.setInteractive();
        this.dice.on('click',this.rollDice,this);
        this.dice.setScrollFactor(0);
        // this.dice.data.set('objectType','dice');

       
        /** dice */
        this.anims.create({
            key: 'diceRoll',
            frames: this.anims.generateFrameNumbers('dice', { start: 0, end:29 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'diceStop6',
            frames: [{key:'dice',frame:0 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'diceStop5',
            frames: [{key:'dice',frame:5 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'diceStop4',
            frames: [{key:'dice',frame:10 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'diceStop3',
            frames: [{key:'dice',frame:15 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'diceStop2',
            frames: [{key:'dice',frame:20 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'diceStop1',
            frames: [{key:'dice',frame:25 }],
            frameRate: 10,
            repeat: -1
        });
         /** fairies */
         this.anims.create({
            key: 'fairyHover',
            frames: this.anims.generateFrameNumbers('fairy', { start: 3, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        /** cobras */
        this.anims.create({
            key: 'cobraHover',
            frames: this.anims.generateFrameNumbers('cobra', { start: 12, end: 35 }),
            frameRate: 8,
            repeat: -1
        });
        /** demons */
        this.anims.create({
            key: 'demonHover',
            frames: this.anims.generateFrameNumbers('demon', { start: 0, end: 11 }),
            frameRate: 8,
            repeat: -1
        });
        /** Coins */
        this.anims.create({
            key: 'coin_rotate',
            frames: this.anims.generateFrameNumbers('coin_sprite', { start: 0, end: 8 }),
            frameRate: 8,
            repeat: -1
        });

        this.input.on('pointerdown', function (pointer) {
            console.log(pointer.downX,pointer.downY);
        }, this);

        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('click', gameObject);
        }, this);
        this.input.on('gameobjectdown', function (pointer, gameObject)
        {
            this.sound.playAudioSprite('ui_button', 'button4');
        }, this);
        this.input.on('gameobjectover', function (pointer, gameObject)
        {
            gameObject.setTint('0x56f787');
        });
        this.input.on('gameobjectout', function (pointer, gameObject)
        {
            gameObject.setTint('0xffffff');
        });
        
        
        //   lemming.pauseFollow();
        //   lemming.resumeFollow();
        /** Adding features to the tiles */
        this.addFeaturesToTile();

        this.music = this.sound.add('music0', {
            mute: false,
            volume: 0.3,
            rate: 0.8,
            detune: -900,
            seek: 0,
            loop: true,
            delay: 0
        });
        this.music.play();
        // music.on('ended', function (sound) {
        //     setTimeout(function () {
        //         this.sys.game.destroy(true);
        //         document.addEventListener('mousedown', function newGame () {
        //             game = new Phaser.Game(config);
        //             document.removeEventListener('mousedown', newGame);
        //         });
        //     }.bind(this));
        // }, this);


        var cursors = this.input.keyboard.createCursorKeys();
        var controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            acceleration: 0.06,
            drag: 0.0005,
            maxSpeed: 1.0
        };
    
        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    
        

    },
    update:function(time,delta){
        
        this.controls.update(delta);
        // console.log(this.cameras.main._x)
        
        this.coins.setText(window.gameDescriptor.coins);
        if(window.gameDescriptor.state == STATES.taskPass){
            window.gameDescriptor.state = STATES.ideal;
            if(window.gameDescriptor.tiles[window.gameDescriptor.playerPos]){
                window.gameDescriptor.tiles[window.gameDescriptor.playerPos].feature.destroy();
                if(window.gameDescriptor.tiles[window.gameDescriptor.playerPos].number){
                    window.gameDescriptor.tiles[window.gameDescriptor.playerPos].number.setOrigin(0.5,1);

                }
            }
            this.dice.input.enabled = true;
            this.music.setMute(UNMUTE);
            this.sound.playAudioSprite('ui_sfx', 'coins-gain');
            
            var points = [
                new Phaser.Math.Vector2(508.83813145825104, 853.9514456913603),
                new Phaser.Math.Vector2(479.0827210239393, 958.0918658976237),
                new Phaser.Math.Vector2(440.40068745933405, 1050.3305237946),
                new Phaser.Math.Vector2(380.88986659071054, 1130.667419382289),
                new Phaser.Math.Vector2(276.74593007061947, 1211.004314969978),
                new Phaser.Math.Vector2(175.5775345939596, 1264.5622453617705),
                new Phaser.Math.Vector2(89.28684433445555, 1374.6535467226774),
                new Phaser.Math.Vector2(44.65372868298795, 1520.4501350114465),
                new Phaser.Math.Vector2(92.26238537788673, 1657.3204015682497),
                new Phaser.Math.Vector2(116.06671372533611, 1707.9028913827206),
            ];
            var curve = new Phaser.Curves.Spline(points);
            var coinEarned = this.add.follower(curve, 508.83813145825104,853.9514456913603, 'coin_sprite').setOrigin(0.5).setScale(2);
            // this.add.sprite(window.gameDescriptor.screenWidth/2,window.gameDescriptor.screenHeight/2,'coin_sprite');
            coinEarned.anims.play('coin_rotate',true);
            coinEarned.startFollow({
                duration: 1000,
                yoyo: false,
                repeat: 0,
                rotateToPath: false,
                verticalAdjust: true
            });
            setTimeout((object)=>{
                object.setVisible(false);
            },1100,coinEarned);

        }
        if(window.gameDescriptor.state == STATES.taskFail){
            window.gameDescriptor.state = STATES.ideal;
            this.dice.input.enabled = true;
            this.music.setMute(UNMUTE);

        }

    },
    gotoMenu:function(){
        if(window.gameDescriptor.state == STATES.ideal){
            this.music.setMute(MUTE);
            this.scene.start('Dashboard');
        }
    },
    rollDice:function(){
        
        if(window.gameDescriptor.state == STATES.ideal){
            window.gameDescriptor.state = STATES.rolling;
            this.dice.anims.play('diceRoll',true);
            // this.dice.data.set('anim',true);
            window.gameDescriptor.diceNumber = 7;//getRandom(1,6);
            this.dice.input.enabled = false;
            // dragon.on("animationcomplete", () => {
            //     dragon.anims.play('dragon-fly');
            // });
            this.dice.once("animationrepeat", () => {
                this.dice.anims.play('diceStop'+window.gameDescriptor.diceNumber);
                window.gameDescriptor.state = STATES.moving;
                window.gameDescriptor.playerPos += window.gameDescriptor.diceNumber;
                console.log(window.gameDescriptor.diceNumber);
                window.gameDescriptor.playerDirection = 1;
                this.movePlayer();
            });
            
        }
    },
    movePlayer:function(){

        var points = [];
        var tiles = window.gameDescriptor.tiles;
        var dir = window.gameDescriptor.playerDirection;
        
        if(dir == 1){
            for(let i = window.gameDescriptor.playerLastPos;i<=window.gameDescriptor.playerPos;i++){
            points.push(new Phaser.Math.Vector2(tiles[i].x,tiles[i].y));
            }
        }else{
            for(let i = window.gameDescriptor.playerLastPos;i>= window.gameDescriptor.playerPos;i--){
                points.push(new Phaser.Math.Vector2(tiles[i].x,tiles[i].y));
            }
        }
        
        this.curve = new Phaser.Curves.Spline(points);

        if(window.gameDescriptor.debug){
            this.graphics =  this.add.graphics();
            this.graphics.lineStyle(1, 0xffffff, 1);
            this.curve.draw(this.graphics, 64);
    
            this.graphics.fillStyle(0x00ff00, 1);
            for (var i = 0; i < points.length; i++)
            {
                this.graphics.fillCircle(points[i].x, points[i].y, 4);
            }
        }

        if(this.userPin){
            this.userPin.setPath(this.curve);
        }
        else{
            this.userPin = this.add.follower(this.curve, tiles[window.gameDescriptor.playerLastPos].x, tiles[window.gameDescriptor.playerLastPos].y, 'user_pin').setOrigin(0.5,1);
        }
        this.userPinFake.setVisible(false);
        this.userPin.startFollow({
            duration: 3000,
            yoyo: false,
            repeat: 0,
            rotateToPath: false,
            verticalAdjust: true
        });
        window.gameDescriptor.playerLastPos = window.gameDescriptor.playerPos;
        setTimeout(function(context){
            if(window.gameDescriptor.playerDirection == 1){
                window.gameDescriptor.state = STATES.task;
                context.startTask();
            }
            else{
                window.gameDescriptor.state = STATES.ideal;
            }

        }, 3200,this);
        
    },
    startTask:function(){
        if(window.gameDescriptor.tiles[window.gameDescriptor.playerPos]){
            let tileType = window.gameDescriptor.tiles[window.gameDescriptor.playerPos].featureType;
            console.log(tileType);
            switch(tileType){
                case 'cobra':
                        this.sound.playAudioSprite('ui_sfx', 'game-over');
                        this.popupSnakeContainer = this.add.container(960/2, 1780/2);
                        
                        var popup = this.add.image(0,0,'popupBG')
                                        .setScale(0.6,0.8);
                        var popup1 = this.add.image(0,0,'popupBG0')
                                        .setScale(0.6,0.8);
                        var feature = this.add.image(0,100,'snake_large')
                                        .setScale(0.6)
                                        .setOrigin(0.5,1);
                        var popupClose = this.add.image(350,-350,'btn_close')
                                        .setScale(0.5)
                                        .setInteractive()
                                        .on('click',this.popupSnakeClose,this);
                        var popupOk = this.add.image(0,200,'btn_ok')
                                        .setScale(0.5)
                                        .setInteractive()
                                        .on('click',this.popupSnakeOk,this);

                        
                        this.popupSnakeContainer.add(popup);
                        this.popupSnakeContainer.add(popup1);
                        this.popupSnakeContainer.add(feature);
                        this.popupSnakeContainer.add(popupClose);
                        this.popupSnakeContainer.add(popupOk);

                        // this.tween = game.add.tween(this.popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
                        this.tweens.add({
                            targets     : [ this.popupSnakeContainer ],
                            scaleX: 1.2,
                            scaleY: 1.2,
                            ease        : 'Elastic',
                            duration    : 3000,
                            yoyo        : false,
                            repeat      : 0,
                            callbackScope   : this
                          });
    

                        // if(window.gameDescriptor.state == STATES.task){
                        //     this.music.setMute(MUTE);
                        //     if(this.scene.get('TileFeature')){
                        //         this.scene.get('TileFeature').refresh();
                        //         this.scene.setVisible(true,'TileFeature');
                        //     }else{
                        //         this.scene.add('TileFeature',TileFeature,true,{x:100,y:100});
                        //     }
                        // }
                        break;
                case 'fairy':
                        this.sound.playAudioSprite('ui_sfx', 'game-over');
                        this.loadPunishment('fairy');
                        break;
                case 'demon':
                        this.sound.playAudioSprite('ui_sfx', 'game-over');
                        this.loadPunishment('demon');
                        break;

                default:

                    if(window.gameDescriptor.state == STATES.task){
                        this.music.setMute(MUTE);
                        // tween = game.add.tween(popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
                        // if (tween && tween.isRunning || popup.scale.x === 0.1)
                        // {
                        //     return;
                        // }

                        //  Create a tween that will close the window, but only if it's not already tweening or closed
                        // tween = game.add.tween(popup.scale).to( { x: 0.1, y: 0.1 }, 500, Phaser.Easing.Elastic.In, true);
                        if(this.scene.get('Task')){
                            this.scene.get('Task').refresh();
                            this.scene.setVisible(true,'Task');
                        }else{
                            if(this.scene.get('Task')){
                                let task = this.scene.get('Task');
                                this.add.tween(task.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
                            }
                            // this.scene.add('Task',Task,true,{x:100,y:100});
                        }
                    }
            }
        }

        
        
    },
    popupSnakeClose:function(){
        this.popupSnakeContainer.destroy();
    },
    popupSnakeOk:function(){
        this.popupSnakeContainer.destroy();
        window.gameDescriptor.playerPos -= getRandom(1,6);
        window.gameDescriptor.playerDirection = -1;
        this.movePlayer();
    },
    updateCoins:function(){
        this.coins.setText(''+window.gameDescriptor.coins);
    },
    addFeaturesToTile:function(){
        let i=0;
        for(let tile of window.gameDescriptor.tiles){
            if(tile.tileType == 1){
                if(tile.featureType == 'fairy'){
                    tile.feature = this.add.sprite(tile.x,tile.y,'fairy');
                    tile.feature.setScale(1.3);
                    tile.feature.setOrigin(0.5,1.3);
                    tile.feature.anims.play('fairyHover',true);
                }
                if(tile.featureType == 'demon'){
                    tile.feature = this.add.sprite(tile.x,tile.y,'demon');
                    tile.feature.setScale(2.4);
                    tile.feature.setOrigin(0.5,1);
                    tile.feature.anims.play('demonHover',true);
                }
                if(tile.featureType == 'cobra'){
                    tile.feature = this.add.sprite(tile.x,tile.y,'cobra');
                    tile.feature.setScale(2);
                    tile.feature.setOrigin(0.5,1);
                    tile.feature.anims.play('cobraHover',true);
                }
            }
            else{
                if(i >0){
                    tile.feature = this.add.sprite(tile.x+5,tile.y,'coin_sprite');
                    tile.feature.anims.play('coin_rotate',true);
                    tile.feature.setOrigin(0.5,1.3);
                    tile['number'] = this.add.dynamicBitmapText(tile.x,tile.y,'fire',i,35)
                        .setOrigin(0.5,2.2)
                        .setTint('0xd0733144');

                }
                
            }

            i++;
        }
    }


});




