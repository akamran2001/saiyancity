const WIDTH = 800;
const HEIGHT = 600;
const config = {
    width: WIDTH,
    height: HEIGHT,
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{y: 200},
            debug:false
        }
    },
    pixelArt:true,
    scene:[Preloader,Level1,GameOver]
}
let game = new Phaser.Game(config);
