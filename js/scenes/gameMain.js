var GameMain = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'GameMain',
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
        this.add.dynamicBitmapText(150,1677,'fire',window.gameDescriptor.coins,35);


        this.add.image(700,1700,'wood_btn').setScale(0.6);
        this.add.image(800,1700,'wood_btn').setScale(0.6);
        this.add.image(900,1700,'wood_btn').setScale(0.6);
        this.add.image(700,1700,'love_potion').setScale(0.2);
        this.add.image(800,1700,'cup').setScale(0.2);
        this.add.image(900,1700,'hammer').setScale(0.2);

        
        this.userPin = this.add.image(
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
            key: 'diceStop',
            frames: [{key:'dice',frame:0 }],
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
                this.dice.anims.play('diceStop');
                window.gameDescriptor.state = STATES.moving;
                window.gameDescriptor.playerPos += window.gameDescriptor.diceNumber;
                console.log(window.gameDescriptor.diceNumber);
                this.movePlayer();
            });
            // setTimeout(function(dice){
            //     window.gameDescriptor.state = STATES.moving;
            //     dice.input.enabled = true;
            //     console.log(window.gameDescriptor.diceNumber);
            // },1000,this.dice);
        }
    },
    movePlayer:function(){
        console.log("moving");
        if(window.gameDescriptor.playerPos < window.gameDescriptor.tiles.length){
            this.userPin.x = window.gameDescriptor.tiles[window.gameDescriptor.playerPos].x;
            this.userPin.y = window.gameDescriptor.tiles[window.gameDescriptor.playerPos].y;
            window.gameDescriptor.state = STATES.ideal;
            this.dice.input.enabled = true;

            this.scene.add('Task',Task,true,{x:100,y:100});
        }else{
            this.dice.input.enabled = true;

        }
    }


});




