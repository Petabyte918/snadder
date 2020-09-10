var Levels = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'Levels',
    initialize:

    function Levels ()
    {
        Phaser.Scene.call(this, { key: 'Levels', active: false });
    },

    preload: function ()
    {
        
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
        

    },

    create: function ()
    {

        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'sky').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg0').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg1').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 1210, 'bg3').setScale(1);

        this.level_close = this.add.image(900,80,'btn_close').setScale(0.4);
        this.level_menu = this.add.image(80,80,'btn_menu').setScale(0.4);
        this.level_menu.setInteractive();
        this.level_menu.on('click',this.gotoMenu,this);
        
        this.add.dynamicBitmapText(250,100,'fire','SELECT LEVEL',60);

        this.add.image(500,870,'popupBG').setScale(0.6,1);
        this.add.image(500,820,'popupBG0').setScale(0.6,0.85);
      
        for(let i = 0,j=0,k=0;i<window.gameDescriptor.levels.length;i++){
            if(i%3 == 0){
                j +=200;
                k=0;
            }
            k++;
            this.level_num =  this.add.image(100+ (k*200),400+j,'popupBG4').setScale(0.5);
            this.level_num.setInteractive();
            this.level_num.on('click',this.startLevel,this,window.gameDescriptor.levels[i].id);
            this.level_num.setDataEnabled();
            this.level_num.data.set('id',window.gameDescriptor.levels[i].id);
            this.level_num.data.set('state',window.gameDescriptor.levels[i].state);

            if(window.gameDescriptor.levels[i].state == 'locked'){
                this.add.image(100+ (k*200),400+j,'lock').setScale(0.5);
            }
            else{
                 this.add.dynamicBitmapText(75+(k*200),350+j,'fire',window.gameDescriptor.levels[i].id,75);
                // window.gameDescriptor.selectedLevel = window.gameDescriptor.levels[i].id;
            }
        }

        this.add.image(300,1220,'btn_prew').setScale(0.5);
        this.add.image(400,1220,'dotGreen').setScale(0.5);
        this.add.image(500,1220,'dotGrey').setScale(0.5);
        this.add.image(600,1220,'dotGrey').setScale(0.5);
        this.add.image(700,1220,'btn_next').setScale(0.5);


        this.add.image(500,450,'popupBG3').setScale(0.6);

        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            
            if(gameObject.data){
                if(gameObject.data.get('state') != 'locked'){
                    window.gameDescriptor.selectedLevel = gameObject.data.get('id');
                    this.scene.start("GameMain");
                }
            }else{
                gameObject.emit('click', gameObject);
            }
        }, this);
    },
    startLevel:function(a,b){
        console.log("Level started",this);
        // this.scene.start('MainGame');
    },
    gotoMenu:function(){
        this.scene.start('Dashboard');
    }

});




