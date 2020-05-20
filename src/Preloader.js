class Preloader extends Phaser.Scene{
    constructor(){
        super("Preloader");
    }
    preload(){
        this.load.image("sky","bp.png");
        this.load.image("platform","ground.png");
        this.load.image("loadingScreen","intro.png");
        this.load.spritesheet('player','goku(2).png',
        {frameWidth:300,frameHeight:300});
        this.load.image("coin","coin.png");
        this.load.image("rock","Saibamen.png");
        this.load.image("gameOver","game_over.png");
        this.load.image("gameWin","game_won.jpg");
        this.load.image("bullet","energy-blast.png");
        this.load.audio("bgmusic","musicdbztrim.mp3");
        this.load.audio("kiBlastSound","kiBlast.mp3");
        this.load.audio("coinAudio","coinAudio.wav");
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
