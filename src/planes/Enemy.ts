import IEnemy from './IEnemy';
import { CST } from '../const/CST';

export default class Enemy extends Phaser.GameObjects.Sprite implements IEnemy
{
	private target?: Phaser.GameObjects.Components.Transform;
    private lastFired!: number;
    private rockets: Phaser.Physics.Arcade.Group;
    private isMoving: boolean;
    private isAlive: boolean;
	constructor(scene: Phaser.Scene, x: number, y: number, texture: string)
	{
        super(scene, x, y, texture);
        this.anims.play('enemyIdle');
        this.rockets = scene.physics.add.group();
        this.setDepth(-2);
        this.isMoving = false;
        this.isAlive = true;
	}
    
    init(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, scene: Phaser.Scene){
        //@ts-ignore
        this.scene.physics.add.collider(player, this.rockets, ()=>scene.GameOver(), null, this);

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers(CST.SPRITE.ENEMY, { start: 3, end: 4 }),
            frameRate: 24,
            repeat: 1
        });
    }

    CreateMovement(): void {
        let yMoving = Phaser.Math.FloatBetween(0, 100);
        let xMoving = Phaser.Math.FloatBetween(-100, 100);
        const chance = Phaser.Math.Between(0, 1);

        if (this.y + yMoving > 250 || this.y + yMoving < 0)
            yMoving = -yMoving;

        if (this.x + xMoving > 700 || this.x + xMoving < 100)
            xMoving = -xMoving;

        if (chance === 1){
            if (xMoving > 0)
                this.anims.play('moveRight');
            else
                this.anims.play('moveLeft');
            this.scene.tweens.add({
                targets: this,
                y: this.y + yMoving,
                x: this.x + xMoving,
                duration: 1000,
                ease: 'Quad.easeInOut'
            });
        }

        this.scene.time.addEvent({
            delay: 1250,
            callback: ()=>{
                this.isMoving = false;
                if (this.isAlive === true)
                    this.anims.play('enemyIdle');
            },
            loop: false
        });
    }

    Die() {
        this.anims.play('enemyDie');
        this.isAlive = false;
        const expl: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.x + Phaser.Math.Between(-5, 5), this.y + Phaser.Math.Between(-5, 5), 'explosion1');
                    expl.play('enemyExplode');
                    this.scene.time.addEvent({
                        delay: 250,
                        callback: ()=>{
                            expl.destroy();
                        },
                        loop: false
                    });
        this.destroy();
    }

	setTarget(target: Phaser.GameObjects.Components.Transform): void
	{
		this.target = target
	}

	update(t: number, dt: number): void
	{
		if (!this.target)
		{
			return
		}

		const tx = this.target.x
		const ty = this.target.y

		const x = this.x
		const y = this.y
        
		const rotation = Phaser.Math.Angle.Between(x, y, tx, ty)
        this.setRotation(rotation - 1.575);
        
        if (t > this.lastFired || typeof(this.lastFired) === 'undefined') {
            this.lastFired = t + 1500;
            const rocket = this.rockets.create(x, y + 10, CST.IMAGES.ENEMYBULLET).setRotation(rotation - 1.575);
            rocket.setVelocity(-Math.sin(rocket.rotation)*200, Math.cos(rocket.rotation)*200);
            rocket.setAcceleration(0, 10);
            // this.player.setRotation(this.player.rotation + 3.15);
        }

        if (!this.isMoving) {
            this.isMoving = true;
            this.CreateMovement();
        }
	}
}