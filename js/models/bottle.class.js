class Bottle extends DrawableObject {

    x = 200 + Math.random() * 2000;
    y = 348;
    width = 60;
    height = 80;
    bottles = 0;
    percentage = 0;
    BOTTLE = 'img/6.botella/2.Botella_enterrada2.png';

    
    constructor() {
        super().loadImage(this.BOTTLE);
    }



}