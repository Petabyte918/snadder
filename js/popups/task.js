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
        

    },

    create: function ()
    {


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
        this.showQuestion();

    },
    refresh:function(){

        for(var ob of this.task.optionBlocks){
            ob.destroy();
        }
        for(var ob of this.task.optionTexts){
            ob.destroy();
        }
        this.task.questionText.destroy();
        this.submit.destroy();
        this.task.bg0.destroy();
        this.task.bg1.destroy();

        this.showQuestion();

    },
    showQuestion:function(){
        
        
        this.task = {};
        var qType = '';
        switch(window.gameDescriptor.actionType){
            case 'task':qType = 'quiz';break;
            case 'awareness':qType = 'awareness';break;
            case 'match':qType = 'match';break;
        }
        let question = getQuestionByType(qType,window.gameDescriptor.user.gender);
        if(question.qid == undefined) {
            textPopup(STRINGS.str_question_rollout,this.rolloutClose,this.rolloutOk,this);
            setGameData();
            return;
        }
        this.task['qid'] = question.qid;
        this.task['q'] = question.q;
        this.task['options'] = question.options;
        this.task['answers'] = question.answers;
        // this.task['questionText'] = this.add.dynamicBitmapText(240,400,'green','',35);
        this.task['bg0'] = this.add.image(500,870,'popupBG').setScale(0.6,1.3);
        this.task['bg1'] = this.add.image(500,820,'popupBG0').setScale(0.6,1.3);
        this.task['questionText'] = this.make.text({
            x: 480,
            y: 470,
            text: '',
            origin: { x: 0.5, y: 0.5 },
            style: {
                fontFamily: 'Finger Paint', 
                font: 'bold 30px Arial',
                fill: 'green',
                wordWrap: { width: 600 }
            }
        });
        this.task['questionText'].setText(this.task.q);
        this.task['selectedOptions'] = [];
        this.task['optionTexts'] = [];
        this.task['optionBlocks'] = [];
        window.gameDescriptor.questionAnswered.push(this.task.qid);
        
        
        for(let i = 0,j=0,k=0;i<(this.task.options != null?this.task.options.length:0);i++){
            if(i%2 == 0){
                j +=250;
                k=0;
            }
            k++;
            let op = this.add.image(100+ (k*260),(this.task.options.length<=4?500:400) +j,'popupBG4').setScale(0.8);
                op.setInteractive();
                op.on('click',this.makeSelected,this);
                op.setDataEnabled();
                op.data.set('opid',this.task.options[i].opid);
            this.task.optionBlocks.push(op);
            
            // let optxt = this.add.dynamicBitmapText(60+ (k*270),495+j,'green','',35);
            let optxt = this.make.text({
                    x: 60+(k*270),
                    y: (this.task.options.length<=4?515:415)+j,
                    text: '',
                    origin: { x: 0.5, y: 0.5 },
                    style: {
                        fontFamily: 'Finger Paint', 
                        font: 'bold 30px Arial',
                        fill: 'green',
                        align:'center',
                        wordWrap: { width: 250 }
                    }
                });
            optxt.setText(this.task.options[i].txt);
            this.task.optionTexts.push(optxt);
        }
        this.submit = this.add.image(500,1380,'btn_next').setScale(0.8);
        this.submit.setInteractive();
        this.submit.on('click',this.checkSubmit,this);
        this.submit.input.enabled = false;
    },
    makeSelected:function(object){
        if(!this.task.selectedOptions.includes(object.data.get('opid')) ){
            this.task.selectedOptions.push(object.data.get('opid'));
            object.setTint('0x00ff00');
            object.data.set('isSelected',true);
            if(this.task.selectedOptions.length>=1){
                this.submit.input.enabled = true;
            }
        }else{
            object.setTint('0xffffff');
            object.data.set('isSelected',false);
            this.task.selectedOptions.remove(object.data.get('opid'));
            if(this.task.selectedOptions.length>=1){
                this.submit.input.enabled = true;
            }else{
                this.submit.input.enabled = false;
            }
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
            setTimeout(this.reward,200,this);
        }else{
            let answers = getAnswers(this.task.qid);
            for(let opb of this.task.optionBlocks){
                if(answers.includes(""+opb.data.get('opid')) ){
                    opb.setTint('0x00ff00');
                }else{
                    opb.setTint('0xff0000');
                }
            }
            setTimeout(this.punish,200,this);
        }
    },
    reward:function(task){
        console.log("Correct answer");
        task.scene.setVisible(false,'Task');
        window.gameDescriptor.state = STATES.taskPass;
    },
    punish:function(task){
        console.log("InCorrect answer");
        task.scene.setVisible(false,'Task');
        window.gameDescriptor.state = STATES.taskFail;
    },
    rolloutClose:function(){
        this.scene.setVisible(false,'Task');
    },
    rolloutOk:function(){
        this.scene.setVisible(false,'Task');
    },

});




