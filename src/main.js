window.addEventListener('load',(event)=>{
    const div = document.createElement('div');
    div.id = 'canvasDiv';
    document.body.appendChild(div);
    
    const canvas = document.getElementsByTagName('canvas')[0];
    canvas.id = 'gameCanvas';
    
    div.appendChild(canvas);
    //div.setAttribute("style","width:100%;height:100vh;position:relative;")
})
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
