class Heart extends DrawableObject {
    x = 300 + Math.random() * 2000;
    y = 80 + Math.random() * 250;
    width = 50;
    height = 50;
    coins = 0;
    percentage = 0;
    HEART = 'img/7.Marcadores/Icono/Vidas.png';


    constructor() {
        super().loadImage(this.HEART);
    }

}