var Splash = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'Splash',
    initialize:

    function Splash ()
    {
        Phaser.Scene.call(this, { key: 'Splash', active: false });
    },

    preload: function ()
    {
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('bg0','assets/images/BG_Decor.png');
        this.load.image('bg1','assets/images/Middle_Decor.png');
        this.load.image('bg2','assets/images/Foreground.png');
        this.load.image('bg3','assets/images/Ground.png');

        this.load.image('tile', 'assets/images/tile.png');
        this.load.image('snakes', 'assets/images/snakes0.png');

        this.load.bitmapFont('ice','assets/fonts/bitmap/azo-fire.png','assets/fonts/bitmap/azo-fire.xml')
        // game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },

    create: function ()
    {
        window.gameDescriptor = {
            WIDTH:document.documentElement.clientWidth,
            HEIGHT:document.documentElement.clientHeight,
        };

        this.face = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'sky').setScale(1.7);
        this.face = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg0').setScale(1.7);
        this.face = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg1').setScale(1.7);
        this.face = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg2').setScale(1.7);
        this.face = this.add.image(window.gameDescriptor.WIDTH/2, 1210, 'bg3').setScale(1);

        this.snake = this.add.image(480, 900, 'snakes').setScale(0.7);
        this.add.text(330, 1100,'START', { font: '100px Arial', fill: '#fff'});
        
        this.add.dynamicBitmapText(150,500,'ice','SNADDER',128);

        this.input.once('pointerdown', function () {
        
            this.scene.add('Avator', Avator, true, { x: 400, y: 300 });

        }, this);



        // window.splashScene = this;
        // window.splashScene.get('Splash').myMethod();
    }

});




