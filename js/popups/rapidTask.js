var RapidTask = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'RapidTask',
    initialize:function RapidTask ()
    {
        Phaser.Scene.call(this, { key: 'RapidTask', active: false });
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

        // this.add.image(500,870,'popupBG').setScale(0.6,1.3);
        // this.add.image(500,820,'popupBG0').setScale(0.6,1.3);
        
        // this.task = null;
        // this.task = getQuestionData();
        // // this.task['questionText'] = this.add.dynamicBitmapText(240,400,'green','',35);
        // this.task['questionText'] = this.make.text({
        //     x: 480,
        //     y: 450,
        //     text: '',
        //     origin: { x: 0.5, y: 0.5 },
        //     style: {
        //         font: 'bold 45px Arial',
        //         fill: 'green',
        //         wordWrap: { width: 600 }
        //     }
        // });
        // this.task['questionText'].setText(this.task.q);
        // this.task['selectedOptions'] = [];
        // this.task['optionTexts'] = [];
        // this.task['optionBlocks'] = [];
        // this.task['questionCount'] = 1;
        // if(window.gameDescriptor.debug==true)
        //     this.task['counter'] = 10;
        // else 
        //     this.task['counter'] = 60;
        // this.task['questionAnsweredCorrect'] = 0;
        // this.task['counterText'] = this.add.dynamicBitmapText(960/2-50,230,'fire','',120);
        // this.task.counterText.setText(this.task.counter);


        // for(let i = 0,j=0,k=0;i<(this.task.options != null?this.task.options.length:0);i++){
        //     if(i%2 == 0){
        //         j +=250;
        //         k=0;
        //     }
        //     k++;
        //     let op = this.add.image(100+ (k*260),400+j,'popupBG4').setScale(0.8);
        //         op.setInteractive();
        //         op.on('click',this.makeSelected,this);
        //         op.setDataEnabled();
        //         op.data.set('opid',this.task.options[i].opid);
        //     this.task.optionBlocks.push(op);
            
        //     let optxt = this.add.dynamicBitmapText(60+ (k*270),495+j,'green','',35);
        //         optxt.setText(this.task.options[i].txt);
        //     this.task.optionTexts.push(optxt);
        // }
        // // this.add.image(500,280,'popupBG3').setScale(0.6);
        // this.submit = this.add.image(500,1380,'btn_next').setScale(0.8);
        // this.submit.setInteractive();
        // this.submit.on('click',this.checkSubmit,this);

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
        this.showQuestion();
        // timer = this.time.addEvent({ delay: this.task.counter, callback: this.reward, callbackScope: this });
        this.timer = this.time.addEvent({ delay: this.task.counter*1000, callback: this.timeout, callbackScope: this });
        this.countdown = this.sound.addAudioSprite('ui_sfx', 'count-down',{loop:true});
        this.countdown.manager.playAudioSprite('ui_sfx','count-down',{loop:true});


    },
    update:function(){
        // if(this.task.counter >0){
        //     this.sound.playAudioSprite('ui_sfx', 'count-down');
        // }
        
        this.task.counterText.setText( Math.floor(this.task.counter - this.timer.getElapsed()/1000));
    },
    showQuestion:function(){
        
        
        this.task = {};
        // var qType = '';
        // switch(window.gameDescriptor.actionType){
        //     case 'task':qType = 'quiz';break;
        //     case 'awareness':qType = 'awareness';break;
        //     case 'match':qType = 'match';break;
        // }
        let question = getQuestionByType('quiz');
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
            x: 260,
            y: 470,
            text: '',
            origin: { x: 0, y: 0.5 },
            style: {
                fontFamily: 'Finger Paint', 
                font: 'bold 30px Arial',
                fill: 'green',
                wordWrap: { width: 500 }
            }
        });
        this.task['questionText'].setText(this.task.q);
        this.task['selectedOptions'] = [];
        this.task['optionTexts'] = [];
        this.task['optionBlocks'] = [];
        this.task['questionCount'] = 1;
        if(window.gameDescriptor.debug==true)
            this.task['counter'] = 10;
        else 
            this.task['counter'] = 30;
        this.task['questionAnsweredCorrect'] = 0;
        this.task['counterText'] = this.add.dynamicBitmapText(960/2-50,230,'fire','',120);
        this.task.counterText.setText(this.task.counter);
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
                    x: (k*270),
                    y: (this.task.options.length<=4?515:415)+j,
                    text: '',
                    origin: { x: 0, y: 0.5 },
                    style: {
                        fontFamily: 'Finger Paint', 
                        font: 'bold 28px Arial',
                        fill: 'green',
                        // align:'center',
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
    refresh:function(){
        this.submit.input.enabled = true;
        let question = getQuestionData();
        this.task.qid = question.qid;
        this.task.q = question.q;
        this.task.options = question.options;
        this.task.answers = question.answers;
        this.task['questionText'].setText(this.task.q);
        this.task['selectedOptions'] = [];
        this.task['questionCount'] = 1;
        this.task['counter'] = 6;
        this.task['questionAnsweredCorrect'] = 0;
        this.timer = this.time.addEvent({ delay: this.task.counter*1000, callback: this.timeout, callbackScope: this });

        for(let i = 0;i<(this.task.options != null?this.task.options.length:0);i++){
            this.task.optionTexts[i].setText(this.task.options[i].txt);
        }
        for(let opb of this.task.optionBlocks){
            opb.input.enabled = true;
            opb.setTint('0xffffff');
        }
        console.log(this.task);
        this.countdown.manager.playAudioSprite('ui_sfx','count-down',{loop:true});

    },
    refreshQuestion:function(){
        this.submit.input.enabled = true;
        let question = getQuestionData();
        this.task.qid = question.qid;
        this.task.q = question.q;
        this.task.options = question.options;
        this.task.answers = question.answers;
        this.task['questionText'].setText(this.task.q);
        this.task['selectedOptions'] = [];
        this.task.questionCount++;

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
            if(this.task.selectedOptions.length >0)return;
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
        // this.submit.input.enabled = false;
        for(let opb of this.task.optionBlocks){
            opb.input.enabled = false;
        }
        if(checkOptAnswers(this.task.qid,this.task.selectedOptions) == true){
            console.log(":-)");
            this.task.questionAnsweredCorrect++;
            console.log(this.task.questionCount,this.task.questionAnsweredCorrect)
            this.refreshQuestion();
            // setTimeout(this.reward,2000,this);
        }else{
            let answers = getAnswers(this.task.qid);
            for(let opb of this.task.optionBlocks){
                if(answers.includes(opb.data.get('opid')) ){
                    opb.setTint('0x00ff00');
                }else{
                    opb.setTint('0xff0000');
                }
            }
            console.log(this.task.questionCount,this.task.questionAnsweredCorrect)
            this.refreshQuestion();
            // setTimeout(this.punish,2000,this);
        }
        

    },
    timeout:function(){
        this.countdown.manager.stopAll();
        this.countdown.pause();
        this.sound.playAudioSprite('ui_sfx', 'count-down-end');
        console.log('Time out');
        for(let opb of this.task.optionBlocks){
            opb.input.enabled = false;
            opb.setTint('0xffffff');
        }
        this.submit.input.enabled = false;
        this.scene.setVisible(false,'RapidTask');
        console.log("MATH",Math.floor(this.task.questionAnsweredCorrect/this.task.questionCount*100),this.task.questionCount,this.task.questionAnsweredCorrect);
        if(Math.floor(this.task.questionAnsweredCorrect/this.task.questionCount*100) > 30 ){
            this.reward();
        }
        else{
            this.punish();
        }
        
    },
    reward:function(task){
        console.log("Round pass");
        // window.gameDescriptor.coins += 100;
        window.gameDescriptor.state = STATES.rapidTaskPass;
    },
    punish:function(task){
        console.log("Round fail");
        // task.scene.setVisible(false,'Task');
        window.gameDescriptor.state = STATES.rapidTaskFail;
    },
    rolloutClose:function(){
        this.scene.setVisible(false,'RapidTask');
    },
    rolloutOk:function(){
        this.scene.setVisible(false,'RapidTask');
    },
});