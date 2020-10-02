var Match = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'Match',
    initialize:

    function Match ()
    {
        Phaser.Scene.call(this, { key: 'Match', active: false });
    },

    preload: function ()
    {
        
  

    },

    create: function ()
    {

        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'sky').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg0').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg1').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 1210, 'bg3').setScale(1);

        this.shop_close = this.add.image(900,80,'btn_close').setScale(0.4);
        
        this.shop_menu = this.add.image(80,80,'btn_prew').setScale(0.4);
        this.shop_menu.setInteractive();
        // this.shop_menu.on('click',this.gotoMenu,this);
        this.shop_menu.on('click',this.gotoMenu,this);

        



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


        // window.splashScene = this;
        // window.splashScene.get('Splash').myMethod();
    },
    gotoMenu:function(){
        this.scene.start('Dashboard');
    }

});




