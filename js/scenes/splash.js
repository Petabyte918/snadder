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
        this.load.image('face', 'assets/images/background0.png');
        this.load.image('tile', 'assets/images/tile.png');
        this.load.image('snakes', 'assets/images/snakes0.png');
        
    },

    create: function ()
    {

        this.face = this.add.image(400, 300, 'face').setScale(3);
        this.snake = this.add.image(400, 300, 'snakes').setScale(0.5);
        this.tile = this.add.image(800, 1000, 'tile').setScale(0.5);
        this.add.text(380,430, 'Start');

        this.input.once('pointerdown', function () {
        
            this.scene.add('main', MainGame, true, { x: 400, y: 300 });

        }, this);

        // window.splashScene = this;
        // window.splashScene.get('Splash').myMethod();
    }

});




