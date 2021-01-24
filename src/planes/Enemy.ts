import IEnemy from './IEnemy';
import { CST } from '../const/CST';
import Hero from '../planes/HeroPlane';

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

 init(player: Hero, scene: Phaser.Scene){
        // @ts-ignore
        this.scene.physics.add.collider(player, this.rockets, (f, s) => scene.Hit(s), null, this);
        // @ts-ignore
        this.scene.physics.add.collider(player, this, () => scene.Hit(), null, this);

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers(CST.SPRITE.ENEMY, { start: 3, end: 4 }),
            frameRate: 24,
            repeat: 1
        });
    }

 CreateMovement(): void {
        if (this.scene.registry.get('health') === 0)
            return;
        let yMoving = Phaser.Math.FloatBetween(0, 100);
        let xMoving = Phaser.Math.FloatBetween(-100, 100);
        const chance = Phaser.Math.Between(0, 1);

        if (this.y + yMoving > 250 || this.y + yMoving < 0)
            yMoving = 50 - this.y;

        if (this.x + xMoving > 700)
            xMoving = 600 - this.x;
        else if (this.x + xMoving < 100)
            xMoving = 125 - this.x;

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
            callback: () => {
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
                        callback: () => {
                            expl.destroy();
                        },
                        loop: false
                    });
        this.destroy();
    }

	setTarget(target: Phaser.GameObjects.Components.Transform): void
	{
		this.target = target;
	}

	update(t: number): void
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

  if ((t > this.lastFired && this.scene.registry.get('health') !== 0) || typeof(this.lastFired) === 'undefined') {
            this.lastFired = t + 1500;
            const rocket = this.rockets.create(x, y + 10, CST.IMAGES.ENEMYBULLET).setRotation(rotation - 1.575);
            rocket.setVelocity(-Math.sin(rocket.rotation) * 200, Math.cos(rocket.rotation) * 200);
            rocket.setAcceleration(0, 10);
            this.scene.time.addEvent({
                loop: false,
                callback: () => {
                    rocket.destroy();
                },
                delay: 3000
            })
            if (!this.scene.sound.get(CST.AUDIO.ENEMYBLASTER))
                this.scene.sound.play(CST.AUDIO.ENEMYBLASTER, {volume: +CST.STATE.AUDIO * 0.05});
        }

  if (!this.isMoving && this.scene.registry.get('health') !== 0) {
            this.isMoving = true;
            this.CreateMovement();
        }
	}
}