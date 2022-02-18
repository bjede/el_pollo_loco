class CoinBar extends DrawableObject {
    percentage = 0;
    IMAGES_COIN = [
        'img/7.Marcadores/Barra/Marcador moneda/azul/0_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/20_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/40_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/60_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/80_.png',
        'img/7.Marcadores/Barra/Marcador moneda/azul/100_.png'
    ];

    
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 10;
        this.y = 80;
        this.width = 150;
        this.height = 50;
        this.setPercentage(0);
    }


    setPercentage(percentage) {
        this.percentage = percentage;
        let imagePath = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[imagePath];
    }


    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1
        } else {
            return 0;
        }
    }
}