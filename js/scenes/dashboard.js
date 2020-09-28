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

    },

    create: function ()
    {

        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'sky').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg0').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg1').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 1210, 'bg3').setScale(1);

        this.add.image(500,100,'wood_up').setScale(0.65,1);
        this.close = this.add.image(880,80,'btn_close').setScale(0.4);
        this.close = this.add.image(100,80,'btn_settings').setScale(0.4);

        this.add.dynamicBitmapText(270,30,'fire','DASHBOARD',60);

        this.add.image(500,1680,'wood_down').setScale(0.65);
        
        this.add.image(170,1700,'wood_table').setScale(1,0.8);
        this.add.image(100,1700,'coins').setScale(0.15);
        this.add.dynamicBitmapText(150,1677,'fire',window.gameDescriptor.coins,35);


        this.add.image(700,1700,'wood_btn').setScale(0.6);
        this.add.image(800,1700,'wood_btn').setScale(0.6);
        this.add.image(900,1700,'wood_btn').setScale(0.6);
        this.add.image(700,1700,'snake_potion').setScale(0.2);
        this.add.image(800,1700,'demon_potion').setScale(0.2);
        this.add.image(900,1700,'heart').setScale(0.18);


        this.add.image(500,800,'popupBG').setScale(0.6,0.9);
        this.add.image(500,800,'popupBG0').setScale(0.6,0.9);
        // this.add.image(500,450,'popupBG3').setScale(0.6);
        
        this.game = this.add.image(350,650,'wood_table').setScale(1,3);
        this.game.setInteractive();
        this.game.on('click',this.selectLevel,this);
        
        this.match = this.add.image(650,650,'wood_table').setScale(1,3);
        this.match.setInteractive();
        this.match.on('click',this.selectMatch,this);

        this.upgrades = this.add.image(350,930,'wood_table').setScale(1,3);
        this.upgrades.setInteractive();
        this.upgrades.on('click',this.selectUpgrades,this);

        this.shop = this.add.image(650,930,'wood_table').setScale(1,3);
        this.shop.setInteractive();
        this.shop.on('click',this.selectShop,this);

        this.add.dynamicBitmapText(280,770,'green','Game',35);
        this.add.dynamicBitmapText(600,770,'green','Match',35);
        this.add.dynamicBitmapText(250,1050,'green','Upgrades',35);
        this.add.dynamicBitmapText(600,1050,'green','shop',35);

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

    selectLevel:function(){
        this.scene.start('Levels');
    },
    selectShop:function(){
        this.scene.start('Shop');
    },
    selectUpgrades:function(){
        this.scene.start('Upgrades');
    },
    selectMatch:function(){
        this.scene.start('Match');
    }

});




