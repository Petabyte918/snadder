let splash = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

    function Background(){
        Phase.scene.call(this,{key:'background',active:true});
    },

    preload: function(){
        this.load.image('face','assets/pics/bw-face.png');
    },

    create: function(){
        this.face = this.add.image(400,400,'face');
    },

    // update: function(time,delta){
    //     this.face.rotate += 0.01;
    // }
});

let splash = new Phaser.Class({

    Extends: Phaser.Scene,
    initialize:

    function Background(){
        Phase.scene.call(this,{key:'background',active:true});
    },

    preload: function(){
        this.load.image('face','assets/pics/bw-face.png');
    },

    create: function(){
        this.face = this.add.image(400,400,'face');
    },

    update: function(time,delta){
        this.face.rotate += 0.01;
    }
});