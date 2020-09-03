var config = {
    type: Phaser.AUTO,
    backgroundColor:'#000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'phaser',
        width: 800,
        height: 800
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug:false
        }
    },
    scene: [ Splash ],
    title: 'Snadder'
}; 


let game = new Phaser.Game(config);



// class MyScene extends Phaser.Scene {

//     preload ()
//     {
//         this.load.image('face', 'assets/pics/bw-face.png');
//     }

//     create (data)
//     {
//         this.face = this.add.image(data.x, data.y, 'face');
//     }

// }

// class BootScene extends Phaser.Scene {

//     create ()
//     {
//         this.add.text(0, 0, 'Click to add new Scene');

//         this.input.once('pointerdown', function () {
        
//             this.scene.add('myScene', MyScene, true, { x: 400, y: 300 });

//         }, this);
//     }

// }

// var config = {
//     type: Phaser.AUTO,
//     parent: 'phaser',
//     width: 800,
//     height: 600,
//     scene: BootScene
// };

