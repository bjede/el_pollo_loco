class MovableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0.5;
    acceleration = 1;
    energy = 100;
    ernergyBoss = 100;
    chickenEnergy = 20;
    lastHit = 0;
    collectBottle = 0;
    collectCoin = 0;
    world;
    characterInterval;
    lastThrow = 0;
    gravityAnimation;


    applyGravity() {
      this.gravityAnimation = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 50);
    }


    isAboveGround() {
        return (this instanceof ThrowableObject) ? true : this.y < 135;

    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    isColliding(mo) {
        if (mo) return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x && this.y < mo.y + mo.height;
    }


    isCollidingWithGround(mo){
        if (mo) return mo.y > 320; // Flasche entfernen wenn der Boden berührt wird.
    }


    isCollidingWithCicken(mo) {
        return this.x + this.width - 50 > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x && this.y < mo.y + mo.height;
    }


    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    hitChicken(){
        this.chickenEnergy -= 20;
        if (this.chickenEnergy < 0) {
            this.chickenEnergy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    hitBoss() {
        this.ernergyBoss -= 20;
        (this.ernergyBoss < 0) ? this.ernergyBoss = 0 : this.lastHit = new Date().getTime();
    }


    collectBottles(mo) {
        if (this.collectBottle < 100) {
            this.removeBottleFromWorld(mo);
            this.collectBottle += 10;
            this.bottle_sound.play();
        }
    }


    removeBottleFromWorld(mo) {
        this.world.level.bottles.splice(this.world.level.bottles.indexOf(mo), 1);
    }


    collectCoins(mo) {
        if (this.collectCoin < 100) {
            this.world.level.coins.splice(this.world.level.coins.indexOf(mo), 1);
            this.collectCoin += 10;
            this.coin_sound.play();
        }
    }


    collectHeart(mo) {
        if (this.energy < 100) {
            this.world.level.hearts.splice(this.world.level.hearts.indexOf(mo), 1);
            this.energy += 5;
            this.coin_sound.play();
        }
    }


    removeChicken(mo) {
        if (this.chickenEnergy == 0) {
            this.world.level.chicken.splice(this.world.level.chicken.indexOf(mo), 1);
        }
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    isDead() {
        return this.energy == 0;
    }


    isChickenDead() {
        return this.chickenEnergy == 0;
    }


    isBossDead() {
        return this.ernergyBoss == 0;
    }

    
    moveRight() {
        this.x += this.speed;
    }


    fallDown() {
        this.y += 30;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 18;
    }
}