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
        
        this.close = this.add.image(900,80,'btn_close').setScale(0.4);
        this.close.setInteractive();
        this.close.setDataEnabled();
        this.close.data.set('hint','Quit game');
        this.close.on('over',this.showHint,this);
        
        this.menu = this.add.image(100,80,'btn_menu').setScale(0.4);
        this.menu.setInteractive();
        this.menu.setDataEnabled();
        this.menu.data.set('hint','Open menu');
        this.menu.on('over',this.showHint,this);

        this.add.dynamicBitmapText(270,30,'fire','DASHBOARD',60);

        this.add.image(500,1680,'wood_down1').setScale(0.65);
        
        this.add.image(170,1700,'wood_table').setScale(1,0.8);
        this.coins = this.add.image(100,1700,'coins').setScale(0.15);
        this.coins.setInteractive();
        this.coins.setDataEnabled();
        this.coins.data.set('hint','These are your gold coins');
        this.coins.on('over',this.showHint,this);
        this.add.dynamicBitmapText(150,1677,'fire',window.gameDescriptor.coins,35);
    
        this.add.image(600,1700,'wood_btn').setScale(0.6);
        this.add.image(700,1700,'wood_btn').setScale(0.6);
        this.add.image(800,1700,'wood_btn').setScale(0.6);
        this.add.image(900,1700,'wood_btn').setScale(0.6);

        this.heartBtn = this.add.image(600,1700,'heart').setScale(0.18).setScrollFactor(0).setInteractive().setDataEnabled();
        this.heartBtn.data.set('assetName','heart');
        this.heartBtn.data.set('hint','These are your herts');
        this.heartBtn.on('over',this.showHint,this);
        // this.snakeCoverBtn.on('click',this.blastSnakes,this);
        
        this.snakeCoverBtn = this.add.image(700,1700,'snake_potion').setScale(0.2).setScrollFactor(0).setInteractive().setDataEnabled();
        this.snakeCoverBtn.data.set('assetName','snake_cover');
        this.snakeCoverBtn.data.set('hint','protects you from snakes');
        this.snakeCoverBtn.on('over',this.showHint,this);
        // this.snakeCoverBtn.on('click',this.blastSnakes,this);
        
        this.demonCoverBtn = this.add.image(800,1700,'demon_potion').setScale(0.2).setScrollFactor(0).setInteractive().setDataEnabled();
        this.demonCoverBtn.data.set('assetName','demon_cover');
        this.demonCoverBtn.data.set('hint','protects you from demons');
        this.demonCoverBtn.on('over',this.showHint,this);
        // this.demonCoverBtn.on('click',this.blastDemons,this);

        this.freezeCoverBtn = this.add.image(900,1700,'hammer').setScale(0.2).setScrollFactor(0).setInteractive().setDataEnabled();
        this.freezeCoverBtn.data.set('assetName','snake_cover');
        this.freezeCoverBtn.data.set('hint','Breaks the ice');
        this.freezeCoverBtn.on('over',this.showHint,this);
        // this.heartsBtn.on('click',this.BlastDemons,this);

        this.hearts = this.add.dynamicBitmapText(620,1700,'fire',window.gameDescriptor.hearts,40).setScrollFactor(0);
        this.snakeCover = this.add.dynamicBitmapText(720,1700,'fire',getBoonQtyFromInventory('snake_cover'),40).setScrollFactor(0);
        this.demonCover = this.add.dynamicBitmapText(820,1700,'fire',getBoonQtyFromInventory('demon_cover'),40).setScrollFactor(0);
        this.freezeCover = this.add.dynamicBitmapText(920,1700,'fire',getBoonQtyFromInventory('hammer'),40).setScrollFactor(0);
        

        this.add.image(500,800,'popupBG').setScale(0.6,0.9);
        this.add.image(500,800,'popupBG0').setScale(0.6,0.9);
        // this.add.image(500,450,'popupBG3').setScale(0.6);
        
        this.game = this.add.image(350,650,'wood_table').setScale(1,3);
        this.game.setInteractive();
        this.game.setDataEnabled();
        this.game.data.set('hint','Start the Game');
        this.game.on('over',this.showHint,this);
        this.game.on('click',this.selectLevel,this);
        this.add.image(350,650,'btn_leader').setScale(0.8);

        this.match = this.add.image(650,650,'wood_table').setScale(1,3);
        this.match.setInteractive();
        this.match.setDataEnabled();        
        this.match.data.set('hint','Tell your Likes and dislikes');
        this.match.on('over',this.showHint,this);
        this.match.on('click',this.selectMatch,this);
        this.add.image(650,650,'heart').setScale(0.3);

        this.upgrades = this.add.image(350,930,'wood_table').setScale(1,3);
        this.upgrades.setInteractive();
        this.upgrades.setDataEnabled();       
        this.upgrades.data.set('hint','Your treasure');
        this.upgrades.on('over',this.showHint,this);
        this.upgrades.on('click',this.selectUpgrades,this);
        this.add.image(350,930,'cup').setScale(0.3);

        this.shop = this.add.image(650,930,'wood_table').setScale(1,3);
        this.shop.setInteractive();
        this.shop.setDataEnabled();        
        this.shop.data.set('hint','Game Shop where you can buy powers and wapons');
        this.shop.on('over',this.showHint,this);
        this.shop.on('click',this.selectShop,this);

        this.add.dynamicBitmapText(280,770,'green','Game',35);
        this.add.dynamicBitmapText(600,770,'green','Match',35);
        this.add.dynamicBitmapText(250,1050,'green','Inventory',35);
        this.add.dynamicBitmapText(600,1050,'green','shop',35);

        this.input.on('gameobjectdown', function (pointer, gameObject)
        {
            this.sound.playAudioSprite('ui_button', 'button4');
        }, this);
        this.input.on('gameobjectover', function (pointer, gameObject)
        {
            gameObject.setTint('0x56f787');
            gameObject.emit('over',gameObject);
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
    },
    showHint:function(object){
        let dir = 'bottom';
        let arrowDir = 'left';
        let x = object.x;
        let y = object.y;
        let width = object.width*object._scaleX*2;
        let height = 100*object._scaleY;

        if(height <80)height = 80;

        if(object.x > WIDTH/3 && object.x < ((WIDTH/3)*2) ){
            arrowDir = 'center';
            x -= width/2;
            y -= height;
        }else if(object.x > ((WIDTH/3)*2)){
            arrowDir = 'right';
            x -= width;
        }

        if(object.y < HEIGHT/4){
            dir = 'top';
            y += height/2;
        }else if(object.y > ((HEIGHT/4)*3) ){
            y -= height;            
        }

        if(height >180)height=180;
        
        let message = createSpeechBubble(this,x,y ,width, height, arrowDir,dir,object.data.get('hint'));
        setTimeout((message)=>{
            message[0].setVisible(false);
            message[1].setVisible(false);
        },5000,message);
    }

});




