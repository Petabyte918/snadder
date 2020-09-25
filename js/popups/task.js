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
        
        // this.load.image('popupBG','assets/images/UI/settings/bg.png');
        // this.load.image('popupBG0','assets/images/UI/level_select/table2.png');
        // this.load.image('popupBG1','assets/images/UI/settings/92.png');
        // this.load.image('popupBG2','assets/images/UI/rating/face.png');
        // this.load.image('popupBG3','assets/images/UI/level_select/header.png');
        // this.load.image('popupBG4','assets/images/UI/level_select/table.png');

    },

    create: function ()
    {

        this.add.image(500,870,'popupBG').setScale(0.6,1.3);
        this.add.image(500,820,'popupBG0').setScale(0.6,1.3);
        
        this.task = null;
        this.task = getQuestionData();
        this.task['questionText'] = this.add.dynamicBitmapText(240,400,'green','',35);
        this.task['questionText'].setText(this.task.q);
        this.task['selectedOptions'] = [];
        this.task['optionTexts'] = [];
        this.task['optionBlocks'] = [];

        for(let i = 0,j=0,k=0;i<(this.task.options != null?this.task.options.length:0);i++){
            if(i%2 == 0){
                j +=250;
                k=0;
            }
            k++;
            let op = this.add.image(100+ (k*260),400+j,'popupBG4').setScale(0.8);
                op.setInteractive();
                op.on('click',this.makeSelected,this);
                op.setDataEnabled();
                op.data.set('opid',this.task.options[i].opid);
            this.task.optionBlocks.push(op);
            
            let optxt = this.add.dynamicBitmapText(60+ (k*270),495+j,'green','',35);
                optxt.setText(this.task.options[i].txt);
            this.task.optionTexts.push(optxt);
        }
        this.add.image(500,280,'popupBG3').setScale(0.6);
        this.submit = this.add.image(500,1380,'btn_next').setScale(0.8);
        this.submit.setInteractive();
        this.submit.on('click',this.checkSubmit,this);

        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('click', gameObject);
        }, this);
        this.input.on('gameobjectdown', function (pointer, gameObject)
        {
            this.sound.playAudioSprite('ui_button', 'button4');
        }, this);
        this.input.on('gameobjectover', function (pointer, gameObject)
        {
            if(gameObject.data){
                if(!gameObject.data.get('isSelected')){
                    gameObject.setTint('0x56f787');
                }
            }
            else{
                gameObject.setTint('0x56f787');
            }
        });
        this.input.on('gameobjectout', function (pointer, gameObject)
        {
            if(gameObject.data){
                if(gameObject.data.get('isSelected')){

                }else{
                    gameObject.setTint('0xffffff');
                }
            }
            else{
                gameObject.setTint('0xffffff');
            }
        });
        
        console.log(this.task);

    },
    refresh:function(){
        this.submit.input.enabled = true;
        let question = getQuestionData();
        this.task.qid = question.qid;
        this.task.q = question.q;
        this.task.options = question.options;
        this.task.answers = question.answers;
        this.task['questionText'].setText(this.task.q);
        this.task['selectedOptions'] = [];
        for(let i = 0;i<(this.task.options != null?this.task.options.length:0);i++){
            this.task.optionTexts[i].setText(this.task.options[i].txt);
        }
        for(let opb of this.task.optionBlocks){
            opb.input.enabled = true;
            opb.setTint('0xffffff');
        }
        console.log(this.task);

    },
    makeSelected:function(object){
        if(!this.task.selectedOptions.includes(object.data.get('opid')) ){
            this.task.selectedOptions.push(object.data.get('opid'));
            object.setTint('0x00ff00');
            object.data.set('isSelected',true);
        }else{
            object.setTint('0xffffff');
            object.data.set('isSelected',false);
            this.task.selectedOptions.remove(object.data.get('opid'));
        }
        console.log(this.task.selectedOptions);

    },
    checkSubmit:function(object){
        this.submit.input.enabled = false;
        for(let opb of this.task.optionBlocks){
            opb.input.enabled = false;
        }
        if(checkOptAnswers(this.task.qid,this.task.selectedOptions) == true){
            console.log(":-)");
            setTimeout(this.reward,2000,this);
        }else{
            let answers = getAnswers(this.task.qid);
            for(let opb of this.task.optionBlocks){
                if(answers.includes(""+opb.data.get('opid')) ){
                    opb.setTint('0x00ff00');
                }else{
                    opb.setTint('0xff0000');
                }
            }
            setTimeout(this.punish,2000,this);
        }
    },
    reward:function(task){
        console.log("Correct answer");
        task.scene.setVisible(false,'Task');
        window.gameDescriptor.coins += 100;
        window.gameDescriptor.state = STATES.taskPass;
    },
    punish:function(task){
        console.log("InCorrect answer");
        task.scene.setVisible(false,'Task');
        window.gameDescriptor.coins -= 50;
        window.gameDescriptor.state = STATES.taskFail;
    }

});




