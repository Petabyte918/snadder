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
        this.shop_close = this.add.image(900,80,'btn_close').setScale(0.4);
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



        
        
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('click', gameObject);
        }, this);


        // window.splashScene = this;
        // window.splashScene.get('Splash').myMethod();
    },
    gotoMenu:function(){
        this.scene.start('Dashboard');
    }

});




