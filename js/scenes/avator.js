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

        this.anims.create({
            key: 'male',
            frames: [{key:'avators',frame:0 }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'female',
            frames: [{key:'avators',frame:7 }],
            frameRate: 10,
            repeat: -1
        });
        this.close = this.add.image(900,80,'btn_close').setScale(0.4);
        this.close.setInteractive();
        this.close.setDataEnabled();
        this.close.data.set('hint','Quit game');
        this.close.on('over',this.showHint,this);

        // this.menu = this.add.image(80,80,'btn_menu').setScale(0.4);
        this.add.dynamicBitmapText(190,100,'fire','SELECT AVATOR',60);

        this.add.image(500,770,'popupBG').setScale(0.6,0.8);
        this.add.image(500,770,'popupBG0').setScale(0.6,0.8);
        
        this.male = this.add.sprite(350,700,'avators').setScale(2.5);
        this.male.setInteractive();
        this.male.setDataEnabled();
        this.male.on('click',this.selectMale,this);
        this.male.on('over',this.showHint,this);
        this.male.data.set('hint','Select if you are husband');

        this.female = this.add.sprite(650,700,'avators').setScale(2.5);
        this.female.anims.play('female',true);
        this.female.setInteractive();
        this.female.setDataEnabled();
        this.female.on('click',this.selectFemale,this);
        this.female.on('over',this.showHint,this);
        this.female.data.set('hint','Select if you are wife');
        
        // this.add.image(500,450,'popupBG3').setScale(0.6);

        this.add.dynamicBitmapText(300,830,'green','Pati',30);
        this.add.dynamicBitmapText(590,830,'green','Patni',30);
        var context = this;
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
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('click', gameObject);
        });

    },
    selectFemale:function(){
        window.gameDescriptor.avator = 'female';
        this.registry.set('avator','female');
        setGameData();
        this.scene.start('Dashboard');
    },
    selectMale:function(){
        window.gameDescriptor.avator = 'male';
        this.registry.set('avator','male');
        setGameData();
        this.scene.start('Dashboard');
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




