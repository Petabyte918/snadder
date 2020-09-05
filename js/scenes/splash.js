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
        this.load.image('sky', 'assets/images/sky.png');
        this.load.image('bg0','assets/images/BG_Decor.png');
        this.load.image('bg1','assets/images/Middle_Decor.png');
        this.load.image('bg2','assets/images/Foreground.png');
        this.load.image('bg3','assets/images/Ground.png');

        this.load.image('tile', 'assets/images/tile.png');
        this.load.image('snakes', 'assets/images/snakes0.png');

        this.load.image('play','assets/images/UI/btn/play.png');

        this.load.bitmapFont('fire','assets/fonts/bitmap/azo-fire.png','assets/fonts/bitmap/azo-fire.xml');
        this.load.bitmapFont('green','assets/fonts/bitmap/shortStack.png','assets/fonts/bitmap/shortStack.xml');
    },

    create: function ()
    {
        window.gameDescriptor = {
            WIDTH:document.documentElement.clientWidth,
            HEIGHT:document.documentElement.clientHeight,
        };
        this.phase = 90;

        this.face = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'sky').setScale(1.7);
        this.face = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg0').setScale(1.7);
        this.face = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg1').setScale(1.7);
        this.face = this.add.image(window.gameDescriptor.WIDTH/2, 900, 'bg2').setScale(1.7);
        this.face = this.add.image(window.gameDescriptor.WIDTH/2, 1210, 'bg3').setScale(1);

        this.snake = this.add.image(480, 900, 'snakes').setScale(0.7);
        // this.add.text(330, 1100,'START', { font: '100px Arial', fill: '#fff'});
        this.add.image(480,1200,'play');
        this.snadder = this.add.dynamicBitmapText(150,500,'fire','SNADDER',128);
        this.snadder.setDisplayCallback(this.waveAnimation,this.phase);
        
        this.input.once('pointerdown', function () {
        
            this.scene.add('Avator', Avator, true, { x: 400, y: 300 });

        }, this);

        console.log(this.num)

        // window.splashScene = this;
        // window.splashScene.get('Splash').myMethod();
    },
    waveAnimation:function(data,phase){
        console.log("d",data);
        data.y = parseInt(Math.cos(phase+0.5) *10);
        console.log(Math.cos(0),phase);
        phase += 0.01;
        // return data;
    },
    update:function(){
        
    }


});




