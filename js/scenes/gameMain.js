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
        

    },

    create: function ()
    {

        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'sky').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg0').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg1').setScale(1.7);
        this.bg = this.add.image(980/2, 1742/2, 'gamebg3').setScale(2.06,2.2);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 1210, 'bg3').setScale(1);

        
        // this.add.image(500,100,'wood_up').setScale(0.65,1);
        this.shop_close = this.add.image(900,80,'btn_pause').setScale(0.4);
        this.shop_menu = this.add.image(80,80,'btn_menu').setScale(0.4);
        this.shop_menu.setInteractive();
        this.shop_menu.on('click',this.gotoMenu,this);

        this.add.image(500,1680,'wood_down').setScale(0.65);
        
        this.add.image(170,1700,'wood_table').setScale(1,0.8);
        this.add.image(100,1700,'coins').setScale(0.15);
        this.coins = this.add.dynamicBitmapText(150,1677,'fire',window.gameDescriptor.coins,35);


        this.add.image(700,1700,'wood_btn').setScale(0.6);
        this.add.image(800,1700,'wood_btn').setScale(0.6);
        this.add.image(900,1700,'wood_btn').setScale(0.6);
        this.add.image(700,1700,'love_potion').setScale(0.2);
        this.add.image(800,1700,'cup').setScale(0.2);
        this.add.image(900,1700,'hammer').setScale(0.2);

        
        this.userPinFake = this.add.image(
            window.gameDescriptor.tiles[window.gameDescriptor.playerPos].x,
            window.gameDescriptor.tiles[window.gameDescriptor.playerPos].y,
            'user_pin'
        ).setScale(0.9).setOrigin(0.5,1);
        
        this.add.image(900,1500,'icon_back3').setScale(1);
        this.dice = this.add.sprite(900,1505,'dice').setScale(2);
        this.dice.setInteractive();
        this.dice.on('click',this.rollDice,this);
        // this.dice.data.set('objectType','dice');

        this.anims.create({
            key: 'diceRoll',
            frames: this.anims.generateFrameNumbers('dice', { start: 0, end:5 }),
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
            frames: [{key:'dice',frame:16 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'diceStop2',
            frames: [{key:'dice',frame:22 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'diceStop1',
            frames: [{key:'dice',frame:28 }],
            frameRate: 10,
            repeat: -1
        });
        this.input.on('pointerdown', function (pointer) {
            console.log(pointer.downX,pointer.downY);
        }, this);

        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('click', gameObject);
        }, this);

        
        //         lemming.pauseFollow();
        //         lemming.resumeFollow();
    
    },
    update:function(){
        // if(window.gameDescriptor.debug){
        //     console.log("state:"+window.gameDescriptor.state)
        // }

        this.coins.setText(window.gameDescriptor.coins);
        if(window.gameDescriptor.state == STATES.taskPass){
            this.dice.input.enabled = true;
        }
        if(window.gameDescriptor.state == STATES.taskFail){
            this.dice.input.enabled = true;
        }
        
    },
    gotoMenu:function(){
        this.scene.start('Dashboard');
    },
    rollDice:function(){
        
        if(window.gameDescriptor.state == STATES.ideal){
            window.gameDescriptor.state = STATES.rolling;
            this.dice.anims.play('diceRoll',true);
            // this.dice.data.set('anim',true);
            window.gameDescriptor.diceNumber = getRandom(1,6);
            this.dice.input.enabled = false;
            // dragon.on("animationcomplete", () => {
            //     dragon.anims.play('dragon-fly');
            // });
            this.dice.once("animationrepeat", () => {
                this.dice.anims.play('diceStop'+window.gameDescriptor.diceNumber);
                window.gameDescriptor.state = STATES.moving;
                window.gameDescriptor.playerPos += window.gameDescriptor.diceNumber;
                console.log(window.gameDescriptor.diceNumber);
                this.movePlayer();
            });
            
        }
    },
    movePlayer:function(){

        var points = [];
        var tiles = window.gameDescriptor.tiles;
        for(let i=window.gameDescriptor.playerLastPos;i<=window.gameDescriptor.playerPos;i++){
            points.push(new Phaser.Math.Vector2(tiles[i].x,tiles[i].y));
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
        
        this.userPin = this.add.follower(this.curve, tiles[0].x, tiles[0].y, 'user_pin').setOrigin(0.5,1);
        this.userPinFake.setVisible(false);
        this.userPin.startFollow({
            duration: 3000,
            yoyo: false,
            repeat: 0,
            rotateToPath: false
        });
        setTimeout(function(context){
            window.gameDescriptor.state = STATES.task;
            context.startTask();
        }, 3000,this);
        
    },
    startTask:function(){
        if(window.gameDescriptor.state == STATES.task){
            if(this.scene.get('Task')){
                this.scene.get('Task').refresh();
                this.scene.setVisible(true,'Task');
            }else{
                this.scene.add('Task',Task,true,{x:100,y:100});
            }
        }
        
    }


});




