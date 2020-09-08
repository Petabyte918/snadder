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
        
        this.load.image('popupBG','assets/images/UI/settings/bg.png');
        this.load.image('popupBG0','assets/images/UI/level_select/table2.png');
        this.load.image('popupBG1','assets/images/UI/settings/92.png');
        this.load.image('popupBG2','assets/images/UI/rating/face.png');
        this.load.image('popupBG30','assets/images/UI/shop/header.png');
        this.load.image('popupBG40','assets/images/UI/shop/4.png');
        this.load.image('popupBG50','assets/images/UI/shop/btn.png');
        this.load.image('lock','assets/images/UI/level_select/lock.png');
        this.load.image('dotGreen','assets/images/UI/level_select/dot_a.png');
        this.load.image('dotGrey','assets/images/UI/level_select/dot_d.png');
        

    },

    create: function ()
    {

        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'sky').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg0').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg1').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.WIDTH/2, 1210, 'bg3').setScale(1);

        this.shop_close = this.add.image(900,80,'btn_close').setScale(0.4);
        
        this.shop_menu = this.add.image(80,80,'btn_menu').setScale(0.4);
        this.shop_menu.setInteractive();
        // this.shop_menu.on('click',this.gotoMenu,this);
        this.shop_menu.on('click',this.gotoMenu,this);

        this.add.image(500,870,'popupBG').setScale(0.6,1);
        this.add.image(500,820,'popupBG0').setScale(0.6,0.85);
      
        for(let i = 0,j=0,k=0;i<6;i++){
            if(i%3 == 0){
                j +=290;
                k=0;
            }
            k++;
            this.add.image(100+ (k*200),360+j,'popupBG40').setScale(0.5);
            this.add.image(100+ (k*200),360+j,'love_potion').setScale(0.3);
            this.shop_buy = this.add.image(100+(k*200),510+j,'popupBG50').setScale(0.5);
            this.shop_buy.setInteractive();
            this.shop_buy.on('click',this.gotoMenu,this);
            // this.add.dynamicBitmapText(50+ (k*200),490+j,'fire','$ 1.9',30);
            this.add.text(50+ (k*200),490+j,'$ 1.9', { font: '30px Arial', fill: '#fff' })
        }

        this.add.image(300,1220,'btn_prew').setScale(0.5);
        this.add.image(400,1220,'dotGreen').setScale(0.5);
        this.add.image(500,1220,'dotGrey').setScale(0.5);
        this.add.image(600,1220,'dotGrey').setScale(0.5);
        this.add.image(700,1220,'btn_next').setScale(0.5);


        this.add.image(500,450,'popupBG30').setScale(0.6);


        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('click', gameObject);
        }, this);


        // window.splashScene = this;
        // window.splashScene.get('Splash').myMethod();
    },
    gotoMenu:function(){
        this.scene.start('Dashboard');
    }

});




