/**
 *  Sounds Class
 */

class Sounds {
    isPlaying;
    bottle_sound = new Audio('audio/bottle.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    chicken_hurt_sound = new Audio('audio/jump-landing.mp3');
    walking_sound = new Audio('audio/walk.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    victory_sound = new Audio('audio/victory.mp3');
    defeat_sound = new Audio('audio/lost-game.mp3');
    gameSound = new Audio('audio/intro.mp3');
    hit_chicken_sound = new Audio('./audio/hit-chicken.mp3');


    constructor() {
        this.changeSoundsVolume();
    }


    /**
     * Change sounds volume
     */

    changeSoundsVolume() {
        this.gameSound.volume = 0.02;
        this.bottle_sound.volume = 0.2;
        this.coin_sound.volume = 0.09;
        this.chicken_hurt_sound.volume = 0.05;
        this.walking_sound.volume = 0.1;
        this.jump_sound.volume = 0.5;
        this.hurt_sound.volume = 0.3;
        this.victory_sound.volume = 1;
        this.defeat_sound.volume = 1;
        this.hit_chicken_sound.volume = 0.1;
    }
}

