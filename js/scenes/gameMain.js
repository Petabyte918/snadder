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
        this.load.image('fairy_large','assets/images/fairy-large.png');
        this.load.image('demon_large','assets/images/demon-large.png');
        this.load.image('stone','assets/images/stone.png');

    },

    create: function ()
    {
        this.cameras.main.fadeFrom(2000, Phaser.Math.Between(50, 255), Phaser.Math.Between(50, 255), Phaser.Math.Between(50, 255));
        
        this.bg0 = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'sky').setScale(1.7);
        this.bg1 = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg0').setScale(1.7);
        this.bg2 = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg1').setScale(1.7);
        this.bg3 = this.add.image(980/2, 1742/2, 'gamebg3').setScale(2.06,2.2);
        this.bg4 = this.add.image(window.gameDescriptor.screenWidth/2, 1210, 'bg3').setScale(1);

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
        /** portal */
        this.anims.create({
            key: 'portalRunning',
            frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 7 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'portalIdeal',
            frames: [{key:'portal',frame:6 }],
            frameRate: 8,
            repeat: -1
        });
        /** Adding features to the tiles */
        this.addFeaturesToTile();
        
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
        
        this.snakeCoverBtn = this.add.image(700,1700,'snake_potion').setScale(0.2).setScrollFactor(0).setInteractive().setDataEnabled();
        this.snakeCoverBtn.data.set('assetName','snake_cover');
        this.snakeCoverBtn.on('click',this.blastSnakes,this);
        
        this.demonCoverBtn = this.add.image(800,1700,'demon_potion').setScale(0.2).setScrollFactor(0).setInteractive().setDataEnabled();
        this.demonCoverBtn.data.set('assetName','demon_cover');
        this.demonCoverBtn.on('click',this.blastDemons,this);

        this.heartsBtn = this.add.image(900,1700,'heart').setScale(0.18).setScrollFactor(0).setInteractive().setDataEnabled();
        this.heartsBtn.data.set('assetName','snake_cover');
        // this.heartsBtn.on('click',this.BlastDemons,this);

        this.snakeCover = this.add.dynamicBitmapText(720,1700,'fire',getBoonQtyFromInventory('snake_cover'),40).setScrollFactor(0);
        this.demonCover = this.add.dynamicBitmapText(820,1700,'fire',getBoonQtyFromInventory('demon_cover'),40).setScrollFactor(0);
        this.hearts = this.add.dynamicBitmapText(920,1700,'fire',getBoonQtyFromInventory('hearts'),40).setScrollFactor(0);
        
        
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

       
        
        this.input.on('pointerdown', function (pointer) {
            this.worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
            console.log(pointer.downX,pointer.downY,this.worldPoint,this.cameras.main.scrollX,this.cameras.main.scrollY);
            if(window.gameDescriptor.debug){
                this.graphics =  this.add.graphics();
                this.graphics.fillStyle(0x00ff00, 1);
                this.graphics.fillCircle(this.worldPoint.x, this.worldPoint.y, 4);
                this.add.image(this.worldPoint.x, this.worldPoint.y,'stone').setScale(0.23);
            }

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
            // left: cursors.left,
            // right: cursors.right,
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
        // updating UI 
        this.coins.setText(window.gameDescriptor.coins);
        this.snakeCover.setText(getBoonQtyFromInventory('snake_cover'));
        this.demonCover.setText(getBoonQtyFromInventory('demon_cover'));
        this.hearts.setText(getBoonQtyFromInventory('hearts'));

        if(this.userPin){
            if(this.userPin.y < HEIGHT/2 ){
                this.cameras.main.scrollY = this.userPin.y - HEIGHT/2;
            }
        }
        if(this.counterText){
            this.counterText.setText( Math.floor(this.counter - this.timer.getElapsed()/1000));
        }

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
            var coinEarned = this.add.follower(curve, 508.83813145825104,853.9514456913603+this.cameras.main.scrollY, 'coin_sprite').setOrigin(0.5).setScale(2);
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
            window.gameDescriptor.state = STATES.taskConfirm;
            this.showCorrectAnswer();
        }
        if(window.gameDescriptor.state == STATES.rapidTaskPass){
            window.gameDescriptor.state = STATES.ideal;
            if(window.gameDescriptor.tiles[window.gameDescriptor.playerPos]){
                window.gameDescriptor.tiles[window.gameDescriptor.playerPos].feature.destroy();
                if(window.gameDescriptor.tiles[window.gameDescriptor.playerPos].number){
                    window.gameDescriptor.tiles[window.gameDescriptor.playerPos].number.setOrigin(0.5,1);

                }
            }
            
            
            if(window.gameDescriptor.actionType == 'fairy'){
                this.dice.input.enabled = true;
                this.music.setMute(UNMUTE);
                this.music.play();
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
                var asset = getRandomBoon();
                console.log(asset);
                addBoonToInventory(asset);
                var coinEarned = this.add.follower(curve, 508.83813145825104,853.9514456913603+this.cameras.main.scrollY, asset.img)
                                        .setOrigin(0.5)
                                        .setScale(0.2);
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
            else if(window.gameDescriptor.actionType == 'demon'){
                this.dice.input.enabled = true;
                this.music.setMute(UNMUTE);
                this.music.play();
                console.log("You got saved");
            }
        }
        if(window.gameDescriptor.state == STATES.rapidTaskFail){
            window.gameDescriptor.state = STATES.ideal;
            this.dice.input.enabled = true;
            this.music.setMute(UNMUTE);
            this.music.play();

            window.gameDescriptor.state = STATES.ideal;
            if(window.gameDescriptor.tiles[window.gameDescriptor.playerPos]){
                window.gameDescriptor.tiles[window.gameDescriptor.playerPos].feature.destroy();
                if(window.gameDescriptor.tiles[window.gameDescriptor.playerPos].number){
                    window.gameDescriptor.tiles[window.gameDescriptor.playerPos].number.setOrigin(0.5,1);

                }
            }
            
            
            if(window.gameDescriptor.actionType == 'fairy'){
                console.log('got nothing');
            }else if(window.gameDescriptor.actionType == 'demon'){
                let punishment = getRandomPunishment();
                this.initPunishment(punishment);
            }


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
            window.gameDescriptor.diceNumber = 6;//getRandom(1,6);
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
                context.dice.input.enabled = true;
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
                        this.popupSnakeContainer = this.add.container(WIDTH/2, HEIGHT/2+this.cameras.main.scrollY);
                        
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
                        break;
                case 'portal':
                        this.sound.playAudioSprite('ui_sfx', 'game-over');
                        this.popupPortalContainer = this.add.container(WIDTH/2, HEIGHT/2+this.cameras.main.scrollY);
                        
                        var popup = this.add.image(0,0,'popupBG')
                                        .setScale(0.6,0.8);
                        var popup1 = this.add.image(0,0,'popupBG0')
                                        .setScale(0.6,0.8);
                        var feature = this.add.sprite(0,100,'portal')
                                            .setScale(3)
                                            .setOrigin(0.47,0.9);
                        feature.anims.play('portalRunning',true);
                        var popupClose = this.add.image(350,-350,'btn_close')
                                        .setScale(0.5)
                                        .setInteractive()
                                        .on('click',this.popupPortalClose,this);
                        var popupOk = this.add.image(0,200,'btn_ok')
                                        .setScale(0.5)
                                        .setInteractive()
                                        .on('click',this.popupPortalOk,this);

                    
                        this.popupPortalContainer.add(popup);
                        this.popupPortalContainer.add(popup1);
                        this.popupPortalContainer.add(feature);
                        this.popupPortalContainer.add(popupClose);
                        this.popupPortalContainer.add(popupOk);

                        // this.tween = game.add.tween(this.popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
                        this.tweens.add({
                            targets     : [ this.popupPortalContainer ],
                            scaleX: 1.2,
                            scaleY: 1.2,
                            ease        : 'Elastic',
                            duration    : 3000,
                            yoyo        : false,
                            repeat      : 0,
                            callbackScope   : this
                        });
                        break;
                case 'fairy':
                    window.gameDescriptor.state = STATES.rapidTask;
                    window.gameDescriptor.actionType = 'fairy';
                    this.sound.playAudioSprite('ui_sfx', 'spell');
                    this.popupFairyContainer = this.add.container(WIDTH/2, HEIGHT/2+this.cameras.main.scrollY);
                    
                    var popup = this.add.image(0,0,'popupBG')
                                    .setScale(0.6,0.8);
                    var popup1 = this.add.image(0,0,'popupBG0')
                                    .setScale(0.6,0.8);
                    var feature = this.add.image(0,100,'fairy_large')
                                    .setScale(0.6)
                                    .setOrigin(0.5,1);
                    var popupClose = this.add.image(350,-350,'btn_close')
                                    .setScale(0.5)
                                    .setInteractive()
                                    .on('click',this.popupFairyClose,this);
                    var popupOk = this.add.image(0,200,'btn_ok')
                                    .setScale(0.5)
                                    .setInteractive()
                                    .on('click',this.popupFairyOk,this);

                    
                    this.popupFairyContainer.add(popup);
                    this.popupFairyContainer.add(popup1);
                    this.popupFairyContainer.add(feature);
                    this.popupFairyContainer.add(popupClose);
                    this.popupFairyContainer.add(popupOk);

                    this.tweens.add({
                        targets     : [ this.popupFairyContainer ],
                        scaleX: 1.2,
                        scaleY: 1.2,
                        ease        : 'Elastic',
                        duration    : 3000,
                        yoyo        : false,
                        repeat      : 0,
                        callbackScope   : this
                      });


                        break;
                case 'demon':
                        window.gameDescriptor.state = STATES.rapidTask;
                        window.gameDescriptor.actionType = 'demon';

                        this.sound.playAudioSprite('ui_sfx', 'game-over');
                        this.popupDemonContainer = this.add.container(WIDTH/2, HEIGHT/2+this.cameras.main.scrollY);
                    
                        var popup = this.add.image(0,0,'popupBG')
                                        .setScale(0.6,0.8);
                        var popup1 = this.add.image(0,0,'popupBG0')
                                        .setScale(0.6,0.8);
                        var feature = this.add.image(0,100,'demon_large')
                                        .setScale(0.6)
                                        .setOrigin(0.5,1);
                        var popupClose = this.add.image(350,-350,'btn_close')
                                        .setScale(0.5)
                                        .setInteractive()
                                        .on('click',this.popupDemonClose,this);
                        var popupOk = this.add.image(0,200,'btn_ok')
                                        .setScale(0.5)
                                        .setInteractive()
                                        .on('click',this.popupDemonOk,this);

                        
                        this.popupDemonContainer.add(popup);
                        this.popupDemonContainer.add(popup1);
                        this.popupDemonContainer.add(feature);
                        this.popupDemonContainer.add(popupClose);
                        this.popupDemonContainer.add(popupOk);

                        this.tweens.add({
                            targets     : [ this.popupDemonContainer ],
                            scaleX: 1.2,
                            scaleY: 1.2,
                            ease        : 'Elastic',
                            duration    : 3000,
                            yoyo        : false,
                            repeat      : 0,
                            callbackScope   : this
                        });

                        break;

                case 'task':
                    window.gameDescriptor.actionType = 'task';
                    if(window.gameDescriptor.state == STATES.task){
                        this.music.setMute(MUTE);
                        if(this.scene.get('Task')){
                            this.scene.get('Task').refresh();
                            this.scene.setVisible(true,'Task');
                        }else{
                                // let task = this.scene.get('Task');
                                let task = this.scene.add('Task',Task,true,{x:100,y:100});

                                this.tweens.add({
                                    targets     : [ task ],
                                    scaleX: 1.2,
                                    scaleY: 1.2,
                                    ease        : 'Elastic',
                                    duration    : 3000,
                                    yoyo        : false,
                                    repeat      : 0,
                                    callbackScope   : this
                                });
                            
                            // this.scene.add('Task',Task,true,{x:100,y:100});
                        }
                    }
            }
        }

        
        
    },
    popupSnakeClose:function(){
        console.log('cobra popup closed');
        this.popupSnakeContainer.destroy();
        window.gameDescriptor.playerPos -= getRandom(1,6);
        window.gameDescriptor.playerDirection = -1;
        this.movePlayer();
    },
    popupSnakeOk:function(){
        console.log('cobra popup closed');
        this.popupSnakeContainer.destroy();
        window.gameDescriptor.playerPos -= getRandom(1,6);
        window.gameDescriptor.playerDirection = -1;
        this.movePlayer();
    },
    popupPortalClose:function(){
        console.log('portal popup closed');
        this.popupPortalContainer.destroy();
        window.gameDescriptor.playerPos += getRandom(1,6);
        window.gameDescriptor.playerDirection = 1;
        this.movePlayer();
    },
    popupPortalOk:function(){
        console.log('portal popup closed');
        this.popupPortalContainer.destroy();
        window.gameDescriptor.playerPos += getRandom(1,6);
        window.gameDescriptor.playerDirection = 1;
        this.movePlayer();
    },
    popupFairyClose:function(){
        console.log('fairy popup closed');
        this.popupFairyContainer.destroy();
        window.gameDescriptor.state = STATES.ideal;
        this.dice.input.enabled = true;

    },
    popupFairyOk:function(){
        console.log('fairy popup closed');
        this.popupFairyContainer.destroy();
        // window.gameDescriptor.state = STATES.ideal;
        // this.dice.input.enabled = true;
        if(window.gameDescriptor.state == STATES.rapidTask){
            this.music.setMute(MUTE);
            if(this.scene.get('RapidTask')){
                this.scene.get('RapidTask').refresh();
                this.scene.setVisible(true,'RapidTask');
            }else{
                    // let rapidTask = 
                    this.scene.add('RapidTask',RapidTask,true,{x:100,y:100});

                    // this.tweens.add({
                    //     targets     : [ rapidTask ],
                    //     scaleX: 1.2,
                    //     scaleY: 1.2,
                    //     ease        : 'Elastic',
                    //     duration    : 3000,
                    //     yoyo        : false,
                    //     repeat      : 0,
                    //     callbackScope   : this
                    // });
                
            }
        }
    },
    popupDemonClose:function(){
        console.log('demon popup closed');
        window.gameDescriptor.state = STATES.ideal;
        this.dice.input.enabled = true;
        this.popupDemonContainer.destroy();
    },
    popupDemonOk:function(){
        console.log('demon popup closed');
        // window.gameDescriptor.state = STATES.ideal;
        // this.dice.input.enabled = true;
        this.popupDemonContainer.destroy();

        if(window.gameDescriptor.state == STATES.rapidTask){
            this.music.setMute(MUTE);
            if(this.scene.get('RapidTask')){
                this.scene.get('RapidTask').refresh();
                this.scene.setVisible(true,'RapidTask');
            }else{
                    let rapidTask = this.scene.add('RapidTask',RapidTask,true,{x:100,y:100});

                    this.tweens.add({
                        targets     : [ rapidTask ],
                        scaleX: 1.2,
                        scaleY: 1.2,
                        ease        : 'Elastic',
                        duration    : 3000,
                        yoyo        : false,
                        repeat      : 0,
                        callbackScope   : this
                    });
                
            }
        }
    },
    popupAnswerClose:function(){
        this.popupAnswerContainer.destroy();
        window.gameDescriptor.state = STATES.ideal;
        this.dice.input.enabled = true;
        this.music.setMute(UNMUTE);
    },
    popupAnswerOk:function(){
        this.popupAnswerContainer.destroy();
        window.gameDescriptor.state = STATES.ideal;
        this.dice.input.enabled = true;
        this.music.setMute(UNMUTE);
    },
    showCorrectAnswer:function(){
        var qid = window.gameDescriptor.questionAnswered[window.gameDescriptor.questionAnswered.length-1];
        var data = getQuestionAnswerData(qid);

        this.popupAnswerContainer = this.add.container(960/2, 1780/2+this.cameras.main.scrollY);
                    
        var popup = this.add.image(0,0,'popupBG')
                        .setScale(0.6,0.8);
        var popup1 = this.add.image(0,0,'popupBG0')
                        .setScale(0.6,0.8);
        // var feature = this.add.image(0,100,'fairy_large')
        //                 .setScale(0.6)
        //                 .setOrigin(0.5,1);
        var feature = null;
        var popupClose = this.add.image(350,-350,'btn_close1')
                        .setScale(0.7)
                        .setInteractive()
                        .on('click',this.popupAnswerClose,this);
        var popupOk = this.add.image(0,200,'btn_ok')
                        .setScale(0.5)
                        .setInteractive()
                        .on('click',this.popupAnswerOk,this);
        
                        
        // this.load.onLoadStart.add(loadStart, this);
        // game.load.onFileComplete.add(fileComplete, this);
        // game.load.onLoadComplete.add(loadComplete, this);
        
        if(data.img != ''){
            game.load.image('picture1', 'assets/images/answers_images/'+data.img);
            feature = this.add.image(0,100,'picture1').setOrigin(0.5,1);
        }   
        else if(data.video != ''){
            // var video = document.createElement('video');

            // video.playsinline = true;
            // video.src = 'assets/videos/answer_videos/' + data.video;
            // video.width = 800;
            // video.height = 450;
            // video.autoplay = true;

            // var element = this.add.dom(400, 300, video);

            // video.addEventListener('ended', (event) => {

            //     element.setVisible(false);

            //     this.add.image(400, 300, 'logo');

            // });
        }
        else{
            feature = this.make.text({
                x: 0,
                y: -80,
                text: data.description,
                origin: { x: 0.5, y: 0.5 },
                style: {
                    font: 'bold 45px Arial',
                    fill: 'green',
                    wordWrap: { width: 500 }
                }
            });
        }

        this.popupAnswerContainer.add(popup);
        this.popupAnswerContainer.add(popup1);
        this.popupAnswerContainer.add(feature);
        this.popupAnswerContainer.add(popupClose);
        this.popupAnswerContainer.add(popupOk);

        this.tweens.add({
            targets     : [ this.popupAnswerContainer ],
            scaleX: 1.2,
            scaleY: 1.2,
            ease        : 'Elastic',
            duration    : 3000,
            yoyo        : false,
            repeat      : 0,
            callbackScope   : this
        });

    },
    loadStart:function() {
        text.setText("Loading ...");
    },
    fileComplete:function(progress, cacheKey, success, totalLoaded, totalFiles) {

        text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
    
        var newImage = game.add.image(x, y, cacheKey);
    
        newImage.scale.set(0.3);
    
        x += newImage.width + 20;
    
        if (x > 700)
        {
            x = 32;
            y += 332;
        }
    
    },
    loadComplete:function() {
        text.setText("Load Complete");
    },
    updateCoins:function(){
        this.coins.setText(''+window.gameDescriptor.coins);
    },
    blastSnakes:function(){

    },
    blastDemons:function(){

    },
    initPunishment:function(punishment){
        console.log(punishment);
        switch(punishment.name){
            case 'snake_wave':
                this.timer = this.time.addEvent({ delay: punishment.waveDuration*1000, callback: this.punishmentTimeout, callbackScope: this });
                this.counterText = this.add.dynamicBitmapText(WIDTH/2-50,20,'fire','',120);
                this.counter = punishment.waveDuration;
                this.counterText.setVisible(true);
                for(let i=1;i< window.gameDescriptor.tiles.length;i++){
                    let tile = window.gameDescriptor.tiles[i];
                    if(i%5 == 0){
                        if(tile.feature != null && i > window.gameDescriptor.playerPos)
                        {
                            tile.feature.destroy();
                            tile.feature = this.add.sprite(tile.x,tile.y,'cobra');
                            tile.feature.setScale(2);
                            tile.feature.setOrigin(0.5,1);
                            tile.feature.anims.play('cobraHover',true);
                            tile['oldType'] = tile.featureType;
                            tile.featureType = 'cobra';

                        }
                        
                    }
                }
                break;

            case 'demon_wave':
                this.timer = this.time.addEvent({ delay: punishment.waveDuration*1000, callback: this.punishmentTimeout, callbackScope: this });
                this.counterText = this.add.dynamicBitmapText(WIDTH/2-50,20,'fire','',120);
                this.counter = punishment.waveDuration;
                this.counterText.setVisible(true);
                for(let i=1;i< window.gameDescriptor.tiles.length;i++){
                    let tile = window.gameDescriptor.tiles[i];
                    if(i%5 == 0){
                        if(tile.feature != null && i > window.gameDescriptor.playerPos)
                        {
                            tile.feature.destroy();
                            tile.feature = this.add.sprite(tile.x,tile.y,'demon');
                            tile.feature.setScale(2);
                            tile.feature.setOrigin(0.5,1);
                            tile.feature.anims.play('demonHover',true);
                            tile['oldType'] = tile.featureType;
                            tile.featureType = 'demon';
                        }
                        
                    }
                }
                break;
        }
    },
    punishmentTimeout:function(){
        this.counterText.setVisible(false);
        for(let i=1;i< window.gameDescriptor.tiles.length;i++){
            let tile = window.gameDescriptor.tiles[i];
            if(tile.feature != null && i > window.gameDescriptor.playerPos)
            {
                if(tile.oldType){
                    switch(tile.oldType){
                        case 'cobra':
                            tile.feature.destroy();
                            tile.feature = this.add.sprite(tile.x,tile.y,'cobra');
                            tile.feature.setScale(2);
                            tile.feature.setOrigin(0.5,1);
                            tile.feature.anims.play('cobraHover',true);
                            tile.featureType = tile.oldType;
                            tile.oldType = null;
                            break;
                        case 'task':
                            tile.feature.destroy();
                            tile.feature = this.add.sprite(tile.x+5,tile.y,'coin_sprite');
                            tile.feature.anims.play('coin_rotate',true);
                            tile.feature.setOrigin(0.5,1.3);
                            tile.featureType = tile.oldType;
                            tile.oldType = null;
                            break;
                        case 'demon':
                            tile.feature.destroy();
                            tile.feature = this.add.sprite(tile.x,tile.y,'demon');
                            tile.feature.setScale(2.4);
                            tile.feature.setOrigin(0.5,1);
                            tile.feature.anims.play('demonHover',true);
                            tile.featureType = tile.oldType;
                            tile.oldType = null;
                            break;
                        case 'fairy':
                            tile.feature.destroy();
                            tile.feature = this.add.sprite(tile.x,tile.y,'fairy');
                            tile.feature.setScale(1.3);
                            tile.feature.setOrigin(0.5,1.3);
                            tile.feature.anims.play('fairyHover',true);
                            tile.featureType = tile.oldType;
                            tile.oldType = null;
                            break;
                        case 'portal':
                            tile.feature.destroy();
                            tile.feature = this.add.sprite(tile.x,tile.y,'portal');
                            tile.feature.setScale(1.8);
                            tile.feature.setOrigin(0.47,0.9);
                            tile.feature.anims.play('portalRunning',true);
                            tile.featureType = tile.oldType;
                            tile.oldType = null;
                            break;

                    }
                }
                
                

            }
                
        }
    },
    addFeaturesToTile:function(){
        let i=0;
        for(let tile of window.gameDescriptor.tiles){
            tile['texture'] = this.add.image(tile.x,tile.y,'stone').setScale(0.23);
        }
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
                if(tile.featureType == 'portal'){
                    tile.feature = this.add.sprite(tile.x,tile.y,'portal');
                    tile.feature.setScale(1.8);
                    tile.feature.setOrigin(0.47,0.9);
                    tile.feature.anims.play('portalRunning',true);
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




