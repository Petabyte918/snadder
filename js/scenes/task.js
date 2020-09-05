var Task = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'Task',
    initialize:

    function Task ()
    {
        Phaser.Scene.call(this, { key: 'Task', active: false });
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
        this.load.image('prev','assets/images/UI/btn/prew.png');
        this.load.image('next','assets/images/UI/btn/next.png');


        this.load.image('popupBG','assets/images/UI/settings/bg.png');
        this.load.image('popupBG0','assets/images/UI/level_select/table2.png');
        this.load.image('popupBG1','assets/images/UI/settings/92.png');
        this.load.image('popupBG2','assets/images/UI/rating/face.png');
        this.load.image('popupBG3','assets/images/UI/level_select/header.png');
        this.load.image('popupBG4','assets/images/UI/level_select/table.png');
        this.load.image('popupBG5','assets/images/UI/level_select/dot_d.png');
        this.load.image('lock','assets/images/UI/level_select/lock.png');
        this.load.image('dotGreen','assets/images/UI/level_select/dot_a.png');
        this.load.image('dotGrey','assets/images/UI/level_select/dot_d.png');
        
        this.load.bitmapFont('ice','assets/fonts/bitmap/azo-fire.png','assets/fonts/bitmap/azo-fire.xml')

    },

    create: function ()
    {

        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'sky').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg0').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg1').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 1210, 'bg3').setScale(1);

        this.close = this.add.image(900,80,'close').setScale(0.4);
        this.close = this.add.image(80,80,'menu').setScale(0.4);
        this.add.dynamicBitmapText(250,100,'ice','SELECT LEVEL',60);

        this.add.image(500,870,'popupBG').setScale(0.6,1);
        this.add.image(500,820,'popupBG0').setScale(0.6,0.85);
      
        for(let i = 0,j=0,k=0;i<9;i++){
            if(i%3 == 0){
                j +=200;
                k=0;
            }
            k++;
            this.add.image(100+ (k*200),400+j,'popupBG4').setScale(0.5);
            this.add.image(100+ (k*200),400+j,'lock').setScale(0.5);
        }

        this.add.image(300,1220,'prev').setScale(0.5);
        this.add.image(400,1220,'dotGreen').setScale(0.5);
        this.add.image(500,1220,'dotGrey').setScale(0.5);
        this.add.image(600,1220,'dotGrey').setScale(0.5);
        this.add.image(700,1220,'next').setScale(0.5);


        this.add.image(500,450,'popupBG3').setScale(0.6);

        // this.add.dynamicBitmapText(300,800,'ice','Male',30);
        // this.add.dynamicBitmapText(590,800,'ice','Female',30);

        // this.input.once('pointerdown', function () {
        
        //     this.scene.add('main', MainGame, true, { x: 400, y: 300 });

        // }, this);

        // window.splashScene = this;
        // window.splashScene.get('Splash').myMethod();
    }

});




