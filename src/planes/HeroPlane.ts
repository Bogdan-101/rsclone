import { CST } from '../const/CST';

export default class Hero extends Phaser.GameObjects.Sprite
{
    public health: number;
    public bullets!: Phaser.Physics.Arcade.Group;
    public player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private lastFired: number;
    public isDestroyable: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.health = 0;
        this.lastFired = 0;
        this.bullets = this.scene.physics.add.group();
        this.anims.play('turn');
        this.setDepth(-10);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.isDestroyable = true;

        this.player = this.scene.physics.add.sprite(
            this.x,
            this.scene.game.renderer.height + 100,
            CST.SPRITE.PLANE
        );
        this.player.setImmovable(true);

        this.scene.tweens.add({
            targets: this.player,
            y: y,
            duration: 1000,
            ease: 'Power1'
        });

        this.scene.time.addEvent({
            delay: 1250,
            callback: ()=>{
                this.player.setCollideWorldBounds(true);
            },
            loop: false
        });
        this.health = 6
        scene.registry.set('health', this.health);
    }

    Hit(): number{
        if (this.isDestroyable) {
            this.health--;
            this.isDestroyable = false;
            this.scene.time.addEvent({
                delay: 2000,
                callback: ()=>{
                    this.isDestroyable = true;
                    this.player.setAlpha(1);
                    console.log('destructable');
                },
                loop: false
            });
            this.scene.tweens.add({
                targets: this.player,
                alpha: { from: 0, to: 1},
                ease: 'Cubic.easeOut',  
                duration: 400,
                repeat: 5
              })
        }

        // console.log(this.health);
        return this.health;
    }

    update(time: number, delta: number){
            if (this.health !== 0) {
                if (this.cursors.left.isDown)
                {
                    this.player.setVelocityX(-160);
        
                    this.player.anims.play('left');
                }
                else if (this.cursors.right.isDown)
                {
                    this.player.setVelocityX(160);
        
                    this.player.anims.play('right', true);
                }
                else {
                    this.player.setVelocityX(0);
        
                    this.player.anims.play('turn');
                }
                if (this.cursors.up.isDown)
                {
                    this.player.setVelocityY(-160);
        
                    this.player.anims.play('turn');
                }
                else if (this.cursors.down.isDown)
                {
                    this.player.setVelocityY(+160);
        
                    this.player.anims.play('turn');
                }
                else if (!(this.cursors.right.isDown || this.cursors.left.isDown)) {
                    this.player.setVelocityY(0);
        
                    this.player.anims.play('turn');
                }
        
                if (!(this.cursors.up.isDown || this.cursors.down.isDown)){
                    this.player.setVelocityY(0);
                }
        
                if (!(this.cursors.down.isDown || this.cursors.up.isDown || this.cursors.right.isDown || this.cursors.left.isDown))
                {
                    this.player.setVelocityX(0);
                    this.player.setVelocityY(0);
        
                    this.player.anims.play('turn');
                }
        
                if (this.cursors.space.isDown && time > this.lastFired) {
                    this.lastFired = time + 200;
                    const bullet = this.bullets.create(this.player.x, this.player.y - 10, CST.IMAGES.BULLET).setDepth(-2).setScale(0.25);
                    bullet.setVelocityY(-600);
                    bullet.setAcceleration(0, -50);
                    this.scene.time.addEvent({
                        loop: false,
                        callback: () => {
                            bullet.destroy();
                        },
                        delay: 3000
                    })
                }
        }
    }
}