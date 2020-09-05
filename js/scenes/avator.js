var Avator = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'Avator',
    initialize:

    function Avator ()
    {
        Phaser.Scene.call(this, { key: 'Avator', active: false });
    },

    preload: function ()
    {
        
        // this.load.image('sky', 'assets/images/sky.png');
        // this.load.image('bg0','assets/images/BG_Decor.png');
        // this.load.image('bg1','assets/images/Middle_Decor.png');
        // this.load.image('bg2','assets/images/Foreground.png');
        // this.load.image('bg3','assets/images/Ground.png');

        this.load.image('close','assets/images/UI/btn/close.png');
        this.load.image('close1','assets/images/UI/btn/misic.png');
        this.load.image('close1','assets/images/UI/btn/misic_off.png');
        this.load.image('menu','assets/images/UI/btn/menu.png');


        this.load.image('popupBG','assets/images/UI/settings/bg.png');
        this.load.image('popupBG0','assets/images/UI/settings/table.png');
        this.load.image('popupBG1','assets/images/UI/settings/92.png');
        this.load.image('popupBG3','assets/images/UI/level_select/header.png');
        this.load.image('face','assets/images/UI/rating/face.png');
        

    },

    create: function ()
    {

        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'sky').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg0').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg1').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 1210, 'bg3').setScale(1);

        this.close = this.add.image(900,80,'close').setScale(0.4);
        this.close = this.add.image(80,80,'menu').setScale(0.4);
        this.add.dynamicBitmapText(190,100,'fire','SELECT AVATOR',60);

        this.add.image(500,770,'popupBG').setScale(0.6,0.8);
        this.add.image(500,770,'popupBG0').setScale(0.6,0.8);
        this.male = this.add.image(350,700,'face').setScale(1);
        this.male.setInteractive();
        this.male.on('click',this.selectMale,this);
        this.female = this.add.image(650,700,'face').setScale(1);
        this.female.setInteractive();
        this.female.on('click',this.selectFemale,this);
        
        this.add.image(500,450,'popupBG3').setScale(0.6);

        this.add.dynamicBitmapText(300,800,'green','Male',30);
        this.add.dynamicBitmapText(590,800,'green','Female',30);

        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('click', gameObject);
        }, this);

        // this.input.once('pointerdown', function () {
        
        //     this.scene.add('Levels', Levels, true, { x: 100, y: 300 });

        // }, this);

        // window.splashScene = this;
        // window.splashScene.get('Splash').myMethod();
    },
    selectFemale:function(){
        this.scene.add('Levels', Levels, true, { x: 100, y: 300 });

    },
    selectMale:function(){
        this.scene.add('Levels', Levels, true, { x: 100, y: 300 });
    }

});




