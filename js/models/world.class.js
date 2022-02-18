class World {
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    sounds = new Sounds();
    gameOver = new GameOver();
    won = new Won();
    character = new Character();
    chicken = new Chicken();
    statusBar = new StatusBar();
    bossBar = new BossBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    endBoss = new Endboss();
    movableObject = new MovableObject();
    bottles = new Bottle();
    coins = new Coin();
    throwableObject = [];
    level = level1;
    runInterval;
    gameOverInterval;
    intervals = [];
    isGameOver = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.run_2();
        this.run_3();
        this.playerLostGame();
        this.pushIntervalToArray();
    }


    playerLostGame() {
        this.gameOverInterval = setInterval(() => {
            if (this.character.isDead()) {
                this.sounds.defeat_sound.play();
                this.clearAllIntervals();
                this.restartGame();
            }
        }, 500);

    }


    showGameOverImage() {
        if (this.character.isDead()) {
            this.addToMap(this.gameOver);
            sounds.gameSound.pause();
        }
    }

    clearAllIntervals() {
        for (let i = 0; i < this.intervals.length; i++) {
            clearInterval(this.intervals[i]);
        }
    }


    restartGame() {
        setTimeout(restartGame, 5000);
    }


    playerWonGame() {
        if (this.endBoss.isBossDead() && !this.isGameOver) {
            this.isGameOver = !this.isGameOver;
            sounds.gameSound.pause();
            this.sounds.victory_sound.play();
            this.clearAllIntervals();
            setTimeout(this.restartGame(), 3000);
        }
    }


    showWonImage() {
        if (this.endBoss.isBossDead()) {
            this.addToMap(this.won);
        }
    }


    setWorld() {
        this.character.world = this;
        this.movableObject.world = this;
    }


    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisions();
            this.checkBottles();
            this.checkCoins();
            this.checkHearts();
            this.checkCollisionEnemys();
            this.checkCollisionWithEndBoss();
            this.checkThrowObjects();
            this.checkIsEndbossHit();
            this.checkIsChickenHit();
        }, 100);
    }


    run_2() {
        this.runInterval_2 = setInterval(() => {
            this.checkIsBottleCollidingGround();
        }, 400);
    }


    run_3() {
        this.runInterval_2 = setInterval(() => {
        }, 150);
    }


    pushIntervalToArray() {
        this.intervals.push(this.runInterval);
        this.intervals.push(this.runInterval_2);
        this.intervals.push(this.character.characterInterval);
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.intervals.push(this.level.enemies[i].chickenInverval);
            this.intervals.push(this.level.enemies[i].chickenWalkingInverval);
        }
    }


    checkThrowObjects() {
        let currentTime = new Date().getTime();
        if (this.keyboard.D && this.character.collectBottle > 0 && this.isThrowBottle(currentTime)) {
            this.character.lastThrow = new Date().getTime();
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObject.push(bottle);
            this.character.collectBottle -= 10;
            this.bottleBar.setPercentage(this.character.collectBottle);
        }
    }


    isThrowBottle(currentTime) {
        return ((currentTime - this.character.lastThrow) / 1000 > 0.6);
    }


    checkIsEndbossHit() {
        this.throwableObject.forEach((object) => {
            if (object.isColliding(this.endBoss)) {
                if (!this.endBoss.isBossDead()) {
                    this.addEndBossDemage();
                    this.removeBottleAfterThrow(object);
                } else {
                    this.isBossDead();
                }
            }
        });
    }


    checkIsChickenHit() {
        this.throwableObject.forEach((object) => {
            this.checkIsBottleCollidingChicken(object);
        });
    }


    checkIsBottleCollidingChicken(object) {
        this.level.enemies.forEach((enemy) => {
            if (object.isColliding(enemy)) {
                if (!enemy.isChickenDead()) {
                    this.chicken.hit_chicken_sound.play();
                    enemy.hitChicken();
                }
            }
        });
    }


    checkIsBottleCollidingGround() {
        this.throwableObject.forEach((object) => {
            if (object.isCollidingWithGround(object)) {
                this.removeBottleAfterThrow(object);

            }
        });
    }


    removeBottleAfterThrow(object) {
        setTimeout(() => {
            let index = this.throwableObject.indexOf(object);
            this.throwableObject.splice(index, 1);
        }, 180);


    }


    addChickenDemage() {
        this.chicken.hitChicken();
    }


    addEndBossDemage() {
        this.endBoss.hitBoss();
        this.bossBar.setPercentage(this.endBoss.ernergyBoss)
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.collidingAboveGround(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }


    collidingAboveGround(enemy) {
        return this.character.isColliding(enemy) && !enemy.isChickenDead() && !this.character.isAboveGround()
    }


    checkCollisionEnemys() {
        this.level.enemies.forEach((enemy) => {
            if (this.characterAboveGround(enemy)) {
                this.chicken.hit_chicken_sound.play(),
                enemy.chickenEnergy = 0;
            }
        });
    }


    /**
     * Check if the character collides with the final boss and inflict damage to the character.
     */

    checkCollisionWithEndBoss() {
        if (this.character.isColliding(this.endBoss)) {
            this.character.hit();
            this.statusBar.setPercentage(this.character.energy);
        }
    }


    /**
     * @param {object} enemy - chicken 
     * @returns true or false, when the character lands on the chicken.
     */

    characterAboveGround(enemy) {
        return this.character.isCollidingWithCicken(enemy) &&
            this.character.isAboveGround() && enemy.chickenEnergy != 0;
    }


    /**
     * Check is character colliding with bottles.
     */

    checkBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottles(bottle);
                this.bottleBar.setPercentage(this.character.collectBottle);
            }
        });
    }


    /**
     * Check is character colliding with coins.
     */

    checkCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.collectCoins(coin);
                this.coinBar.setPercentage(this.character.collectCoin);
            }
        });
    }


    /**
     * Check is character colliding with hearts.
     */

    checkHearts() {
        this.level.hearts.forEach((heart) => {
            if (this.character.isColliding(heart)) {
                this.character.collectHeart(heart);
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }


    /**
     * Draw Character, backgrounds, enemies, coins, bottles and hearts into the canvas.
     */

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addDrawableObjectsToMap();
        this.addEnemiesToMap();
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.camera_x, 0);
        this.addBarsToMap();
        this.addCharacterToMap();
        this.playerWonGame();
        this.showGameOverImage();
        this.showWonImage();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }



    addEnemiesToMap() {
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.endBoss);
    }


    addDrawableObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.hearts);
    }


    /**
     *  Add Character into the canvas
     */

    addCharacterToMap() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     *  Add status, boss, bottle and coin bar to the canvas.
     */

    addBarsToMap() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bossBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
    }


    /**
     * Add object to the canvas.
     * 
     * @param {object} objects - backgrounds, enemies, clouds
     */

    addObjectsToMap(objects) {
        objects.forEach(o => { this.addToMap(o); });
    }


    /**
     * 
     * @param {object} mo - movebal object - character
     */

    addToMap(mo) {
        if (mo.otherDirection) { this.flipImage(mo); }
        mo.draw(this.ctx);
        if (mo.otherDirection) { this.flipImageBack(mo); }
        // mo.drawFrame(this.ctx);
    }


    /**
     * 
     * @param {object} mo - mobeval object - Character
     */

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * 
     * @param {object} mo - mobeval object - Character
     */

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    muteAllSounds() {
        this.character.jump_sound.muted = true;
        this.character.walking_sound.muted = true;
        this.character.hurt_sound.muted = true;
        this.character.coin_sound.muted = true;
        this.character.bottle_sound.muted = true;
        this.chicken.hit_chicken_sound.muted = true;
        this.chicken.chicken_hurt_sound.muted = true;
        this.endBoss.hit_chicken_sound.muted = true;
        this.sounds.victory_sound.muted = true;
        this.sounds.defeat_sound.muted = true;

    }


    playAllSounds() {
        this.chicken.hit_chicken_sound.muted = false;
        this.character.jump_sound.muted = false;
        this.character.walking_sound.muted = false;
        this.character.hurt_sound.muted = false;
        this.character.coin_sound.muted = false;
        this.character.bottle_sound.muted = false;
        this.chicken.chicken_hurt_sound.muted = false;
        this.endBoss.hit_chicken_sound.muted = false;
        this.sounds.victory_sound.muted = false;
        this.sounds.defeat_sound.muted = false;
    }

}