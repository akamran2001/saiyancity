class Level1 extends Phaser.Scene{
    constructor(){
        super("Level1");
        this.direction = 1;
        this.score = 0;
    }
    create(){
        this.bgMusic = this.sound.add("bgmusic",{
            loop:true,
            volume:0.5
        });
        this.kiBlastSound = this.sound.add("kiBlastSound",{
            loop:false,
            volume:0.25
        });
        this.coinSound = this.sound.add("coinAudio",{
            loop:false
        });
        this.bgMusic.play();
        this.sky = this.add.image(0,0,"sky");
        this.sky.setOrigin(0,0);
        this.sky.setScale(2);
        this.platforms = this.physics.add.staticGroup();
        this.generatePlatforms(this.platforms);
        this.coins = this.generateCoins();
        this.coins.children.iterate((child)=>{
            child.setBounceY(Phaser.Math.FloatBetween(0.1,0.7));
        });
        this.player = this.addPlayer();
        
        this.rocks = this.physics.add.group();
        this.bulletGroup = new BulletGroup(this);
        this.bulletGroup.runChildUpdate = true;
        this.handleCollision();
        
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey("SPACE");
        this.generatePlayerAnimations();
        this.displayScore = this.add.text(0,0,0,{
            fontSize:'30px'
        }).setOrigin(0,0);
    }
    update(){
        this.handleKeys(this.cursorKeys,this.spacebar);
        let scoreText = "Score: " + this.score;
        this.displayScore.setText(scoreText);
    }
    //Helpers
    shootBullet(bulletGroup, player,d){
        bulletGroup.fireBullet(player.x+10,player.y,d,this.kiBlastSound);
    }
    generateRock(rocks,player){
            // let x = (player.x < config.width/2) ? Phaser.Math.Between(config.width/2,config.width) : Phaser.Math.Between(0,config.width/2);
            // let y = (player.x < config.height/2) ? Phaser.Math.Between(config.height/2,config.height) : Phaser.Math.Between(0,config.height/2);
            let x = Phaser.Math.Between(0,config.width);
            let y = Phaser.Math.Between(0,config.height);
            let rock = rocks.create(x,0,'rock');
            rock.setScale(0.25);
            rock.setSize(rock.width*0.35,rock.height*0.5)
            rock.setBounce(1);
            rock.setCollideWorldBounds(true);
            rock.setVelocity(Phaser.Math.Between(-config.width/10,config.width/10),Phaser.Math.Between(-config.height/10,config.height/10));
    }
    generateCoins(){
        let coins = this.physics.add.group({
            key:'coin',
            repeat:10,
            setXY:{
                x:10,
                y:0,
                stepX:0.1*(config.height)
            },
            setScale:{
                x:0.1,
                y:0.1   
            },
            visible:true
        });
        return coins;
    }
    generatePlatforms(platformGroup){
        let floor = platformGroup.create(0,config.height,'platform').setScale(4,1).refreshBody();
        let platform1 = platformGroup.create(0,config.height/1.5,'platform').setScale(1.5,0.5).refreshBody();
        let platform4 = platformGroup.create(0,(platform1.y - (0.5*platform1.y)),'platform').setScale(0.9,0.5).refreshBody();
        let platform2 = platformGroup.create(config.width,config.height/1.2,'platform').setScale(1.5,0.5).refreshBody();
        let platform3 = platformGroup.create(config.width,(platform1.y - (0.25*platform1.y)),'platform').setScale(1,0.5).refreshBody();
        
    }
    handleKeys(cursorKeys){
        if(config.physics.arcade.debug){
            if(cursorKeys.down.isDown){
                if(!this.scene.isPaused(this)){
                    this.scene.pause(this);
                    console.log("paused")
                }
            }
        }
        if(cursorKeys.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-config.height/3);
        }
        let move = false;
        if(cursorKeys.right.isDown){
            this.direction = 1;
            move = true;
        }
        else if (cursorKeys.left.isDown){
            this.direction = -1;
            move = true;
        }
        else{
            move = false;
        }
        if(cursorKeys.up.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-config.height/3);
        }
        if(cursorKeys.space.isDown){
            this.shootBullet(this.bulletGroup,this.player,this.direction);
        }
        this.handleMovement(move);
    }
    handleMovement(move){
        if(this.direction>0){
            if(move){
                this.player.anims.play('right',true);
                this.player.setVelocityX(300);
            }
            else{
                if(this.player.body.touching.down){
                    this.player.anims.play('rightStand',true);
                }
                else{
                    this.player.anims.play('rightJump',true);
                    //this.player.anims.play('rightStand',true);
                }
                this.player.setVelocityX(0);
            }
        }
        else{
            if(move){
                this.player.anims.play('left',true);
                this.player.setVelocityX(-300);
            }
            else{
                if(this.player.body.touching.down){
                    this.player.anims.play('leftStand',true);
                }
                else{
                    this.player.anims.play('leftJump',true);
                }
                this.player.setVelocityX(0);
            }
        }
    }
    handleCollision(){
        this.physics.add.collider(this.platforms,this.player);
        this.physics.add.collider(this.coins,this.platforms);
        this.physics.add.overlap(this.platforms,this.bulletGroup,(platforms,bullet)=>{
            bullet.setActive(false);
            bullet.setVisible(false);
        },null,this);
        this.physics.add.overlap(this.rocks,this.bulletGroup,(rock,bullet)=>{
            rock.destroy();
            this.score += 10;
        },null,this);
        this.physics.add.overlap(this.player,this.coins,(player,coin)=>
        {
            coin.disableBody(true,true);
            this.coinSound.play();
            if(this.coins.countActive(true)===0){
                this.gameOver(true);
            }
            this.generateRock(this.rocks,this.player);
            this.generateRock(this.rocks,this.player);
            this.generateRock(this.rocks,this.player);
        },null,this);
        this.physics.add.collider(this.platforms,this.rocks);
        this.physics.add.collider(this.rocks,this.rocks);
        this.physics.add.overlap(this.player,this.rocks,(player,rock)=>{
            rock.disableBody(true,true);
            player.disableBody(true,true);
            this.gameOver(false);
        },null,this);
    }
    addPlayer(){
        let player = this.physics.add.sprite(100,450,'player');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setScale(0.20);
        player.setSize(player.width*0.65,player.height*0.75);
        return player;
    }
    generatePlayerAnimations(){
        let fps = 5;
        this.anims.create({
            key:'right',
            frames:this.anims.generateFrameNumbers('player',{start:6,end:9}),
            frameRate:fps,
            repeat:-1
        });

        this.anims.create({
            key:'rightStand',
            frames:this.anims.generateFrameNumbers('player',{start:9,end:9}),
            frameRate:fps,
            repeat:-1
        });
        this.anims.create({
            key:'leftStand',
           frames:this.anims.generateFrameNumbers('player',{start:0,end:0}),
            frameRate:fps,
            repeat:-1
        });

        this.anims.create({
            key:'rightJump',
            frames:this.anims.generateFrameNumbers('player',{start:5,end:5}),
            frameRate:fps,
            repeat:-1
        });
        this.anims.create({
            key:'leftJump',
            frames:this.anims.generateFrameNumbers('player',{start:4,end:4}),
            frameRate:fps,
            repeat:-1
        });

        this.anims.create({
            key:'left',
            frames:this.anims.generateFrameNumbers('player',{start:0,end:3}),
            frameRate:fps,
            repeat:-1
        });

    }
    gameOver(win){
        this.bgMusic.stop();
        if(win){
            this.scene.start("GameOver",{key:"gameWin",scale:1.25});
        }
        else{
            this.scene.start("GameOver",{key:"gameOver",scale:0.5});
        }
    }
}
