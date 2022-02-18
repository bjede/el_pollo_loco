class Chicken extends MovableObject {
    x;
    y = 348;
    width = 60;
    height = 80;
    currentImage = 0;
    chickenInverval;
    chickenWalkingInverval;


    IMAGES_WALKING = [
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
        'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png',
    ];


    IMAGES_DEAD = 'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/4.G_muerte.png';


    constructor() {
        super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');
        this.x = 1200 + Math.random() * 2000;
        this.loadImages(this.IMAGES_WALKING);
        this.speed = 0.15 + Math.random() * 0.8;
        this.animate();
    }


    animate() {
        this.moveToLeft();
        this.checkIsChickenDead();
    }


    checkIsChickenDead() {
      this.chickenWalkingInverval = setInterval(() => {
            (!this.isChickenDead()) ? this.playAnimation(this.IMAGES_WALKING) : this.loadImage(this.IMAGES_DEAD);
        }, 100);
    }


    moveToLeft() {
      this.chickenInverval = setInterval(() => {
            if (!this.isChickenDead()) return this.moveLeft();
        }, 1000 / 60);
    }

    
    clearChickenInverval(){
        clearInterval(this.chickenInverval);
    }

}