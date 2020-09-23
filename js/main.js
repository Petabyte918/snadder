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
        GameMain,
    ],
    title: 'LoveLudo'
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
    debug:false,
    state:STATES.ideal,
    playerLastPos:0,
    playerPos:0,
    playerDirection:1,
    actionType:'task',
    avator:'',
    score:0,
    lives:3,
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
    questions:[
        {
            qid:1,
            q:'Which of them are memals \nanswer it or die',
            options:[
                {
                    opid:6,
                    img:'',
                    txt:'apple'
                },
                {
                    opid:1,
                    img:'',
                    txt:'ball'
                },
                {
                    opid:2,
                    img:'',
                    txt:'cat'
                },
                {
                    opid:3,
                    img:'',
                    txt:'dog'
                },
                {
                    opid:4,
                    img:'',
                    txt:'elephant'
                },
                {
                    opid:5,
                    img:'',
                    txt:'fish'
                }
            ],
            answers:[
                2,3,4
            ]
        },
        {
            qid:2,
            q:'Is Education neccessary \nanswer it or die',
            options:[
                {
                    opid:6,
                    img:'',
                    txt:'apple'
                },
                {
                    opid:1,
                    img:'',
                    txt:'ball'
                },
                {
                    opid:2,
                    img:'',
                    txt:'yes'
                },
                {
                    opid:3,
                    img:'',
                    txt:'maybe'
                },
                {
                    opid:4,
                    img:'',
                    txt:'no'
                },
                {
                    opid:5,
                    img:'',
                    txt:'fish'
                }
            ],
            answers:[
                3,4
            ]
        }
    ],
    diceNums:[1,2,3,4,5,6],
    blockedDiceNums:[],
    diceNumber:0,
    tiles:[
        {
            x:606.928646817825,
            y:1530.2300787136282,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:529.140154302482,
            y:1415.979396325165,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:427.0427885341227,
            y:1326.0373488906878,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:320.08373395763925,
            y:1250.6805314809665,
            tileType:1,
            feature:null,
            featureType:'fairy',
        },
        {
            x:181.5229663356705,
            y:1155.8767815818742,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:101.30361408725138,
            y:1048.9187142057888,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:79.42560823181825,
            y:927.3752941740366,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:162.07584320683478,
            y:825.2789292625663,
            tileType:1,
            feature:null,
            featureType:'cobra',
        },
        {
            x:307.9292360150745,
            y:873.8963218014494,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:453.78259816528595,
            y:958.9765441404006,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:626.3757699466607,
            y:971.1308616173937,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:733.3350084713138,
            y:883.6197267306794,
            tileType:1,
            feature:null,
            featureType:'demon',
        },
        {
            x:733.3350084713138,
            y:766.9381317944532,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:572.8962120003907,
            y:735.337004459,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:400.30307087704426,
            y:723.1826256665515,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:298.2057051086849,
            y:638.1022806966893,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:305.49836095298417,
            y:523.8516596236814,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:375.99416696599957,
            y:441.2021658861267,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:529.140154302482,
            y:501.9738759020029,
            tileType:1,
            feature:null,
            featureType:'fairy',
        },
        {
            x:687.1480757113147,
            y:494.68126088962487,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:798.969003044092,
            y:399.8775109905326,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:818.4160648568711,
            y:266.179804139515,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:631.2375200708414,
            y:288.0576185189213,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:465.9370961078507,
            y:271.0415985773132,
            tileType:0,
            feature:null,
            featureType:null,
        },
        {
            x:402.7339152811063,
            y:171.37603891155885,
            tileType:1,
            feature:null,
            featureType:'cobra',
        },
        {
            x:461.0752540095852,
            y:54.694482297492215,
            tileType:0,
            feature:null,
            featureType:null,
        },
    ],
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

