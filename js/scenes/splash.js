var Splash = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'Splash',

    initialize:
    
    function Splash ()
    {
        Phaser.Scene.call(this, { key: 'Splash', active: false });
    },

    preload: function ()
    {

        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(340, 840, 320, 50);
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        var loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);
        var percentText = this.make.text({
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);
        var assetText = this.make.text({
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);
        

        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('bg0','assets/images/BG_Decor.png');
        this.load.image('bg1','assets/images/Middle_Decor.png');
        this.load.image('bg2','assets/images/Foreground.png');
        this.load.image('bg3','assets/images/Ground.png');
        
        this.load.image('gamebg1','assets/images/bg_1.png');
        this.load.image('gamebg2','assets/images/bg_2.png');
        this.load.image('gamebg3','assets/images/bg_3.png');
        this.load.image('gamebg4','assets/images/bg_4.png');

        this.load.spritesheet('dice',
            'assets/images/sprites/dice.png',
            {frameWidth:100,frameHeight:100}
        );
        this.load.spritesheet('male', 
            'assets/images/sprites/avators.png',
            { frameWidth: 32, frameHeight: 48 }
        );
        this.load.spritesheet('fairy', 
            'assets/images/sprites/fairy.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        this.load.spritesheet('cobra', 
            'assets/images/sprites/cobras.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        this.load.spritesheet('demon', 
            'assets/images/sprites/demons.png',
            { frameWidth: 48, frameHeight: 48 }
        );
        this.load.spritesheet('coin_sprite', 
            'assets/images/sprites/coin_sprite.png',
            { frameWidth: 50, frameHeight: 50 }
        );
        this.load.spritesheet('portal', 
            'assets/images/sprites/portal.png',
            { frameWidth: 80, frameHeight: 114 }
        );
        this.load.spritesheet('avators', 
            'assets/images/sprites/avators1.png',
            { frameWidth: 577/6, frameHeight: 92 }
        );

        this.load.image('user_pin','assets/images/userpin.png');
        this.load.image('snakes', 'assets/images/snakes0.png');

        this.load.image('icon_back1', 'assets/images/UI/icon_back/1.png');
        this.load.image('icon_back2', 'assets/images/UI/icon_back/2.png');
        this.load.image('icon_back3', 'assets/images/UI/icon_back/3.png');
        this.load.image('icon_back4', 'assets/images/UI/icon_back/4.png');
        this.load.image('icon_back5', 'assets/images/UI/icon_back/5.png');
        this.load.image('icon_back6', 'assets/images/UI/icon_back/6.png');
        this.load.image('icon_back7', 'assets/images/UI/icon_back/7.png');

        this.load.image('btn_blank','assets/images/UI/btn/01.png');
        this.load.image('btn_about','assets/images/UI/btn/about.png');
        this.load.image('btn_close','assets/images/UI/btn/close.png');
        this.load.image('btn_close1','assets/images/UI/btn/close_2.png');
        this.load.image('btn_faq','assets/images/UI/btn/faq.png');
        this.load.image('btn_leader','assets/images/UI/btn/leader.png');
        this.load.image('btn_menu','assets/images/UI/btn/menu.png');
        this.load.image('btn_misic','assets/images/UI/btn/misic.png');
        // this.load.image('btn_misic_off','assets/images/UI/btn/misic_off.png');
        this.load.image('btn_next','assets/images/UI/btn/next.png');
        this.load.image('btn_ok','assets/images/UI/btn/ok.png');
        this.load.image('btn_pause','assets/images/UI/btn/pause.png');
        this.load.image('btn_play','assets/images/UI/btn/play.png');
        this.load.image('btn_prew','assets/images/UI/btn/prew.png');
        this.load.image('btn_prize','assets/images/UI/btn/prize.png');
        this.load.image('btn_restart','assets/images/UI/btn/restart.png');
        this.load.image('btn_settings','assets/images/UI/btn/settings.png');
        this.load.image('btn_shop','assets/images/UI/btn/shop.png');
        this.load.image('btn_sound','assets/images/UI/btn/sound.png');
        this.load.image('btn_sound_off','assets/images/UI/btn/sound_off.png');
        this.load.image('btn_upgrade','assets/images/UI/btn/upgrade.png');

        this.load.image('popupBG','assets/images/UI/settings/bg.png');
        this.load.image('popupBG0','assets/images/UI/settings/table.png');
        this.load.image('popupBG1','assets/images/UI/settings/92.png');
        this.load.image('popupBG3','assets/images/UI/level_select/header.png');

        this.load.image('wood_down','assets/images/UI/bubble/down.png');
        this.load.image('wood_down1','assets/images/UI/match3/down.png');
        this.load.image('wood_up','assets/images/UI/bubble/up.png');
        this.load.image('wood_up1','assets/images/UI/match3/up.png');

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
        this.load.image('snake_potion','assets/images/icons/potions3.png');
        this.load.image('demon_potion','assets/images/icons/potions10.png');
        this.load.image('heart','assets/images/icons/heart.png');
        this.load.image('hammer', 'assets/images/icons/10.png');
        this.load.image('lock_key', 'assets/images/icons/5.png');
        this.load.image('badge', 'assets/images/icons/7.png');


        this.load.bitmapFont('fire','assets/fonts/bitmap/azo-fire.png','assets/fonts/bitmap/azo-fire.xml');
        this.load.bitmapFont('green','assets/fonts/bitmap/shortStack.png','assets/fonts/bitmap/shortStack.xml');
    
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');


        // audios
        this.load.audio('music0',['assets/audio/music/music0.mp3']);
        this.load.audioSprite('ui_sfx','assets/audio/UI_sounds/sounds.json',['assets/audio/UI_sounds/sounds.mp3']);
        this.load.audioSprite('ui_button','assets/audio/UI_sounds/button.json',['assets/audio/UI_sounds/button.mp3']);

        this.load.json('questionsData', 'assets/levels/questions.json');
        this.load.json('tilesData', 'assets/levels/tiles.json');

        this.load.on('progress', function (value) {
            // console.log(value);
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(350, 850, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });
                    
        this.load.on('fileprogress', function (file) {
            // console.log(file.src);
            assetText.setText('Loading asset: ' + file.key);
            // assetText.setText('Loading asset: ' + file.src);
        });
         
        this.load.on('complete', function () {
            // console.log('complete');
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });
    
    },

    create: function ()
    {
        this.input.setDefaultCursor('url(assets/cursors/SC2-cursor-protoss.cur), pointer');

        // var spritemap = this.cache.json.get('ui_sfx').spritemap;
        // console.log(spritemap);
        this.add.image(window.gameDescriptor.screenWidth/2, 900, 'sky').setScale(1.7);
        this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg0').setScale(1.7);
        this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg1').setScale(1.7);
        this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg2').setScale(1.7);
        this.add.image(window.gameDescriptor.screenWidth/2, 1210, 'bg3').setScale(1);

        this.snake = this.add.image(480, 900, 'snakes').setScale(0.7);
        // this.add.text(330, 1100,'START', { font: '100px Arial', fill: '#fff'});
        this.play = this.add.image(480,1200,'btn_play');
        this.play.setInteractive();
        this.play.setDataEnabled();
        this.play.data.set('hint','Click to Start');
        this.play.on('over',this.showHint,this)
        this.snadder = this.add.dynamicBitmapText(960/2,500,'fire','LOVELUDO',128).setOrigin(0.5,0.5);
        // this.snadder.setDisplayCallback(this.waveAnimation,this.phase);
        this.loadGamedata();
        var qs = this.cache.json.get('questionsData');
        var ts = this.cache.json.get('tilesData');

        window.gameDescriptor.questions = qs.questions;
        window.gameDescriptor.tiles = ts.tiles;

        this.input.once('pointerdown', function () {
            // this.scene.start("GameMain");
        }, this);
        
        // var add = this.add;
        // WebFont.load(WebFontConfig);
        // this.load.on('webfontactive', function(fileObj, familyName){
        //     console.log('Fuckkkk');
        // });

        //     google: {
        //         families: [ 'Freckle Face', 'Finger Paint', 'Nosifer' ,'Noto Sans', 'sans-serif']
        //     },
        //     active: function ()
        //     {
        //         add.text(16, 0, 'अगर हाँ तो वे कितने बच्चों की कल्पना किये थे?', { fontFamily: 'Noto Sans', fontSize: 80, color: '#ffffff' }).setShadow(2, 2, "#333333", 2, false, true);
        //         add.text(250, 450, 'Waves flung themselves\nat the blue evening.', { fontFamily: 'Finger Paint', fontSize: 40, color: '#5656ee' });

        //         var t = add.text(330, 200, 'R.I.P', { fontFamily: 'Nosifer', fontSize: 150, color: '#ff3434' });

        //         // input.once('pointerdown', function () {
        //         //     t.setFontSize(64);
        //         // });
        //     }
        // });
        // let message = createSpeechBubble(this,0, 100, 520, 160, 'right',"Another message from instructor");
        // message.setInteractive({ cursor: 'url(assets/cursors/SC2-helpsel-protoss.cur), pointer' });
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            this.sound.playAudioSprite('ui_sfx', 'game-start');
            if(window.gameDescriptor.avator == '' || window.gameDescriptor.avator == null){
                // this.scene.add('RapidTask', RapidTask, true, { x: 400, y: 300 });
                // this.scene.transition({
                //     target: 'RapidTask',
                //     duration: 1000,
                //     moveBelow: true,
                //     // onUpdate: this.transitionOut,
                //     data: { x: 400, y: 300 }
                // });
                
                this.scene.start('Avator');
            }else{
                this.scene.start('Dashboard');
            }
        }, this);
        this.input.on('gameobjectdown', function (pointer, gameObject)
        {
            this.sound.playAudioSprite('ui_button', 'button4');
        }, this);
        this.input.on('gameobjectover', function (pointer, gameObject)
        {
            gameObject.setTint('0x56f787');
            gameObject.emit('over', gameObject);

        });
        this.input.on('gameobjectout', function (pointer, gameObject)
        {
            gameObject.setTint('0xffffff');
        });

        // window.splashScene = this;
        // window.splashScene.get('Splash').myMethod();
    },
    transitionOut: function (progress)
    {
        // this.scene.y = (600 * progress);
    },
    // waveAnimation:function(data,phase){
    //     console.log("d",data);
    //     data.y = parseInt(Math.cos(phase+0.5) *10);
    //     console.log(Math.cos(0),phase);
    //     phase += 0.01;
    //     // return data;
    // },
    // update:function(){
        
    // }
    loadGamedata:function(){
        var file = getGameData();
        // console.log(">>"+file.gamefile);
        if(file != null && file != 'undeifned'){
            window.gameDescriptor = file;
        }
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
            y -= height+(object.height/2);
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




