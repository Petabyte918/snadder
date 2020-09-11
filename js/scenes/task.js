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
        
       

        this.load.image('popupBG','assets/images/UI/settings/bg.png');
        this.load.image('popupBG0','assets/images/UI/level_select/table2.png');
        this.load.image('popupBG1','assets/images/UI/settings/92.png');
        this.load.image('popupBG2','assets/images/UI/rating/face.png');
        this.load.image('popupBG3','assets/images/UI/level_select/header.png');
        this.load.image('popupBG4','assets/images/UI/level_select/table.png');
        

    },

    create: function ()
    {

        this.add.image(500,870,'popupBG').setScale(0.6,1.3);
        this.add.image(500,820,'popupBG0').setScale(0.6,1.3);
        
        this.optionsText=[];
        for(let i = 0,j=0,k=0;i<6;i++){
            if(i%2 == 0){
                j +=230;
                k=0;
            }
            k++;
            this.add.image(100+ (k*260),480+j,'popupBG4').setScale(0.75);
            var txt = this.add.dynamicBitmapText(100+ (k*200),400+j,'green','abcd',35);

            this.optionsText.push(txt);
        }
        this.add.image(500,350,'popupBG3').setScale(0.6);
        this.close = this.add.image(800,370,'btn_close1').setScale(0.8);



        this.question = this.add.dynamicBitmapText(280,450,'green','',35);
        this.question.setText(window.gameDescriptor.questions[0].q);
    }

});




