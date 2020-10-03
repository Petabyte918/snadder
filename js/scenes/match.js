var Match = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'Match',
    initialize:

    function Match ()
    {
        Phaser.Scene.call(this, { key: 'Match', active: false });
    },
    preload:function(){
        this.load.image('popupBG','assets/images/UI/settings/bg.png');
        this.load.image('popupBG0','assets/images/UI/level_select/table2.png');
        this.load.image('popupBG1','assets/images/UI/settings/92.png');
        this.load.image('popupBG2','assets/images/UI/rating/face.png');
        this.load.image('popupBG3','assets/images/UI/level_select/header.png');
        this.load.image('popupBG4','assets/images/UI/level_select/table.png');
    },
    create: function ()
    {

        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'sky').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg0').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg1').setScale(1.7);
        this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 1210, 'bg3').setScale(1);

        
        this.close = this.add.image(900,80,'btn_close').setScale(0.4);
        this.close.setInteractive();
        this.close.setDataEnabled();
        this.close.data.set('hint','Quit game');
        this.close.on('over',this.showHint,this);


        this.add.image(500,1680,'wood_down1').setScale(0.65).setScrollFactor(0);
        
        this.add.image(170,1700,'wood_table').setScale(1,0.8).setScrollFactor(0);
        this.add.image(100,1700,'coins').setScale(0.15).setScrollFactor(0);
        this.coins = this.add.dynamicBitmapText(150,1677,'fire',window.gameDescriptor.coins,35).setScrollFactor(0);


        this.add.image(600,1700,'wood_btn').setScale(0.6).setScrollFactor(0);
        this.add.image(700,1700,'wood_btn').setScale(0.6).setScrollFactor(0);
        this.add.image(800,1700,'wood_btn').setScale(0.6).setScrollFactor(0);
        this.add.image(900,1700,'wood_btn').setScale(0.6).setScrollFactor(0);
        
        this.heartBtn = this.add.image(600,1700,'heart').setScale(0.18).setScrollFactor(0).setInteractive().setDataEnabled();
        this.heartBtn.data.set('assetName','heart');
        this.heartBtn.data.set('hint','These are your herts');
        // this.heartBtn.on('over',this.showHint,this);
        // this.snakeCoverBtn.on('click',this.blastSnakes,this);
        
        this.snakeCoverBtn = this.add.image(700,1700,'snake_potion').setScale(0.2).setScrollFactor(0).setInteractive().setDataEnabled();
        this.snakeCoverBtn.data.set('assetName','snake_cover');
        this.snakeCoverBtn.data.set('hint','protects you from snakes');
        // this.snakeCoverBtn.on('over',this.showHint,this);
        // this.snakeCoverBtn.on('click',this.blastSnakes,this);
        
        this.demonCoverBtn = this.add.image(800,1700,'demon_potion').setScale(0.2).setScrollFactor(0).setInteractive().setDataEnabled();
        this.demonCoverBtn.data.set('assetName','demon_cover');
        this.demonCoverBtn.data.set('hint','protects you from demons');
        // this.demonCoverBtn.on('over',this.showHint,this);
        // this.demonCoverBtn.on('click',this.blastDemons,this);

        this.freezeCoverBtn = this.add.image(900,1700,'hammer').setScale(0.2).setScrollFactor(0).setInteractive().setDataEnabled();
        this.freezeCoverBtn.data.set('assetName','snake_cover');
        this.freezeCoverBtn.data.set('hint','Breaks the ice');
        // this.freezeCoverBtn.on('over',this.showHint,this);
        // this.heartsBtn.on('click',this.BlastDemons,this);

        this.hearts = this.add.dynamicBitmapText(620,1700,'fire',window.gameDescriptor.hearts,40).setScrollFactor(0);
        this.snakeCover = this.add.dynamicBitmapText(720,1700,'fire',getBoonQtyFromInventory('snake_cover'),40).setScrollFactor(0);
        this.demonCover = this.add.dynamicBitmapText(820,1700,'fire',getBoonQtyFromInventory('demon_cover'),40).setScrollFactor(0);
        this.freezeCover = this.add.dynamicBitmapText(920,1700,'fire',getBoonQtyFromInventory('hammer'),40).setScrollFactor(0);
        
       
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
            gameObject.emit('over',gameObject);
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
        this.input.on('gameobjectup', function (pointer, gameObject)
        {
            gameObject.emit('click', gameObject);
        });
        
        var cursors = this.input.keyboard.createCursorKeys();
        var controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
            zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            acceleration: 0.06,
            drag: 0.0005,
            maxSpeed: 1.0
        };
    
        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#a0c449");

        this.showInstructionPopup(STRINGS.str_match_game,this.popupClose,this.popupOk);
    },
    update:function(time,delta){
        this.controls.update(delta);
        this.hearts.setText(window.gameDescriptor.hearts)
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
            y -= height;
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
    },
    showInstructionPopup:function(str,closeCallback,okCallback){
        this.popupContainer = this.add.container(WIDTH/2, HEIGHT/2+this.cameras.main.scrollY);
        
        var popup = this.add.image(0,0,'popupBG')
                        .setScale(0.6,0.8);
        var popup1 = this.add.image(0,0,'popupBG0')
                        .setScale(0.6,0.8);
        var feature = this.make.text({
            x: 0,
            y: 0,
            text: str,
            origin: { x: 0.5, y: 0.5 },
            style: {
                font: 'bold 45px Arial',
                fill: 'green',
                align: 'center',
                wordWrap: { width: 500 }
            }
        });
        // var b = feature.getBounds();
        var popupClose = this.add.image(350,-350,'btn_close')
                        .setScale(0.5)
                        .setInteractive()
                        .on('click',closeCallback,this);
        var popupOk = this.add.image(0,200,'btn_ok')
                        .setScale(0.5)
                        .setInteractive()
                        .on('click',okCallback,this);

        
        this.popupContainer.add(popup);
        this.popupContainer.add(popup1);
        this.popupContainer.add(feature);
        this.popupContainer.add(popupClose);
        this.popupContainer.add(popupOk);

        this.tweens.add({
            targets     : [ this.popupContainer ],
            scaleX: 1.2,
            scaleY: 1.2,
            ease        : 'Elastic',
            duration    : 3000,
            yoyo        : false,
            repeat      : 0,
            callbackScope   : this
            });

    },
    popupClose:function(){
        this.popupContainer.destroy();
        this.showQuestion();
    },
    popupOk:function(){
        this.popupContainer.destroy();
        this.showQuestion();
    },
    showQuestion:function(){
        
        
        this.task = {};
        let question = getQuestionByType('match');
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
        this.add.image(500,870,'popupBG').setScale(0.6,1.3);
        this.add.image(500,820,'popupBG0').setScale(0.6,1.3);
        this.task['questionText'] = this.make.text({
            x: 480,
            y: 450,
            text: '',
            origin: { x: 0.5, y: 0.5 },
            style: {
                fontFamily: 'Finger Paint', 
                font: 'bold 45px Arial',
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
    checkSubmit:function(){
        this.submit.input.enabled = false;
        for(let opb of this.task.optionBlocks){
            opb.input.enabled = false;
        }
        q = {
            qid:this.task.qid,
            answers:this.task.selectedOptions
        }
        window.gameDescriptor.matchQuestionAnswered.push(q);
        setTimeout(this.changeQuestion,200,this);
        
    },
    changeQuestion:function(context){
            context.sound.playAudioSprite('ui_sfx', 'coins-gain');
            
            var points = [
                new Phaser.Math.Vector2(508.83813145825104, 853.9514456913603),
                new Phaser.Math.Vector2(479.0827210239393, 958.0918658976237),
                new Phaser.Math.Vector2(440.40068745933405, 1050.3305237946),
                new Phaser.Math.Vector2(380.88986659071054, 1130.667419382289),
                new Phaser.Math.Vector2(276.74593007061947, 1211.004314969978),
                new Phaser.Math.Vector2(175.5775345939596, 1264.5622453617705),
                new Phaser.Math.Vector2(89.28684433445555, 1374.6535467226774),
                new Phaser.Math.Vector2(44.65372868298795, 1520.4501350114465),
                new Phaser.Math.Vector2(92.26238537788673, 1657.3204015682497),
                new Phaser.Math.Vector2(116.06671372533611, 1707.9028913827206),
            ];
            var curve = new Phaser.Curves.Spline(points);
            // var coinEarned = this.add.follower(curve, 508.83813145825104,853.9514456913603+this.cameras.main.scrollY, 'coin_sprite').setOrigin(0.5).setScale(2);
            var coinEarned = context.add.follower(curve, 508.83813145825104,853.9514456913603, 'heart')
                                        .setOrigin(0.5)
                                        .setScale(0.2);
            coinEarned.startFollow({
                duration: 1000,
                yoyo: false,
                repeat: 0,
                rotateToPath: false,
                verticalAdjust: true
            });
            setTimeout((object)=>{
                object.setVisible(false);
                window.gameDescriptor.hearts++;

            },1100,coinEarned);
            context.refresh();

    },
    rolloutClose:function(){
        this.popupContainer.destroy();
        this.scene.start('Dashboard');
    },
    rolloutOk:function(){
        this.popupContainer.destroy();
        this.scene.start('Dashboard');
    },
    refresh:function(){
        let question = getQuestionByType('match');
        if(question.qid == undefined) {
            textPopup(STRINGS.str_question_rollout,this.rolloutClose,this.rolloutOk,this);
            setGameData();
            return;
        }
        this.task.qid = question.qid;
        this.task.q = question.q;
        this.task.options = question.options;
        this.task.answers = question.answers;
        this.task['questionText'].setText(this.task.q);
        this.task['selectedOptions'] = [];
        window.gameDescriptor.questionAnswered.push(this.task.qid);
        this.submit.input.enabled = true;

        for(let i = 0;i<(this.task.options != null?this.task.options.length:0);i++){
            this.task.optionTexts[i].setText(this.task.options[i].txt);
        }
        for(let opb of this.task.optionBlocks){
            opb.input.enabled = true;
            opb.setTint('0xffffff');
        }
        console.log(this.task);

    },
});




