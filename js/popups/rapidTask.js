var RapidTask = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'RapidTask',
    userPin:null,
    initialize:

    function RapidTask ()
    {
        Phaser.Scene.call(this, { key: 'RapidTask', active: false });
    },

    preload: function ()
    {
        
        this.load.image('snake_large','assets/images/snake-large.png');
        this.load.image('failbg','assets/images/failbg.jpg');

    },
    create: function(){


        
        

    }

});