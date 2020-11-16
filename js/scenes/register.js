var Register = new Phaser.Class({

    Extends: Phaser.Scene,
    key:'Register',
    initialize:

    function Register ()
    {
        Phaser.Scene.call(this, { key: 'Register', active: false });
    },

    preload: function ()
    {
        this.load.html('register', 'assets/forms/loginform.html');
    },

    create: function ()
    {

        // this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'sky').setScale(1.7);
        // this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg0').setScale(1.7);
        // this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 900, 'bg1').setScale(1.7);
        // this.bg = this.add.image(window.gameDescriptor.screenWidth/2, 1210, 'bg3').setScale(1);

        this.add.image(window.gameDescriptor.screenWidth/2, 1000, 'sky').setScale(1);
        this.add.image(window.gameDescriptor.screenWidth/2, 1000, 'bg0').setScale(1);
        this.add.image(window.gameDescriptor.screenWidth/2, 1000, 'bg1').setScale(1);
        this.add.image(window.gameDescriptor.screenWidth/2, 1000, 'bg2').setScale(1);
        this.add.image(window.gameDescriptor.screenWidth/2, 1000, 'bg4').setScale(1);
        this.add.image(window.gameDescriptor.screenWidth/2-400, 1130, 'bg3').setScale(0.5);


        this.close = this.add.image(900,80,'btn_close').setScale(0.4);
        this.close.setInteractive();
        this.close.setDataEnabled();
        this.close.data.set('hint','Quit game');
        this.close.on('over',this.showHint,this);

        // this.menu = this.add.image(80,80,'btn_menu').setScale(0.4);
        this.add.dynamicBitmapText(WIDTH/2,100,'fire','REGISTER',60).setOrigin(0.5);
        

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

        var context = this;
        var element = this.add.dom(WIDTH/2, HEIGHT).createFromCache('register');
        element.setScale(2.3,2);
        element.setPerspective(800);
        element.addListener('click');
        element.on('click', function (event) {
    
            if (event.target.name === 'loginButton')
            {
                var inputPhone = this.getChildByName('phone');
                var inputPassword = this.getChildByName('password');
    
                //  Have they entered anything?
                if (inputPhone.value !== '' && inputPassword.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');
                    window.gameDescriptor.user.phone = inputPhone.value;
                    // window.gameDescriptor.user.pass = inputPassword.value;
                    setGameData();
                    fetch("http://lovegame.frappypie.com", {
                            method:"POST",
                            body: JSON.stringify({
                                phone: inputPhone.value,
                                password: inputPassword.value,
                            })
                    })
                    .then(result => {
                        // do something with the result
                        console.log("Completed with result:", result);
                    });
                    //  Tween the login form out
                    // this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 2000, ease: 'Power3' });
    
                    this.scene.tweens.add({ targets: element, scaleX: 0, scaleY: 0, y: 700, duration: 1000, ease: 'Power3',
                        onComplete: function ()
                        {
                            element.setVisible(false);
                            context.scene.start('Dashboard');
                        }
                    });
    
                    //  Populate the text with whatever they typed in as the username!
                    // text.setText('Welcome ' + inputUsername.value);
                }
                else
                {
                    //  Flash the prompt
                    this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                }
            }
    
        });
     
        this.tweens.add({
            targets: element,
            y: HEIGHT/2,
            duration: 2000,
            ease: 'Power3'
        });
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




