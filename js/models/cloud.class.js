class Cloud extends MovableObject {
    x =  Math.random() * 500;
    y = 50;
    width = 600;
    height = 310;

    
    constructor() {
        super().loadImage('img/5.Fondo/Capas/4.nubes/1.png');
        this.animate();
        this.speed = 0.3;
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 60);
    }

}