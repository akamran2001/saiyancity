class Preloader extends Phaser.Scene{
    constructor(){
        super("Preloader");
    }
    preload(){
        this.load.image("sky","/assets/bp.png");
        this.load.image("platform","/assets/ground.png");
        this.load.image("loadingScreen","/assets/intro.png");
        this.load.spritesheet('player','/assets/goku(2).png',
        {frameWidth:300,frameHeight:300});
        this.load.image("coin","/assets/coin.png");
        this.load.image("rock","/assets/Saibamen.png");
        this.load.image("gameOver","/assets/game_over.png");
        this.load.image("gameWin","/assets/game_won.jpg");
        this.load.image("bullet","/assets/energy-blast.png");
        this.load.audio("bgmusic","/assets/musicdbztrim.mp3");
    }
    create(){
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.loadScreen = this.add.image(config.width/2,config.height/2,"loadingScreen");
        this.loadScreen.setScale(.25);
        this.add.text(config.width/4,config.height-30,"Press Space to Start Game",{fontSize:'30px',allign:'center'}).setOrigin(0,0);
    }
    update(){
        if(this.cursorKeys.space.isDown){
            this.scene.start("Level1");
        }
    }
}
