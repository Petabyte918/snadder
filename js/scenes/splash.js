var Splash = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'Splash',
    phase: 0,
    num:20,

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
        window.gameDescriptor = {
            WIDTH:document.documentElement.clientWidth,
            HEIGHT:document.documentElement.clientHeight,
            camWidth:width,
            camHeight:height,
        };

        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('bg0','assets/images/BG_Decor.png');
        this.load.image('bg1','assets/images/Middle_Decor.png');
        this.load.image('bg2','assets/images/Foreground.png');
        this.load.image('bg3','assets/images/Ground.png');

        this.load.image('snakes', 'assets/images/snakes0.png');

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

        this.load.bitmapFont('fire','assets/fonts/bitmap/azo-fire.png','assets/fonts/bitmap/azo-fire.xml');
        this.load.bitmapFont('green','assets/fonts/bitmap/shortStack.png','assets/fonts/bitmap/shortStack.xml');
    
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
        

        this.add.image(window.gameDescriptor.WIDTH/2, 900, 'sky').setScale(1.7);
        this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg0').setScale(1.7);
        this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg1').setScale(1.7);
        this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg2').setScale(1.7);
        this.add.image(window.gameDescriptor.WIDTH/2, 1210, 'bg3').setScale(1);

        this.snake = this.add.image(480, 900, 'snakes').setScale(0.7);
        // this.add.text(330, 1100,'START', { font: '100px Arial', fill: '#fff'});
        this.add.image(480,1200,'btn_play');
        this.snadder = this.add.dynamicBitmapText(150,500,'fire','SNADDER',128);
        // this.snadder.setDisplayCallback(this.waveAnimation,this.phase);
        
        this.input.once('pointerdown', function () {
        
            this.scene.add('Avator', Avator, true, { x: 400, y: 300 });

        }, this);


        // window.splashScene = this;
        // window.splashScene.get('Splash').myMethod();
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


});




