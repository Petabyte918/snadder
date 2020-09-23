var TileFeature = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'TileFeature',
    userPin:null,
    initialize:

    function TileFeature ()
    {
        Phaser.Scene.call(this, { key: 'TileFeature', active: false });
    },

    preload: function ()
    {
        
        this.load.image('snake_large','assets/images/snake-large.png');
        this.load.image('failbg','assets/images/failbg.jpg');

    },
    create: function(){


        this.punish_bg = this.add.image(980/2, 1742/2,'failbg').setScale(3.5,5.5);
        this.punish_t1 = this.add.dynamicBitmapText(980/2-125,500,'green','Ooops..',80);
        this.punish_t2 = this.add.dynamicBitmapText(980/2-420,600,'green','Take the punishment',70);
        
        this.punish_btn = this.add.image(980/2,950,'btn_ok').setOrigin(0.5,1);
        this.punish_btn.setInteractive();
        this.punish_btn.on('click',this.startPunishment);
        this.punish_feature = null;
        
        if(window.gameDescriptor.actionType == 'cobra'){
            this.punish_feature = this.add.image(980/2, 1742,'snake_large')
                            .setOrigin(0.5,1);
        }
        

    }

}