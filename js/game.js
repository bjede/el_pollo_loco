let canvas;
let world;
let keyboard = new Keyboard();
let sounds = new Sounds();
let isPlaying = true;
sounds.isPlaying = isPlaying;


/**
 *  Initialize the canvas
 */

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    sounds.gameSound.play();
}


/**
 *  Restart the game.
 */

function restartGame() {
    location.reload();
}


/**
 *  Toggle game sound.
 */

function toggleSound(){
    isPlaying ? gameSoundPause() : gameSoundPlay();
}


/**
 * Play the game sound.
 */

function gameSoundPlay() {
    sounds.gameSound.play();
    world.playAllSounds();
    isPlaying = true;
    removeMuteClass();
}


/**
 * Stop the game sound.
 */

function gameSoundPause() {
    sounds.gameSound.pause();
    world.muteAllSounds();
    isPlaying = false;
    addMuteClass();
}


/**
 * Add mute class after switching.
 */

function addMuteClass(){
    let muteElement = document.getElementById('mute-sound');
    muteElement.classList.add('mute');
}


/**
 * Remove mute class after switching.
 */

function removeMuteClass(){
    let muteElement = document.getElementById('mute-sound');
    muteElement.classList.remove('mute');
}


/**
 *  Start the game and init the canvas
 */

function startGame() {
    gameStartLoader();
    setTimeout(() => {
        init();
        hideIntroLayer();
    }, 2000);
}

/**
 *  Show loading program after game start.
 */

function gameStartLoader(){
    let gameInfo = document.getElementById('game-info');
    gameInfo.style.opacity = 0;
    showLoader();
}

/**
 *  Show loader.
 */

function showLoader(){
    let loader = document.getElementById('loader');
    loader.style = 'display: block; z-index: 99;';
}


/**
 *  Hide the intro layer
 */
function hideIntroLayer() {
    let startGame = document.getElementById('intro');
    startGame.classList.add('active');
    addDnone(startGame);
}


/**
 *  After clicking start game add d-none class and wait 1 second
 * 
 * @param {string} startGame - The id from element called startgame
 */
function addDnone(startGame) {
        startGame.classList.add('d-none');
}


/**
 *  Play music again
 */

sounds.gameSound.addEventListener("ended", function () {
    sounds.gameSound.currentTime = 0;
    sounds.gameSound.play();
});

