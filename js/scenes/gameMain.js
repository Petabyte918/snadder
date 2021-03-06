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
        this.load.html('message', 'assets/forms/message.html');
        this.load.image('love1','assets/images/love1.png');


    },

    create: function ()
    {

        var smileys = [ '😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😋','😎','😍','😘','😗','😙','😚','️🙂','🤗','🤩','🤔','🤨','😐','😑','😶','🙄','😏','😣','😥','😮','🤐','😯','😪','😫','😴','😌','😛','😜','😝','🤤','😒','😓','😔','😕','🙃','🤑','😲','☹️','🙁','😖','😞','😟','😤','😢','😭','😦','😧','😨','😩','🤯','😬','😰','😱','😳','🤪','😵','😡','😠','🤬','😷','🤒','🤕','🤢','🤮','🤧','😇','🤠','🤡','🤥','🤫','🤭','🧐','🤓','😈','👿','👹','👺','💀','👻','👽','🤖','💩','😺','😸','😹','😻','😼','😽','🙀','😿','😾' ];

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
            frames: this.anims.generateFrameNumbers('cobra', { start: 0, end: 11 }),
            frameRate: 8,
            repeat: -1
        });
        /** cobras red */
        this.anims.create({
            key: 'cobraRedHover',
            frames: this.anims.generateFrameNumbers('cobraRed', { start: 0, end: 11 }),
            frameRate: 8,
            repeat: -1
        });
        /** demons */
        // this.anims.create({
        //     key: 'demonHover',
        //     frames: this.anims.generateFrameNumbers('demon', { start: 0, end: 11 }),
        //     frameRate: 8,
        //     repeat: -1
        // });
        this.anims.create({
            key: 'demonHover',
            frames: [
                { key: 'demon0' },
                { key: 'demon1' },
                { key: 'demon2' },
                { key: 'demon3' },
                { key: 'demon4' },
                { key: 'demon5' },
                { key: 'demon6' },
                { key: 'demon7' },
                { key: 'demon8' },
                { key: 'demon9' },
                { key: 'demon10' },
                { key: 'demon11' },
                { key: 'demon12' },
                { key: 'demon13' },
                { key: 'demon14' },
                { key: 'demon15' },
                { key: 'demon16' },
                { key: 'demon17' },
                { key: 'demon18' },
                { key: 'demon19' },
            ],
            frameRate: 8,
            repeat: -1
        });
        /** Coins */
        this.anims.create({
            key: 'coin_rotate',
            frames: this.anims.generateFrameNumbers('coin_sprite', { start: 0, end: 7 }),
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
        /** avators*/
        this.anims.create({
            key: 'male',
            frames: [{key:'avators',frame:0 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'female',
            frames: [{key:'avators',frame:7 }],
            frameRate: 10,
            repeat: -1
        });

        /** Adding background assets */
        this.addAssetsToLevel();
        /** Adding features to the tiles */
        this.addFeaturesToTile();
        
        // this.add.image(500,100,'wood_up').setScale(0.65,1);
        this.pause = this.add.image(900,80,'btn_pause').setScale(0.4).setScrollFactor(0);
        this.pause.setInteractive();
        this.pause.on('click',this.pauseGame,this);

        this.menu = this.add.image(80,80,'btn_menu').setScale(0.4);
        this.menu.setInteractive();
        this.menu.on('click',this.gotoMenu,this);
        this.menu.setScrollFactor(0);

        this.add.image(500,1680,'wood_down1').setScale(0.65).setScrollFactor(0);
        
        this.add.image(170,1700,'wood_table').setScale(1,0.8).setScrollFactor(0);
        this.add.image(100,1700,'coins').setScale(0.15).setScrollFactor(0);
        this.coins = this.add.dynamicBitmapText(150,1677,'fire',window.gameDescriptor.coins,35).setScrollFactor(0);


        this.add.image(600,1700,'wood_btn').setScale(0.6).setScrollFactor(0);
        this.add.image(700,1700,'wood_btn').setScale(0.6).setScrollFactor(0);
        this.add.image(800,1700,'wood_btn').setScale(0.6).setScrollFactor(0);
        this.add.image(900,1700,'wood_btn').setScale(0.6).setScrollFactor(0);
        
        this.heartBtn = this.add.image(600,1700,'heart').setScale(0.18).setScrollFactor(0).setInteractive().setDataEnabled();
        this.heartBtn.data.set('assetName','heart');
        this.heartBtn.data.set('hint','These are your herts');
        // this.heartBtn.on('over',this.showHint,this);
        // this.snakeCoverBtn.on('click',this.blastSnakes,this);
        
        this.snakeCoverBtn = this.add.image(700,1700,'snake_potion').setScale(0.2).setScrollFactor(0).setInteractive().setDataEnabled();
        this.snakeCoverBtn.data.set('assetName','snake_cover');
        this.snakeCoverBtn.data.set('hint','protects you from snakes');
        // this.snakeCoverBtn.on('over',this.showHint,this);
        this.snakeCoverBtn.on('click',this.blastSnakes,this);
        
        this.demonCoverBtn = this.add.image(800,1700,'demon_potion').setScale(0.2).setScrollFactor(0).setInteractive().setDataEnabled();
        this.demonCoverBtn.data.set('assetName','demon_cover');
        this.demonCoverBtn.data.set('hint','protects you from demons');
        // this.demonCoverBtn.on('over',this.showHint,this);
        this.demonCoverBtn.on('click',this.blastDemons,this);

        this.freezeCoverBtn = this.add.image(900,1700,'hammer').setScale(0.2).setScrollFactor(0).setInteractive().setDataEnabled();
        this.freezeCoverBtn.data.set('assetName','snake_cover');
        this.freezeCoverBtn.data.set('hint','Breaks the ice');
        // this.freezeCoverBtn.on('over',this.showHint,this);
        this.freezeCoverBtn.on('click',this.breakIce,this);

        this.hearts = this.add.dynamicBitmapText(620,1700,'fire',window.gameDescriptor.hearts,40).setScrollFactor(0);
        this.snakeCover = this.add.dynamicBitmapText(720,1700,'fire',getBoonQtyFromInventory('snake_cover'),40).setScrollFactor(0);
        this.demonCover = this.add.dynamicBitmapText(820,1700,'fire',getBoonQtyFromInventory('demon_cover'),40).setScrollFactor(0);
        this.freezeCover = this.add.dynamicBitmapText(920,1700,'fire',getBoonQtyFromInventory('hammer'),40).setScrollFactor(0);
        
        
        this.userPinFake = this.add.image(
            window.gameDescriptor.tiles[window.gameDescriptor.playerPos].x,
            window.gameDescriptor.tiles[window.gameDescriptor.playerPos].y,
            'user_pin'
        ).setScale(0.9).setOrigin(0.5,1);
        this.userAvatorFake = this.add.sprite(
            window.gameDescriptor.tiles[window.gameDescriptor.playerPos].x,
            window.gameDescriptor.tiles[window.gameDescriptor.playerPos].y,'avators')
            .setScale(1)
            .setOrigin(0.5,1.4)
            .setAlpha(0.8);
        this.userAvatorFake.anims.play(window.gameDescriptor.user.gender,true);
        // var debug = this.add.graphics();
        // debug.fillStyle(0xff00f0, 0.2);
        // debug.fillCircle(window.gameDescriptor.tiles[0].x,
        //     window.gameDescriptor.tiles[0].y-90, 40);
        var shape1 = this.make.graphics()
                    .fillCircle(window.gameDescriptor.tiles[0].x,window.gameDescriptor.tiles[0].y-90,40);
        var geomask1 = shape1.createGeometryMask();
        this.userAvatorFake.setMask(geomask1);




        let rnd = getRandom(5,20);
        this.seconUserPinFake = this.add.image(
            window.gameDescriptor.tiles[rnd].x,
            window.gameDescriptor.tiles[rnd].y,
            'user_pin'
        ).setScale(0.9).setOrigin(0.5,1).setAlpha(0.75);
        
        // var debug = this.add.graphics();
        // debug.fillStyle(0xff00f0, 0.2);
        // debug.fillCircle(window.gameDescriptor.tiles[rnd].x,
        //     window.gameDescriptor.tiles[rnd].y-90, 40);
        var shape2 = this.make.graphics()
                    .fillCircle(window.gameDescriptor.tiles[rnd].x,window.gameDescriptor.tiles[rnd].y-90,40);
            
        var geomask2 = shape2.createGeometryMask();

        if(window.gameDescriptor.user.gender == 'male'){
            
            var secondUserAvatorFake = this.add.sprite(
                window.gameDescriptor.tiles[rnd].x,
                window.gameDescriptor.tiles[rnd].y,'avators')
                .setScale(1)
                .setOrigin(0.5,1.5)
                .setAlpha(0.8);
            secondUserAvatorFake.setInteractive();
            secondUserAvatorFake.setDataEnabled()
            secondUserAvatorFake.data.set('hint','your wife');
            secondUserAvatorFake.anims.play('female',true);
            secondUserAvatorFake.on('over',this.showHint,this);
            secondUserAvatorFake.setMask(geomask2);
        }else{
            var secondUserAvatorFake = this.add.sprite(
                window.gameDescriptor.tiles[rnd].x,
                window.gameDescriptor.tiles[rnd].y,'avators')
                .setScale(1)
                .setOrigin(0.5,1.5)
                .setAlpha(0.8);
            secondUserAvatorFake.setInteractive();
            secondUserAvatorFake.setDataEnabled()
            secondUserAvatorFake.data.set('hint','your husband');
            secondUserAvatorFake.anims.play('male',true);
            secondUserAvatorFake.on('over',this.showHint,this);
            secondUserAvatorFake.setMask(geomask2);
        }
        


        this.add.image(900,1500,'icon_back3').setScale(1).setScrollFactor(0);
        this.dice = this.add.sprite(900,1505,'dice').setScale(2);
        this.dice.setInteractive();
        this.dice.on('click',this.rollDice,this);
        this.dice.setScrollFactor(0);

        // this.dice.data.set('objectType','dice');

        setInterval(this.notification,1000*70,this);
        
        this.input.on('pointerdown', function (pointer) {
            this.worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
            console.log(pointer.downX,pointer.downY,this.worldPoint,this.cameras.main.scrollX,this.cameras.main.scrollY);
            if(window.gameDescriptor.draw.enabled){
                this.graphics =  this.add.graphics();
                this.graphics.fillStyle(0x00ff00, 1);
                this.graphics.fillCircle(this.worldPoint.x, this.worldPoint.y, 4);
                this.add.image(this.worldPoint.x, this.worldPoint.y,'animals','hen.png').setScale(0.25);
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
            gameObject.emit('over',gameObject);
        });
        this.input.on('gameobjectout', function (pointer, gameObject)
        {
            gameObject.setTint('0xffffff');
        });
        
        /** Keyboard listners */
        // key1 = this.input.keyboard.addKey(Phaser.Keyboard.G);
        // key1.onDown.add(addPhaserDude, this);
        this.input.keyboard.on('keydown', function (event) {

            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.D)
            {
               if(window.gameDescriptor.debug){
                   window.gameDescriptor.debug = false;
                   console.log('Debug Disabled');
                   alert('Debug Disabled');
                   }
               else{
                   window.gameDescriptor.debug = true;
                   console.log('Debug Enabled');
                   alert('Debug Enabled');
               }
            }
            if(event.keyCode === Phaser.Input.Keyboard.KeyCodes.G){
                if(window.gameDescriptor.draw.enabled){
                    window.gameDescriptor.draw.enabled = false;
                    console.log('Draw Disabled');
                    alert('Draw Disabled');
                    }
                else{
                    window.gameDescriptor.draw.enabled = true;
                    console.log('Draw Enabled');
                    alert('Draw Enabled');
                }
            }
            if(event.keyCode == Phaser.Input.Keyboard.KeyCodes.C){

            }
    
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
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#a0c449");

    },
    update:function(time,delta){
        
        this.controls.update(delta);
        // console.log(this.cameras.main._x)
        // updating UI 
        this.coins.setText(window.gameDescriptor.coins);
        this.snakeCover.setText(getBoonQtyFromInventory('snake_cover'));
        this.demonCover.setText(getBoonQtyFromInventory('demon_cover'));
        this.freezeCover.setText(getBoonQtyFromInventory('hammer'));
        this.hearts.setText(window.gameDescriptor.hearts);

        if(this.userPin){
            if(this.userPin.y < HEIGHT/2 ){
                this.cameras.main.scrollY = this.userPin.y - HEIGHT/2;
                // this.cameras.main.startFollow(this.player);
            }
            if(window.gameDescriptor.state == STATES.ideal){
                // var yy=window.gameDescriptor.tiles[window.gameDescriptor.playerPos].y-10;
                // this.tweens.add({
                //     targets: this.userPin,
                //     props: {
                //         y: { value: yy, duration: 200,  },
                //     },
                //     ease: 'Sine.easeInOut',
                //     yoyo: true,
                //     repeat: 1
                // });
            }
            
        }
        if(this.counterText){
            this.counterText.setText( Math.floor(this.counter - this.timer.getElapsed()/1000));
        }

        if(window.gameDescriptor.playerPos && window.gameDescriptor.state == STATES.ideal){
            var pos = window.gameDescriptor.playerPos;

            if(pos >= window.gameDescriptor.selectedLevel*10){
                window.gameDescriptor.levels[window.gameDescriptor.selectedLevel-1].stars = 3;
                
                window.gameDescriptor.selectedLevel++;
                window.gameDescriptor.levels[window.gameDescriptor.selectedLevel-1].state = "unlocked";
                setTimeout((context)=>{
                    context.showMileStonePopup();
                },3000,this)
                
            }
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
            var coinEarned;
            var imageName,sl;
            if(window.gameDescriptor.actionType == 'task'){
                coinEarned = this.add.follower(curve, 508.83813145825104,853.9514456913603+this.cameras.main.scrollY, 'coin_sprite').setOrigin(0.5).setScale(2);
                // this.add.sprite(window.gameDescriptor.screenWidth/2,window.gameDescriptor.screenHeight/2,'coin_sprite');
                coinEarned.anims.play('coin_rotate',true);
                imageName= 'coin_sprite';
                sl=2;
            }else if(window.gameDescriptor.actionType == 'match'){
                coinEarned = coinEarned = this.add.follower(curve, 508.83813145825104,853.9514456913603+this.cameras.main.scrollY, 'hearts')
                                                .setOrigin(0.5)
                                                .setScale(0.2);
                imageName= 'heart';
                sl=0.2;
            }else if(window.gameDescriptor.actionType == 'awareness'){
                coinEarned = this.add.follower(curve, 508.83813145825104,853.9514456913603+this.cameras.main.scrollY, 'badges')
                                        .setOrigin(0.5)
                                        .setScale(0.2);
                imageName= 'badge';
                sl=0.2;
            }
            
            var emitter = this.add.particles(imageName).createEmitter({
                x: WIDTH/2,
                y: HEIGHT/2,
                // blendMode: 'SCREEN',
                scale: { start: sl, end: 0 },
                speed: { min: 10, max: 350 },
                angle: { min: 0, max: 180 },
                gravityY: 150,
                lifespan: 10000,
                quantity: 2
            });
            setTimeout((em)=>{
                em.explode();
            },100,emitter);

            coinEarned.startFollow({
                duration: 1000,
                yoyo: false,
                repeat: 0,
                rotateToPath: false,
                verticalAdjust: true
            });
            setTimeout((object)=>{
                object.setVisible(false);
                if(window.gameDescriptor.actionType == 'task'){
                    window.gameDescriptor.coins +=100;
                }else if(window.gameDescriptor.actionType == 'match'){
                    window.gameDescriptor.hearts +=1;
                }
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
                    new Phaser.Math.Vector2(579.0827210239393, 958.0918658976237),
                    new Phaser.Math.Vector2(540.40068745933405, 1050.3305237946),
                    new Phaser.Math.Vector2(580.88986659071054, 1130.667419382289),
                    new Phaser.Math.Vector2(576.74593007061947, 1211.004314969978),
                    new Phaser.Math.Vector2(575.5775345939596, 1264.5622453617705),
                    new Phaser.Math.Vector2(59.28684433445555, 1374.6535467226774),
                    new Phaser.Math.Vector2(44.65372868298795, 1520.4501350114465),
                    new Phaser.Math.Vector2(92.26238537788673, 1657.3204015682497),
                    new Phaser.Math.Vector2(116.06671372533611, 1707.9028913827206),
                ];
                var curve = new Phaser.Curves.Spline(points);
                var asset = getRandomBoon();
                console.log(asset);
                if(asset.name == 'coins'){
                    window.gameDescriptor.coins += asset.qty;
                }
                else if(asset.name == 'hearts'){
                    window.gameDescriptor.hearts += asset.qty;
                }else{
                    addBoonToInventory(asset);
                }
                var coinEarned = this.add.follower(curve, 508.83813145825104,853.9514456913603+this.cameras.main.scrollY, asset.img)
                                        .setOrigin(0.5)
                                        .setScale(0.3);
                coinEarned.startFollow({
                    duration: 1000,
                    yoyo: false,
                    repeat: 0,
                    rotateToPath: false,
                    verticalAdjust: true
                });
                setTimeout((object,context)=>{
                    object.setVisible(false);
                    imgPopup(object.texture.key,context.popupClose,context.popupClose,context);
                },1100,coinEarned,this);
            }
            else if(window.gameDescriptor.actionType == 'demon'){
                this.dice.input.enabled = true;
                this.music.setMute(UNMUTE);
                this.music.play();
                textPopup(STRINGS.str_got_saved,this.popupClose,this.popupClose,this);
                
            }
        }
        if(window.gameDescriptor.state == STATES.rapidTaskFail){
            
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
                window.gameDescriptor.state = STATES.ideal;
                this.dice.input.enabled = true;
                textPopup(STRINGS.str_got_nothing,this.popupClose,this.popupClose,this);

            }else if(window.gameDescriptor.actionType == 'demon'){
                let punishment = getRandomPunishment();
                window.gameDescriptor.activePunishment = {
                    name: punishment.name,
                    type: punishment.type,
                    waveDuration: punishment.waveDuration,
                }
                console.log(punishment);
                setTimeout((object,context)=>{
                    var text = STRINGS.str_punishment_starts;
                    if(object.name == 'snake_wave'){
                        text = `PUNISHMENT\nYou will face more snkes for ${object.waveDuration/60} mins`;
                    }
                    else if(object.name == 'demon_wave'){
                        text = `PUNISHMENT\nYou will face more demons for ${object.waveDuration/60} minutes`;
                    }
                    else if(object.name == 'frozen'){
                        text = `PUNISHMENT\nYou will get froze to your point for ${object.waveDuration/60} minuts`;
                    }
                    else if(object.name == 'pos_reassign'){
                        text = 'PUNISHMENT\nYour position will be reassigned';
                    }
                    else if(object.name = 'text_spouse'){
                        text = 'PUNISHMENT\nYou have to text your spouse somthing';
                    }
                    textPopup(text,context.popupClose,context.popupClose,context);
                },1100,punishment,this);
                // this.initPunishment(punishment);
            }


        }

    },
    gotoMenu:function(){
        if(window.gameDescriptor.state == STATES.ideal){
            this.music.setMute(MUTE);
            this.scene.start('Dashboard');
        }
    },
    pauseGame:function(){
        if(window.gameDescriptor.state == STATES.ideal){
            this.scene.pause()
        }
    },
    rollDice:function(){
        
        if(window.gameDescriptor.state == STATES.ideal){
            window.gameDescriptor.state = STATES.rolling;
            this.dice.anims.play('diceRoll',true);
            window.gameDescriptor.diceNumber = window.gameDescriptor.debug==true?3:getRandom(1,6);
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
            this.userAvator.setPath(this.curve);
            // this.shape1 = this.make.graphics()
            //                 .fillCircle(window.gameDescriptor.tiles[window.gameDescriptor.playerPos].x,window.gameDescriptor.tiles[window.gameDescriptor.playerPos].y-90,40);
            // this.geomask1 = this.shape1.createGeometryMask();
            // this.userAvator.setMask(this.geomask1);
        }
        else{
            this.userPin = this.add.follower(this.curve, tiles[window.gameDescriptor.playerLastPos].x, tiles[window.gameDescriptor.playerLastPos].y, 'user_pin').setOrigin(0.5,1);
            this.userAvator = this.add.follower(this.curve,
                window.gameDescriptor.tiles[window.gameDescriptor.playerLastPos].x,
                window.gameDescriptor.tiles[window.gameDescriptor.playerLastPos].y,'avators')
                .setScale(1)
                .setOrigin(0.5,1.4)
                .setAlpha(1);
            this.userAvator.anims.play(window.gameDescriptor.user.gender,true);
            // var debug = this.add.graphics();
            // debug.fillStyle(0xff00f0, 0.2);
            // debug.fillCircle(window.gameDescriptor.tiles[0].x,
            //     window.gameDescriptor.tiles[0].y-90, 40);
            // this.shape1 = this.make.graphics()
            //             .fillCircle(window.gameDescriptor.tiles[window.gameDescriptor.playerLastPos].x,window.gameDescriptor.tiles[window.gameDescriptor.playerLastPos].y-90,40);
            // this.geomask1 = this.shape1.createGeometryMask();
            // this.userAvator.setMask(this.geomask1);


            // this.userAvatorFake = this.add.sprite(
            //     window.gameDescriptor.tiles[window.gameDescriptor.playerPos].x,
            //     window.gameDescriptor.tiles[window.gameDescriptor.playerPos].y,'avators')
            //     .setScale(1)
            //     .setOrigin(0.5,1.7)
            //     .setAlpha(0.8);
            // this.userAvatorFake.anims.play(window.gameDescriptor.user.gender,true);
    
        }
        this.userPinFake.setVisible(false);
        this.userAvatorFake.setVisible(false);
        this.userPin.startFollow({
            duration: 3000,
            yoyo: false,
            repeat: 0,
            rotateToPath: false,
            verticalAdjust: true
        });
        this.userAvator.startFollow({
            duration: 3000,
            yoyo: false,
            repeat: 0,
            rotateToPath: false,
            verticalAdjust: true
        });

        // this.geomask1.startFollow({
        //     duration: 3000,
        //     yoyo: false,
        //     repeat: 0,
        //     rotateToPath: false,
        //     verticalAdjust: true
        // });

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
                        window.gameDescriptor.actionType = 'cobra';
                        window.gameDescriptor.state = STATES.snadder;
                        this.sound.playAudioSprite('ui_sfx', 'game-over');
                        this.popupSnakeContainer = this.add.container(WIDTH/2, HEIGHT/2);
                        
                        var popup = this.add.image(0,0,'popupBG')
                                        .setScrollFactor(0)
                                        .setScale(0.6,0.8);
                        var popup1 = this.add.image(0,0,'popupBG0')
                                        .setScrollFactor(0)
                                        .setScale(0.6,0.8);
                        var feature = this.add.image(0,100,'snake_large')
                                        .setScale(0.6)
                                        .setScrollFactor(0)
                                        .setOrigin(0.5,1);
                        var popupClose = this.add.image(350,-350,'btn_close')
                                        .setScale(0.5)
                                        .setInteractive()
                                        .setScrollFactor(0)
                                        .on('click',this.popupSnakeOk,this);
                        var popupOk = this.add.image(0,200,'btn_ok')
                                        .setScale(0.5)
                                        .setInteractive()
                                        .setScrollFactor(0)
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
                        this.popupPortalContainer = this.add.container(WIDTH/2, HEIGHT/2);
                        
                        var popup = this.add.image(0,0,'popupBG')
                                        .setScrollFactor(0)
                                        .setScale(0.6,0.8);
                        var popup1 = this.add.image(0,0,'popupBG0')
                                        .setScrollFactor(0)
                                        .setScale(0.6,0.8);
                        var feature = this.add.sprite(0,100,'portal')
                                        .setScale(3)
                                        .setScrollFactor(0)
                                        .setOrigin(0.47,0.9);
                            feature.anims.play('portalRunning',true);
                        var popupClose = this.add.image(350,-350,'btn_close')
                                        .setScale(0.5)
                                        .setInteractive()
                                        .setScrollFactor(0)
                                        .on('click',this.popupPortalOk,this);
                        var popupOk = this.add.image(0,200,'btn_ok')
                                        .setScale(0.5)
                                        .setInteractive()
                                        .setScrollFactor(0)
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
                    this.popupFairyContainer = this.add.container(WIDTH/2, HEIGHT/2).setScrollFactor(0);
                    
                    var popup = this.add.image(0,0,'popupBG')
                                    .setScrollFactor(0)
                                    .setScale(0.6,0.8);
                    var popup1 = this.add.image(0,0,'popupBG0')
                                    .setScrollFactor(0)
                                    .setScale(0.6,0.8);
                    var feature = this.add.image(0,100,'fairy_large')
                                    .setScale(0.2)
                                    .setScrollFactor(0)
                                    .setOrigin(0.5,1);
                    var popupClose = this.add.image(350,-350,'btn_close')
                                    .setScale(0.5)
                                    .setInteractive()
                                    .setScrollFactor(0)
                                    .on('click',this.popupFairyOk,this);
                    var popupOk = this.add.image(0,200,'btn_ok')
                                    .setScale(0.5)
                                    .setInteractive()
                                    .setScrollFactor(0)
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
                      var message = createSpeechBubble(this,WIDTH/2-100,HEIGHT/4,300,150,'center','bottom',STRINGS.str_fairy_instructions);
                        setTimeout((message)=>{
                            message[0].setVisible(false);
                            message[1].setVisible(false);
                        },10000,message);

                        break;
                case 'demon':
                        window.gameDescriptor.state = STATES.rapidTask;
                        window.gameDescriptor.actionType = 'demon';

                        this.sound.playAudioSprite('ui_sfx', 'game-over');
                        this.popupDemonContainer = this.add.container(WIDTH/2, HEIGHT/2);
                    
                        var popup = this.add.image(0,0,'popupBG')
                                        .setScrollFactor(0)
                                        .setScale(0.6,0.8);
                        var popup1 = this.add.image(0,0,'popupBG0')
                                        .setScrollFactor(0)
                                        .setScale(0.6,0.8);
                        var feature = this.add.image(0,100,'demon_large')
                                        .setScale(0.18)
                                        .setScrollFactor(0)
                                        .setOrigin(0.5,1);
                        var popupClose = this.add.image(350,-350,'btn_close')
                                        .setScale(0.5)
                                        .setInteractive()
                                        .setScrollFactor(0)
                                        .on('click',this.popupDemonOk,this);
                        var popupOk = this.add.image(0,200,'btn_ok')
                                        .setScale(0.5)
                                        .setInteractive()
                                        .setScrollFactor(0)
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
                        var message = createSpeechBubble(this,WIDTH/2-100,HEIGHT/4,300,150,'center','bottom',STRINGS.str_demon_instructions);
                        setTimeout((message)=>{
                            message[0].setVisible(false);
                            message[1].setVisible(false);
                        },10000,message);
                        break;
                case 'match':
                    window.gameDescriptor.actionType = 'match';
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
                        break;
                case 'awareness':
                    window.gameDescriptor.actionType = 'awareness';
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
    popupMilestoneClose:function(){
        this.popupMilestoneContainer.destroy();
    },
    popupClose:function(){
        this.popupContainer.destroy();
        if(window.gameDescriptor.activePunishment != null){
            this.initPunishment(window.gameDescriptor.activePunishment);
        }
    },
    popupSnakeClose:function(){
        console.log('cobra popup closed');
        this.popupSnakeContainer.destroy();
        window.gameDescriptor.state = STATES.ideal;

    },
    popupSnakeOk:function(){
        console.log('cobra popup closed');
        this.popupSnakeContainer.destroy();
        window.gameDescriptor.state = STATES.ideal;
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
        if(window.gameDescriptor.tiles[window.gameDescriptor.playerPos]){
            window.gameDescriptor.tiles[window.gameDescriptor.playerPos].feature.destroy();
        }

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
    startCommonPunishment:function(){
        this.popupAnswerContainer.destroy();
        window.gameDescriptor.state = STATES.ideal;
        this.dice.input.enabled = true;
        this.music.setMute(UNMUTE);
            
        this.popupMessageContainer = this.add.container(WIDTH/2, HEIGHT/2).setScrollFactor(0);
                    
        var popup = this.add.image(0,0,'popupBG')
                        .setScrollFactor(0)
                        .setScale(0.6,0.8);
        var popup1 = this.add.image(0,0,'popupBG0')
                        .setScrollFactor(0)
                        .setScale(0.6,0.8);
        // var bglove = this.add.image(0,0,'love1')
        //                 .setScrollFactor(0)
        //                 .setScale(0.4);
        
        var punish = getRandomCommonPunishment();
        var context = this;

        
        // emitter.setPosition(WIDTH/2, HEIGHT/2);
        // emitter.setEmitZone(emitZones[emitZoneIndex]);
        // emitter.explode();
        
        var element = this.add.dom(-300,10).createFromCache('message').setScrollFactor(0);
        element.setScale(1.8,1.7);
        element.setOrigin(0,0.5);
        element.setPerspective(800);
        element.addListener('click');
        var question = element.getChildByID("question");
        question.innerText = punish.q;
        element.on('click', function (event) {
    
            if (event.target.name === 'loginButton')
            {
                var inputMessage = this.getChildByName('message');
                var question = this.getChildByID("question");
                question.innerText = punish.q;
                //  Have they entered anything?
                if (inputMessage.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');
                    // window.gameDescriptor.user.pass = inputPassword.value;
                    fetch("http://lovegame.frappypie.com", {
                            method:"POST",
                            body: JSON.stringify({
                                message: inputMessage.value,
                                
                            })
                    })
                    .then(result => {
                        // do something with the result
                        console.log("Completed with result:", result);
                    });
                    //  Tween the login form out
                    // this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 2000, ease: 'Power3' });
    
                    this.scene.tweens.add({ targets: element, scaleX: 1.8, scaleY: 2, duration: 1000, ease: 'Power3',
                        onComplete: function ()
                        {
                            element.setVisible(false);
                            context.popupMessageContainer.destroy();
                            var emitter = context.add.particles('heart').createEmitter({
                                x: WIDTH/2,
                                y: HEIGHT/2,
                                // blendMode: 'SCREEN',
                                scale: { start: 0.1, end: 0 },
                                speed: { min: 10, max: 350 },
                                angle: { min: 180, max: 360 },
                                gravityY: 50,
                                lifespan: 10000,
                                quantity: 10
                            });
                            setTimeout((em)=>{
                                em.explode();
                            },100,emitter);

                            // context.scene.start('Dashboard');
                        }
                    });
    
                    //  Populate the text with whatever they typed in as the username!
                    // text.setText('Welcome ' + inputUsername.value);
                }
                else
                {
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }
    
        });
     
        // this.tweens.add({
        //     targets: element,
        //     y: HEIGHT/2,
        //     duration: 2000,
        //     ease: 'Power3'
        // });

        this.popupMessageContainer.add(popup);
        this.popupMessageContainer.add(popup1);
        // this.popupMessageContainer.add(bglove);
        this.popupMessageContainer.add(element);

        this.tweens.add({
            targets     : [ this.popupMessageContainer ],
            scaleX: 1.2,
            scaleY: 1.2,
            ease        : 'Elastic',
            duration    : 3000,
            yoyo        : false,
            repeat      : 0,
            callbackScope   : this
        });
    },
    showCorrectAnswer:function(){
        var qid = window.gameDescriptor.questionAnswered[window.gameDescriptor.questionAnswered.length-1];
        var data = getQuestionAnswerData(qid);
        var question = getQuestion(qid);
        if(question.questionType != 'quiz')
            return;

        this.popupAnswerContainer = this.add.container(960/2, 1780/2).setScrollFactor(0);
                    
        var popup = this.add.image(0,0,'popupBG')
                        .setScrollFactor(0)
                        .setScale(0.6,0.8);
        var popup1 = this.add.image(0,0,'popupBG0')
                        .setScrollFactor(0)
                        .setScale(0.6,0.8);
        // var feature = this.add.image(0,100,'fairy_large')
        //                 .setScale(0.6)
        //                 .setOrigin(0.5,1);
        var feature = null;
        var popupClose = this.add.image(350,-350,'btn_close1')
                        .setScale(0.7)
                        .setInteractive()
                        .setScrollFactor(0)
                        .on('click',this.startCommonPunishment,this);
        var popupOk = this.add.image(0,200,'btn_ok')
                        .setScale(0.5)
                        .setInteractive()
                        .setScrollFactor(0)
                        .on('click',this.startCommonPunishment,this);
        
                        
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
                y: -100,
                text: 'Your answer was incorrect\n'+"your punishment is to write a message to your spouse.",
                origin: { x: 0.5, y: 0.5 },
                style: {
                    font: 'bold 38px Arial',
                    fill: 'green',
                    wordWrap: { width: 500 }
                }
            });
            feature.setScrollFactor(0);
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
    initPunishment:function(punishment){
        console.log(punishment);
        switch(punishment.name){
            case 'snake_wave':
                this.timer = this.time.addEvent({ delay: punishment.waveDuration*1000, callback: this.punishmentTimeout, callbackScope: this });
                this.counterText = this.add.dynamicBitmapText(WIDTH/2-50,20,'fire','',120).setScrollFactor(0);
                this.counter = punishment.waveDuration;
                this.counterText.setVisible(true);
                window.gameDescriptor.state = STATES.ideal;
                this.dice.input.enabled = true;
                for(let i=1;i< window.gameDescriptor.tiles.length;i++){
                    let tile = window.gameDescriptor.tiles[i];
                    if(i%5 == 0){
                        if(tile.feature != null && i > window.gameDescriptor.playerPos)
                        {
                            tile.feature.destroy();
                            tile.feature = this.add.sprite(tile.x,tile.y,'cobraRed');
                            tile.feature.setScale(1.2);
                            tile.feature.setOrigin(0.6,1);
                            tile.feature.anims.play('cobraRedHover',true);
                            tile['oldType'] = tile.featureType;
                            tile.featureType = 'cobra';

                        }
                        
                    }
                }
                break;

            case 'demon_wave':
                this.timer = this.time.addEvent({ delay: punishment.waveDuration*1000, callback: this.punishmentTimeout, callbackScope: this });
                this.counterText = this.add.dynamicBitmapText(WIDTH/2-50,20,'fire','',120).setScrollFactor(0);
                this.counter = punishment.waveDuration;
                this.counterText.setVisible(true);
                window.gameDescriptor.state = STATES.ideal;
                this.dice.input.enabled = true;
                for(let i=1;i< window.gameDescriptor.tiles.length;i++){
                    let tile = window.gameDescriptor.tiles[i];
                    if(i%5 == 0){
                        if(tile.feature != null && i > window.gameDescriptor.playerPos)
                        {
                            tile.feature.destroy();
                            tile.feature = this.add.sprite(tile.x,tile.y,'demon1').play('demonHover',true);
                            tile.feature.setScale(0.35);
                            tile.feature.setOrigin(0.6,0.95);
                            tile['oldType'] = tile.featureType;
                            tile.featureType = 'demon';
                        }
                        
                    }
                }
                break;
            case 'pos_reassign':
                    window.gameDescriptor.playerPos -= getRandom(1,10);
                    window.gameDescriptor.playerDirection = -1;
                    this.movePlayer();
                break;
            case 'frozen':
                    this.timer = this.time.addEvent({ delay: punishment.waveDuration*1000, callback: this.punishmentTimeoutFrozen, callbackScope: this });
                    this.counterText = this.add.dynamicBitmapText(WIDTH/2-50,20,'fire','',120).setScrollFactor(0);
                    this.counter = punishment.waveDuration;
                    this.counterText.setVisible(true);
                    window.gameDescriptor.state = STATES.frozen;
                break;
            case 'text_spouse':
                    window.gameDescriptor.state = STATES.ideal;
                    this.dice.input.enabled = true;
        
                break;
        }
        window.gameDescriptor.activePunishment = null;
    },
    punishmentTimeoutFrozen:function(){
        if(window.gameDescriptor.state == STATES.frozen){
            window.gameDescriptor.state = STATES.ideal;
            this.dice.input.enabled = true;
            this.counterText.setVisible(false);
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
                            tile.feature.setScale(0.8);
                            tile.feature.setOrigin(0.6,1);
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
                            tile.feature = this.add.sprite(tile.x,tile.y,'demon1').play('demonHover',true);
                            tile.feature.setScale(0.35);
                            tile.feature.setOrigin(0.6,0.95);
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
                        case 'match':
                            tile.feature = this.add.image(tile.x,tile.y,'heart');
                            tile.feature.setScale(0.12);
                            tile.feature.setOrigin(0.47,1.1);
                            // tile.feature.anims.play('portalRunning',true);
                            break;
                        case 'quiz':
                            tile.feature = this.add.image(tile.x,tile.y,'lock_key');
                            tile.feature.setScale(0.12);
                            tile.feature.setOrigin(0.47,1.1);
                            // tile.feature.anims.play('portalRunning',true);
                            break;
                        case 'awareness':
                            tile.feature = this.add.image(tile.x,tile.y,'lock_key');
                            tile.feature.setScale(0.12);
                            tile.feature.setOrigin(0.47,1.1);
                            // tile.feature.anims.play('portalRunning',true);
                            break;

                    }
                }
                
                

            }
                
        }
    },
    addAssetsToLevel(){
        for(let asset of window.gameDescriptor.levelAssets){
            this.add.image(asset.x,asset.y,asset.texture,asset.frame)
                    .setScale(asset.scaleX,asset.scaleY);
        }
    },
    addFeaturesToTile:function(){
        var points = [];
        var tiles = window.gameDescriptor.tiles;
        var j=0;
        for(let tile of window.gameDescriptor.tiles){
            if(j>24){
                points.push(new Phaser.Math.Vector2(tile.x,tile.y));
            }
            j++;
        }
        // var path = new Phaser.Curves.Path(609,1560);
        var curve = new Phaser.Curves.Spline(points);
        // path.splineTo(points);
        var graphics =  this.add.graphics();
        graphics.lineStyle(140, 0xffe0b9, 1);
        // path.draw(graphics);
        curve.draw(graphics, 200);

        // graphics.fillStyle(0x00ff00, 1);
        // for (var i = 0; i < points.length; i++)
        // {
        //     graphics.fillCircle(points[i].x, points[i].y, 50);
        // }

        for(let tile of window.gameDescriptor.tiles){
            tile['texture'] = this.add.image(tile.x,tile.y,'stone').setScale(0.23);
        }
        var i=0;
        for(let tile of window.gameDescriptor.tiles){
            if(tile.tileType == 1){
                if(tile.featureType == 'fairy'){
                    tile.feature = this.add.sprite(tile.x,tile.y,'fairy');
                    tile.feature.setScale(1.3);
                    tile.feature.setOrigin(0.5,1.3);
                    tile.feature.anims.play('fairyHover',true);
                }
                if(tile.featureType == 'demon'){
                    tile.feature = this.add.sprite(tile.x,tile.y,'demon1').play('demonHover',true);
                    tile.feature.setScale(0.35);
                    tile.feature.setOrigin(0.6,0.95);
                    // tile.feature.anims.play('demonHover',true);
                }
                if(tile.featureType == 'cobra'){
                    tile.feature = this.add.sprite(tile.x,tile.y,'cobra');
                    tile.feature.setScale(0.8);
                    tile.feature.setOrigin(0.6,1);
                    tile.feature.anims.play('cobraHover',true);
                    var t = tile;
                    tile.feature.on('animationrepeat', ()=>{
                        // t.feature.flipX?t.feature.flipX = false:t.feature.flipX=true;
                        // console.log("dddd--");
                    }, this);
                }
                if(tile.featureType == 'portal'){
                    tile.feature = this.add.sprite(tile.x,tile.y,'portal');
                    tile.feature.setScale(1.8);
                    tile.feature.setOrigin(0.47,0.9);
                    tile.feature.anims.play('portalRunning',true);
                }
                if(tile.featureType == 'match'){
                    tile.feature = this.add.image(tile.x,tile.y,'heart');
                    tile.feature.setScale(0.12);
                    tile.feature.setOrigin(0.47,1.1);
                    // tile.feature.anims.play('portalRunning',true);
                }
                // if(tile.featureType == 'quiz'){
                //     tile.feature = this.add.image(tile.x,tile.y,'lock_key');
                //     tile.feature.setScale(0.12);
                //     tile.feature.setOrigin(0.47,1.1);
                //     // tile.feature.anims.play('portalRunning',true);
                // }
                if(tile.featureType == 'awareness'){
                    tile.feature = this.add.image(tile.x,tile.y,'badge');
                    tile.feature.setScale(0.15);
                    tile.feature.setOrigin(0.47,1.1);
                    // tile.feature.anims.play('portalRunning',true);
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
    },
    showHint:function(object){
        let dir = 'bottom';
        let arrowDir = 'left';
        let x = object.x;
        let y = object.y;
        let width = object.width*object._scaleX*2;
        let height = 100*object._scaleY;

        if(object.x > WIDTH/3 && object.x < ((WIDTH/3)*2) ){
            arrowDir = 'center';
            x -= width/2;
            y -= height+(object.height/2);
        }else if(object.x > ((WIDTH/3)*2)){
            arrowDir = 'right';
            x -= width;
        }

        if(object.y < HEIGHT/4){
            dir = 'top';
            y += height/2;
        }

        if(height >180)height=180;

        
        let message = createSpeechBubble(this,x,y ,width, height, arrowDir,dir,object.data.get('hint'));
        setTimeout((message)=>{
            message[0].setVisible(false);
            message[1].setVisible(false);
        },5000,message);
    },
    breakIce:function(){
        if(getBoonQtyFromInventory('hammer') >0){
            if(window.gameDescriptor.state == STATES.frozen)
            {
                let hammer = this.add.image(WIDTH/2,HEIGHT,'hammer').setScrollFactor(0);
                this.tweens.add({
                    targets: hammer,
                    y: HEIGHT/2,
                    duration: 1000,
                    ease: 'Power3'
                });
                setTimeout((hammer)=>{
                    hammer.destroy();
                },1200,hammer);
                useBoonFromInventory('hammer');
                window.gameDescriptor.state = STATES.ideal;
                this.dice.input.enabled = true;
                this.counterText.setVisible(false);
            }else{
                textPopup("Player not frozen",this.popupClose,this.popupClose,this);
            }
        }else{
            textPopup("No hammer availible",this.popupClose,this.popupClose,this);
        }
        
    },
    blastSnakes:function(){
        if(getBoonQtyFromInventory('snake_cover') >0){
            if(window.gameDescriptor.actionType = 'cobra' && window.gameDescriptor.state == STATES.snadder)
            {
                let snake_cover = this.add.image(WIDTH/2,HEIGHT,'snake_potion').setScrollFactor(0);
                this.tweens.add({
                    targets: snake_cover,
                    y: HEIGHT/2,
                    duration: 1000,
                    ease: 'Power3'
                });
                setTimeout((snake_cover)=>{
                    snake_cover.destroy();
                },1200,snake_cover);
                useBoonFromInventory('snake_cover');
                window.gameDescriptor.state = STATES.ideal;
                this.dice.input.enabled = true;
                this.counterText.setVisible(false);
            }else{
                textPopup("Player not at snake",this.popupClose,this.popupClose,this);
            }
        }else{
            textPopup("No snake cover availible",this.popupClose,this.popupClose,this);
        }
    },
    blastDemons:function(){
        if(getBoonQtyFromInventory('demon_cover') >0){
            if(window.gameDescriptor.actionType = 'demon' && window.gameDescriptor.state == STATES.rapidTask)
            {
                let demon_cover = this.add.image(WIDTH/2,HEIGHT,'demon_potion').setScrollFactor(0);
                this.tweens.add({
                    targets: demon_cover,
                    y: HEIGHT/2,
                    duration: 1000,
                    ease: 'Power3'
                });
                setTimeout((demon_cover)=>{
                    demon_cover.destroy();
                },1200,demon_cover);
                useBoonFromInventory('demon_cover');
                this.popupDemonClose();
            }else{
                textPopup("Player not attacked by demon",this.popupClose,this.popupClose,this);
            }
        }else{
            textPopup("No demon cover availible",this.popupClose,this.popupClose,this);
        }
    },
    notification:function(context){
        context.popupNotificationContainer = context.add.container(WIDTH/2, 110).setScrollFactor(0);
                    
        var popup = context.add.image(0,0,'noti_ui')
                        .setScrollFactor(0)
                        .setScale(0.6,0.6);
        var popup1  = context.add.sprite(-130,100,'avators')
                                .setScale(1)
                                .setOrigin(0.5,1.5)
                                .setAlpha(0.8);
        if(window.gameDescriptor.user.gender == 'male'){
            popup1.anims.play('female',true);
        }else{
            popup1.anims.play('male',true);
        }

        var feature = context.make.text({
            x: -40,
            y: 0,
            text: window.gameDescriptor.textMessages[getRandom(0,7)],
            origin: { x: 0, y: 0 },
            style: {
                font: 'bold 20px Arial',
                fill: 'white',
                wordWrap: { width: 250 }
            }
        });
        context.bounds = new Phaser.Geom.Rectangle();
        feature.getBounds(context.bounds);
        // feature.setPosition(0)
        feature.setScrollFactor(0);
        var context1 = context;
        
        // this.tweens.add({
        //     targets: element,
        //     y: HEIGHT/2,
        //     duration: 2000,
        //     ease: 'Power3'
        // });

        context.popupNotificationContainer.add(popup);
        context.popupNotificationContainer.add(popup1);
        context.popupNotificationContainer.add(feature);

        context.tweens.add({
            targets     : [ context.popupNotificationContainer ],
            scaleX: 1.2,
            scaleY: 1.2,
            ease        : 'Elastic',
            duration    : 3000,
            yoyo        : false,
            repeat      : 0,
            callbackScope   : this
        });

        setTimeout(function(context){
            context.popupNotificationContainer.destroy();
        },10*1000,context1)

    },
    showMileStonePopup:function(){
        this.popupMilestoneContainer = this.add.container(WIDTH/2, HEIGHT/2).setScrollFactor(0);
                    
        var popup = this.add.image(0,0,'popupBG')
                        .setScrollFactor(0)
                        .setScale(0.6,0.8);
        var popup1 = this.add.image(0,0,'popupBG0')
                        .setScrollFactor(0)
                        .setScale(0.6,0.8);
        
        var popupClose = this.add.image(350,-350,'btn_close')
                        .setScale(0.5)
                        .setInteractive()
                        .setScrollFactor(0)
                        .on('click',this.popupMilestoneClose,this);
        var popupOk = this.add.image(0,200,'btn_ok')
                        .setScale(0.5)
                        .setInteractive()
                        .setScrollFactor(0)
                        .on('click',this.popupMilestoneClose,this);

        var text = this.make.text({
            x: 0,
            y: -210,
            text: 'Milestone achived',
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 45px Arial',
                fill: 'green',
                wordWrap: { width: 600 }
            }
        });
       
        text.setScrollFactor(0);
        var text2 = this.add.dynamicBitmapText(-20,0,'fire',window.gameDescriptor.selectedLevel,120).setScrollFactor(0);
        
        var emitter = this.add.particles('cup').createEmitter({
            x: WIDTH/2,
            y: HEIGHT/2,
            // blendMode: 'SCREEN',
            scale: { start: 0.2, end: 0 },
            speed: { min: 10, max: 350 },
            angle: { min: 0, max: 360 },
            gravityY: 150,
            lifespan: 10000,
            quantity: 3
        });
        setTimeout((em)=>{
            em.explode();
        },300,emitter);
                

        this.popupMilestoneContainer.add(popup);
        this.popupMilestoneContainer.add(popup1);
        this.popupMilestoneContainer.add(popupClose);
        this.popupMilestoneContainer.add(popupOk);
        this.popupMilestoneContainer.add(text);
        this.popupMilestoneContainer.add(text2);

        this.tweens.add({
            targets     : [ this.popupMilestoneContainer ],
            scaleX: 1.2,
            scaleY: 1.2,
            ease        : 'Elastic',
            duration    : 3000,
            yoyo        : false,
            repeat      : 0,
            callbackScope   : this
        });

        
        
    }


});




