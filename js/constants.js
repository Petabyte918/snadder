/**
 * Global constants 
 */


 
/** Game keys */
let LEFT = 0;
let RIGHT = 1;
let TOP = 2;
let BOTTOM = 3;

/** Resolution of game tiles */
let RESOLUTION = 50;

/** screen dimentions */
let WIDTH = 980;
let HEIGHT = 1750;

/** translate board */
let TRANSLATE_X = 100, TRANSLATE_Y = 50; 

/** dimentions of the board */
let COLS = WIDTH/ RESOLUTION;
let ROWS = HEIGHT / RESOLUTION;

/** dies roll numbers */
let DIE_NUMBERS = [1,2,3,4,5,6]

/** number of snakes  */
let SNAKES_COUNT = 8;

/** number of Ladders */
let LADDERS_COUNT = 8;

/** number of questions */
let QUESTIONS_COUNT = 100;

/** game state */
let STATES = {

    rolling:0, /** Rolling the die */
    moving:1,  /** Moving to next spot */
    snadder:2, /** Moving along a snake or ladder */
    gameover:3,/** Game over */
    won:4,     /** Game won */
    ideal:5,
    task:6,
    taskPass:7,
    taskFail:8,
    taskConfirm:9,
    rapidTask:10,
    rapidTaskPass:11,
    rapidTaskFail:12,
    frozen:13,


}

let MUTE = true;
let UNMUTE = false;

let MUSIC_STATES = {
    playing:0,
    stoped:1,
}



let STRINGS = {
    str_gameOver    : 'Game Over',
    str_levels      : 'Levels',
    str_welcome_message : 'नमस्कार, आप को इस गेम में स्वागत है | आप बहुत धन्यवाद की अपने इस गेम को चुना और मै ये बताना चाहता हूँ की ये एक ऐसा गेम है जो सिर्फ और सिर्फ दम्पति के बीच में खेले जाने वाला है | आप इस गेम द्वार बहुत कुछ विषय न केवल सीखेंगे बल्कि आप और आपके जीवनसाथी एक दुसरे को और अच्छे से समझने लगेंगे | उम्मीन्द है की आप आगे इस गेम को अच्छा से खेलेंगे |',
    str_match_game : 'Tell about your likes and dislikes, you will be asked some questions which you need to answers',

    hint_quit : 'Quit the game',


}


