class BulletGroup extends Phaser.Physics.Arcade.Group{
    constructor(scene){
        super(scene.physics.world,scene);
        this.createMultiple({
            classType:Bullet,
            frameQuantity:3,
            setScale:{
                x:0.04,
                y:0.04
            },
            active:false,
            visible:false,
            key:"bullet"
        })
        this.i = 0;
    }
    fireBullet(x,y,d){
        const bullet = this.getFirstDead(false);
        //const bullet = this.getFirstDead(true,x,y,"bullet");
        if(bullet){
            bullet.fire(x,y,d);
            this.i++;
        }
    }
}
class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,"bullet");
    }
    fire(x,y,d){
        this.body.reset(x,y);
        this.body.setAllowGravity(false);
        this.setActive(true);
        this.setVisible(true);
        this.setVelocityX(0.9*800*d);
        
    }
    preUpdate(time,delta){
        super.preUpdate(time,delta);
        if(this.x<0 || this.x>config.width){
           this.setActive(false);
           this.setVisible(false);
        }
    }
}