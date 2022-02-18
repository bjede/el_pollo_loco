class Character extends MovableObject {
    world;
    width = 150;
    height = 300;
    x = 70;
    y = 135;
    speed = 12;
    characterInterval;
    animateInterval;
    cahracterAnimationInverval;


    IMAGES_WALKING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
    ];


    IMAGES_JUMPING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/3.Secuencia_salto/J-36.png'
    ];


    IMAGES_DEAD = [
        'img/2.Secuencias_Personaje-Pepe-corrección/5.Muerte/D-55.png',
    ];


    IMAGES_HURT = [
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-41.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-42.png',
        'img/2.Secuencias_Personaje-Pepe-corrección/4.Herido/H-43.png'
    ];


    IMAGES_STANDING = [
        'img/2.Secuencias_Personaje-Pepe-corrección/1.IDLE/IDLE/I-1.png'
    ];


    constructor() {
        super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.applyGravity();
        this.animate();
    }


    animate() {
        this.characterInterval = setInterval(() => {
            this.walking_sound.pause();
            this.characterMoveRight();
            this.characterMoveLeft();
            this.characterJump();
            this.world.camera_x = -this.x + 70;
        }, 1000 / 30);
        
        this.characterAnimations();
    }


    characterAnimations() {
        this.cahracterAnimationInverval = setInterval(() => {
            if (this.isDead()) { this.playAnimation(this.IMAGES_DEAD); this.fallDown();
            } else if (this.isHurt()) {this.playAnimation(this.IMAGES_HURT); this.hurt_sound.play();
            } else if (this.isAboveGround()) {this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {this.playAnimation(this.IMAGES_WALKING);
            } else { if (!this.world.keyboard.RIGHT || !this.world.keyboard.LEFT) {this.playAnimation(this.IMAGES_STANDING);}
            }
        }, 150);
    }


    characterMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.walking_sound.play();
        }
    }

    
    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.walking_sound.play();
        }
    }


    characterJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.jump_sound.play();
        }
    }
}