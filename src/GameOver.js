class GameOver extends Phaser.Scene{
    constructor(){
        super("GameOver");
    }
    init(data){
        this.data = data
    }
    create(){
        this.add.image(0,0,this.data.key).setOrigin(0,0).setScale(this.data.scale);
        this.time.delayedCall(1000,this.reload,[],this);
    }
    update(){

    }
    reload(){
        if (frames.confirm("Do you wish to play again?")) {
            frames.location.reload(true);
        } 
    }
}