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
        this.load.image('popupBG','assets/images/UI/settings/bg.png');
        this.load.image('popupBG0','assets/images/UI/settings/table.png');
        this.load.image('popupBG1','assets/images/UI/settings/92.png');
        this.load.image('popupBG3','assets/images/UI/level_select/header.png');
        this.load.image('face','assets/images/UI/rating/face.png');

    },

    create: function ()
    {

        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'sky').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg0').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg1').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 1210, 'bg3').setScale(1);

        this.close = this.add.image(900,80,'btn_close').setScale(0.4);
        // this.menu = this.add.image(80,80,'btn_menu').setScale(0.4);
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
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('click', gameObject);
        });

    },
    selectFemale:function(){
        window.gameDescriptor.avator = 'female';
        this.registry.set('avator','female');
        this.scene.start('Dashboard');
    },
    selectMale:function(){
        window.gameDescriptor.avator = 'male';
        this.registry.set('avator','male');
        this.scene.start('Dashboard');
    }

});




