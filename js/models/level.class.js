class Level {
    clouds;
    enemies;
    backgroundObjects;
    bottles;
    coins;
    hearts;
    level_end_x = 2800;


    constructor(clouds, enemies, backgroundObjects, bottles, coins, hearts){
        this.clouds = clouds;
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.hearts = hearts;
    }
}