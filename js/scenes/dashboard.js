var Dashboard = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'Dashboard',
    initialize:

    function Dashboard ()
    {
        Phaser.Scene.call(this, { key: 'Dashboard', active: false });
    },

    preload: function ()
    {
       
        this.load.image('popupBG','assets/images/UI/settings/bg.png');
        this.load.image('popupBG0','assets/images/UI/settings/table.png');
        this.load.image('popupBG1','assets/images/UI/settings/92.png');
        this.load.image('popupBG3','assets/images/UI/level_select/header.png');
        this.load.image('face','assets/images/UI/rating/face.png');
        
        this.load.image('wood_down','assets/images/UI/bubble/down.png');
        this.load.image('wood_up','assets/images/UI/bubble/up.png');
        this.load.image('wood_table','assets/images/UI/bubble/table.png');
        this.load.image('wood_level_text','assets/images/UI/bubble/level.png');
        this.load.image('wood_clock','assets/images/UI/bubble/clock.png');
        this.load.image('wood_bgload','assets/images/UI/bubble/bgload.png');
        this.load.image('wood_load','assets/images/UI/bubble/load.png');
        this.load.image('wood_star1','assets/images/UI/bubble/star_1.png');
        this.load.image('wood_star2','assets/images/UI/bubble/star_2.png');
        this.load.image('wood_star3','assets/images/UI/bubble/star_3.png');
        this.load.image('wood_btn','assets/images/UI/bubble/btn_1.png');

        this.load.image('coins','assets/images/icons/3.png');
        this.load.image('cup','assets/images/icons/4.png');
        this.load.image('love_potion','assets/images/icons/potions5.png');
        this.load.image('hammer','assets/images/icons/10.png');


    },

    create: function ()
    {

        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'sky').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg0').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg1').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 1210, 'bg3').setScale(1);

        this.add.image(500,100,'wood_up').setScale(0.65,1);
        this.close = this.add.image(880,80,'btn_close').setScale(0.4);
        this.close = this.add.image(100,80,'btn_menu').setScale(0.4);

        this.add.dynamicBitmapText(270,30,'fire','DASHBOARD',60);

        this.add.image(500,1680,'wood_down').setScale(0.65);
        
        this.add.image(170,1700,'wood_table').setScale(1,0.8);
        this.add.image(100,1700,'coins').setScale(0.15);
        this.add.dynamicBitmapText(150,1675,'fire','99999',35);


        this.add.image(700,1700,'wood_btn').setScale(0.6);
        this.add.image(800,1700,'wood_btn').setScale(0.6);
        this.add.image(900,1700,'wood_btn').setScale(0.6);
        this.add.image(700,1700,'love_potion').setScale(0.2);
        this.add.image(800,1700,'cup').setScale(0.2);
        this.add.image(900,1700,'hammer').setScale(0.2);


      


        this.add.image(500,770,'popupBG').setScale(0.6,0.8);
        this.add.image(500,770,'popupBG0').setScale(0.6,0.8);
        
        this.add.image(500,450,'popupBG3').setScale(0.6);


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




