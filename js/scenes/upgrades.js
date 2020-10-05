var Upgrades = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'Upgrades',
    initialize:

    function Upgrades()
    {
        Phaser.Scene.call(this, { key: 'Upgrades', active: false });
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

        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'sky').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg0').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg1').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 1210, 'bg3').setScale(1);

        this.close = this.add.image(900,80,'btn_close').setScale(0.4);
        this.shop_menu = this.add.image(80,80,'btn_menu').setScale(0.4);
        this.shop_menu.setInteractive();
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
            switch(i){
                case 0:this.add.image(100+ (k*200),360+j,'love_potion').setScale(0.3);break;
                case 1:this.add.image(100+ (k*200),360+j,'snake_potion').setScale(0.3);break;
                case 2:this.add.image(100+ (k*200),360+j,'demon_potion').setScale(0.3);break;
                case 3:this.add.image(100+ (k*200),360+j,'hammer').setScale(0.3);break;
                case 4:this.add.image(100+ (k*200),360+j,'lock_key').setScale(0.3);break;
                case 5:this.add.image(100+ (k*200),360+j,'cup').setScale(0.3);break;
            }
            // this.add.image(100+(k*200),510+j,'popupBG50').setScale(0.5);
            // this.add.dynamicBitmapText(50+ (k*200),490+j,'fire','$ 1.9',30);
            // this.add.text(50+ (k*200),490+j,'$ 1.9', { font: '30px Arial', fill: '#fff' })
        }

        this.add.image(300,1220,'btn_prew').setScale(0.5);
        this.add.image(400,1220,'dotGreen').setScale(0.5);
        this.add.image(500,1220,'dotGrey').setScale(0.5);
        this.add.image(600,1220,'dotGrey').setScale(0.5);
        this.add.image(700,1220,'btn_next').setScale(0.5);


        // this.add.image(500,450,'popupBG30').setScale(0.6);

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
    gotoMenu:function(){
        this.scene.start('Dashboard');
    }

});




