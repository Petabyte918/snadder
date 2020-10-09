var config = {
    type: Phaser.AUTO,
    backgroundColor:'#000',
    dom: {
        createContainer: true
    },
    scale: {
        // mode: Phaser.Scale.RESIZE,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'phaser',
        width: WIDTH,
        height: HEIGHT
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
        Register,
        GameMain,
    ],
    title: 'LoveLudo',
    // plugins: {
    //     global: [{
    //         key: 'rexWebFontLoader',
    //         plugin: WebFontLoaderPlugin,
    //         start: true
    //     },
    //     // ...
    //     ]
    // }

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
    user:{
        name:'',
        phone:'',
        pass:'',
        token:'',
        profileImg:'',
        gender:''
    },
    state:STATES.ideal,
    playerLastPos:0,
    playerPos:0,
    playerDirection:1,
    playerProgress:{
        levels:[
            {
                level:1,
                levelStatus:0,
                diceNums:[],
                playerPos:0,
                stars:0,
                demonAttacks:[],
                snakeBites:[],
                punishments:[],
                questionAnswered:[],
            }
        ]

    },
    actionType:'task',
    avator:'',
    score:0,
    lives:3,
    coins:100,
    hearts:3,
    activeSenene:'',
    selectedLevel:1,
    activePunishment:null,
    punishments:[
        {
            name:'snake_wave',
            type:'wave',
            waveDuration:120,
        },
        {
            name:'demon_wave',
            type:'wave',
            waveDuration:120,
        },
        {
            name:'text_spouse',
            type:'text',
            waveDuration:0,
        },
        {
            name:'pos_reassign',
            type:'position',
            waveDuration:0,
        },
        {
            name:'frozen',
            type:'frozen',
            waveDuration:60,
        }
    ],
    assets:[
        {
            assetName:'hearts',
            assetType:'heart_gain',
            qty:5,
            img:'heart',
        },
        {
            assetName:'coins',
            assetType:'coin_gain',
            qty:1000,
            img:'coins',
        },
        {
            assetName:'snake_cover',
            assetType:'snake_shield',
            qty:1,
            img:'snake_potion',
        },
        {
            assetName:'demon_cover',
            assetType:'demon_shield',
            qty:1,
            img:'demon_potion',
        },
        {
            assetName:'hammer',
            assetType:'hammer',
            qty:1,
            img:'hammer',
        },
    ],
    inventory:[
        {
            assetName:'snake_cover',
            assetType:'snake_shield',
            qty:1,
            img:'',
        },
        {
            assetName:'demon_cover',
            assetType:'demon_shield',
            qty:1,
            img:'',
        },
        {
            assetName:'hammer',
            assetType:'wapon',
            qty:1,
            img:'hammer',
        },
    ],
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
    questionAnswered:[],
    matchQuestions:[],
    matchQuestionAnswered:[],
    blockedDiceNums:[],
    diceNumber:0,
    tiles:[],
    screenWidth:document.documentElement.clientWidth,
    screenHeight:document.documentElement.clientHeight,
}


let game = new Phaser.Game(config);


//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
	
    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    active: function() {
        // game.time.events.add(Phaser.Timer.SECOND, createText, this);
        
    },
  
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: [ 'Freckle Face', 'Finger Paint', 'Nosifer' ,'Noto Sans', 'sans-serif','Revalia']
    },
    custom: {
      families: ['FerrumExtracondensed'],
      urls: ["https://fontlibrary.org/face/ferrum"]
    }
    //free font from fontlibrary
    //https://fontlibrary.org/en/font/ferrum
    //
    //url can be a local url, link to your custom css generated from a font, from fontSquirrel for example!
    //https://www.fontsquirrel.com/tools/webfont-generator
    //just be sure that the font is LEGALLY ELEGIBLE for embedding! :)
  
  };


