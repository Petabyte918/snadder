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
        
    },

    create: function ()
    {

        this.face = this.add.image(400, 300, 'face');
        this.add.text(0, 0, 'Click to add new Scene');

        this.input.once('pointerdown', function () {
        
            this.scene.add('main', MainGame, true, { x: 400, y: 300 });

        }, this);

        // window.splashScene = this;
        // window.splashScene.get('Splash').myMethod();
    }

});




