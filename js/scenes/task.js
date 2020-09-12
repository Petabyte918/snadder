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
        
        let question = getQuestion();
        let options = getOptions(question.qid);
        this.question = this.add.dynamicBitmapText(240,400,'green','',35);
        this.question.setText(question.q);
        this.question.setDataEnabled();
        this.question.data.set('qid',question.qid);
        console.log(question,options);
        this.selectedOptions = [];
        this.options = [];
        for(let i = 0,j=0,k=0;i<(options != null?options.length:0);i++){
            if(i%2 == 0){
                j +=250;
                k=0;
            }
            k++;
            let op = this.add.image(100+ (k*260),400+j,'popupBG4').setScale(0.8);
            op.setInteractive();
            op.on('click',this.makeSelected,this);
            op.setDataEnabled();
            op.data.set('opid',options[i].opid);
            this.options.push(op);
            this.add.dynamicBitmapText(60+ (k*270),495+j,'green',options[i].txt,35);
        }
        this.add.image(500,280,'popupBG3').setScale(0.6);
        this.submit = this.add.image(500,1380,'btn_next').setScale(0.8);
        this.submit.setInteractive();
        this.submit.on('click',this.checkSubmit,this);

        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('click', gameObject);
        }, this);
        


    },
    refresh:function(){
        for(let op of this.options){
            op.input.enabled = true;
            op.setTint('0xffffff');
        }
    },
    makeSelected:function(object){
        if(!this.selectedOptions.includes(object.data.get('opid')) ){
            this.selectedOptions.push(object.data.get('opid'));
            object.setTint('0x00ff00');
        }else{
            object.setTint('0xffffff');
            this.selectedOptions.remove(object.data.get('opid'));
        }
        console.log(this.selectedOptions);

    },
    checkSubmit:function(object){
        for(let op of this.options){
            op.input.enabled = false;
        }
        console.log('check');
        if(checkOptAnswers(this.question.data.get('qid'),this.selectedOptions) == true){
            console.log(":-)");
            setTimeout(this.reward,2000,this);
        }else{
            let answers = getAnswers(this.question.data.get('qid'));
            for(let op of this.options){
                if(answers.includes(""+op.data.get('opid')) ){
                    op.setTint('0x00ff00');
                }else{
                    op.setTint('0xff0000');
                }
            }
            setTimeout(this.punish,2000,this);
        }
    },
    reward:function(task){
        console.log("jdka");
        task.scene.setVisible(false,'Task');
        window.gameDescriptor.coins += 100;

    },
    punish:function(task){
        task.scene.setVisible(false,'Task');
        window.gameDescriptor.coins -= 50;
    }

});




