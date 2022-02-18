class Coin extends DrawableObject {
    x = 300 + Math.random() * 2000;
    y = 80 + Math.random() * 250;
    width = 100;
    height = 100;
    coins = 0;
    percentage = 0;
    COIN = 'img/8.Coin/Moneda1.png';

    
    constructor() {
        super().loadImage(this.COIN);
    }

}