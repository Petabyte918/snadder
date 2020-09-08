var config = {
    type: Phaser.AUTO,
    backgroundColor:'#000',
    scale: {
        // mode: Phaser.Scale.RESIZE,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'phaser',
        width: 980,
        height: 1750
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug:false
        }
    },
    scene: [ 
        Splash,
        Avator,
        Dashboard,
        Shop,
        Upgrades,
        Levels,
        Match,
    ],
    title: 'Snadder'
}; 


// //  The Google WebFont Loader will look for this object, so create it before loading the script.
// WebFontConfig = {

//     //  'active' means all requested fonts have finished loading
//     //  We set a 1 second delay before calling 'createText'.
//     //  For some reason if we don't the browser cannot render the text the first time it's created.
//     active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

//     //  The Google Fonts we want to load (specify as many as you like in the array)
//     google: {
//       families: ['Revalia']
//     }

// };


window.gameDescriptor = {
    avator:'',
    score:0,
    lifes:3,
    coins:100,
    hearts:3,
    lovePotions:1,
    cups:0,
    Hammers:1,
    activeSenene:'',
    selectedLevel:0,
    levels:[
        {
            id:1,
            state:'unlocked',
            stars:0,
            progress:0,

        },
        {
            id:2,
            state:"locked",
            stars:0,
            progress:0,
            
        },
        {
            id:3,
            state:"locked",
            stars:0,
            progress:0,
            
        },
        {
            id:4,
            state:"locked",
            stars:0,
            progress:0,
            
        },
        {
            id:5,
            state:"locked",
            stars:0,
            progress:0,
            
        },
        {
            id:6,
            state:"locked",
            stars:0,
            progress:0,
            
        },
        {
            id:7,
            state:"locked",
            stars:0,
            progress:0,
            
        },
        {
            id:8,
            state:"locked",
            stars:0,
            progress:0,
            
        },
        {
            id:9,
            state:"locked",
            stars:0,
            progress:0,
            
        }
    ],
    questions:[],
    diceNums:[1,2,3,4,5,6],
    blockedNums:[],
    screenWidth:document.documentElement.clientWidth,
    screenHeight:document.documentElement.clientHeight,
}


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

