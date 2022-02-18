class ThrowableObject extends MovableObject {
    keyboard = new Keyboard();
    endBoss = new Endboss();
    colligingGround;
    bottleAnimation;
    throwAnimation;

    IMAGES_BOTTLE = [
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 3.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 4.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 5.png',
        'img/6.botella/Rotación/Mesa de trabajo 1 copia 6.png'

    ];

    IMAGES_SPLASH = [
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 7.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 8.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 9.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 10.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 11.png',
        'img/6.botella/Rotación/Splash de salsa/Mesa de trabajo 1 copia 12.png',

    ];


    constructor(x, y) {
        super().loadImage('img/7.Marcadores/Icono/Botella.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x + 100;
        this.y = y + 20;
        this.width = 60;
        this.height = 80;
        this.throw(x, y);
    }


    throw(x, y) {
        this.throwCoordinates(x, y);
        this.throwBottle();
        this.playBottleAnimation();
        this.bottleCollidedGround();
    }


    throwCoordinates(x, y) {
        this.x = x + 100;
        this.y = y + 50;
        this.speedY = 10;
    }


    throwBottle() {
        this.applyGravity();
        this.throwAnimation = setInterval(() => {
            this.x += 17;
        }, 1000 / 25);
    }


    playBottleAnimation(time) {
        this.bottleAnimation = setInterval(() => {
            if (!this.isColliding(this.endBoss)) return this.playAnimation(this.IMAGES_BOTTLE);
        }, 100);
    }


    bottleCollidedGround() {
        setInterval(() => {
            if (this.y > 320 || this.isColliding(this.endBoss)) {
                clearInterval(this.bottleAnimation);
                clearInterval(this.throwAnimation);
                clearInterval(this.gravityAnimation);
                this.playAnimation(this.IMAGES_SPLASH);
            }
        }, 110);


    }
}