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
    rapidTask:9,


}

let MUTE = 1;
let UNMUTE = 0;

let MUSIC_STATES = {
    playing:0,
    stoped:1,
}



let STRINGS = {
    gameOver : 'Game Over',

}
