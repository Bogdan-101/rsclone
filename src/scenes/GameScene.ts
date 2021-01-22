import { Game } from 'phaser';
import { CST } from '../const/CST';
import Enemy from '../planes/Enemy'
import Hero from '../planes/HeroPlane';
import IEnemy from '../planes/IEnemy'
export class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.GAME
        })
    }
    init(){
    }
    
    private player!: Hero;
    private background!: Phaser.GameObjects.TileSprite;
    private lastSpawned!: number;
    private enemies!: Phaser.GameObjects.Group;

    preload(){
        this.anims.create({
            key: 'explode',
            frameRate: 10,
            frames: this.anims.generateFrameNames('explosion2', {
                prefix: 'tile00',
                suffix: '.png',
                start: 0,
                end: 6,
                zeroPad: 1
            })
        });

        this.anims.create({
            key: 'enemyExplode',
            frameRate: 10,
            frames: this.anims.generateFrameNames('explosion1', {
                prefix: 'tile00',
                suffix: '.png',
                start: 0,
                end: 5,
                zeroPad: 1
            })
        });
        
        this.anims.create({
            key: 'moveLeft',
            frameRate: 10,
            frames: this.anims.generateFrameNames('enemyPlane', {
                prefix: 'tile00',
                suffix: '.png',
                start: 0,
                end: 0,
                zeroPad: 1
            })
        });

        this.anims.create({
            key: 'moveRight',
            frameRate: 10,
            frames: this.anims.generateFrameNames('enemyPlane', {
                prefix: 'tile00',
                suffix: '.png',
                start: 2,
                end: 2,
                zeroPad: 1
            })
        });

        this.anims.create({
            key: 'enemyIdle',
            frameRate: 10,
            frames: this.anims.generateFrameNames('enemyPlane', {
                prefix: 'tile00',
                suffix: '.png',
                start: 1,
                end: 1,
                zeroPad: 1
            })
        });

        this.anims.create({
            key: 'enemyDie',
            frameRate: 5,
            frames: this.anims.generateFrameNames('enemyPlane', {
                prefix: 'tile00',
                suffix: '.png',
                start: 3,
                end: 4,
                zeroPad: 1
            })
        });

        this.tweens.add({
            targets: this.player,
            y: this.game.renderer.height - 100,
            duration: 1000,
            ease: 'Power1'
        });
        
    }

    update(time: number, delta: number){
        this.player.update(time, delta);
        if (typeof(this.lastSpawned) === 'undefined')
            this.lastSpawned = time + 5000;
        if (this.player.health !== 0) {
            this.background.tilePositionY -= 0.5;
    
            if (time > this.lastSpawned) {
                this.lastSpawned = time + 1000;
                const enemy = this.enemies.get(Phaser.Math.Between(100, 700), -50, CST.SPRITE.ENEMYATLAS);
                enemy.init(this.player.player, this);
                this.tweens.add({
                    targets: enemy,
                    y: 50,
                    duration: 1000,
                    ease: 'Power1'
                });
                this.physics.add.collider(this.player.bullets, enemy, ()=>{
                    enemy.Die();
                    //@ts-ignore
                }, null, this);
                enemy.setTarget(this.player.player!)
            }
        }
    }
    
    Hit(s: any): void{
        this.registry.set('health', this.player.health);
        if (s)
            s.destroy();
        if (this.player.Hit() !== 0) {
            return;
        }
        this.scene.pause(CST.SCENES.HUDSCENE);
        this.scene.setVisible(false, CST.SCENES.HUDSCENE);
        this.physics.pause();
        this.player.player.setTint(0xff5555);
        this.add.rectangle(0, 0, this.renderer.width, this.renderer.height, 0x000000, 0.6).setOrigin(0).setDepth(1).setScale(2);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGES.GAMEOVER).setDepth(5);
        const restartButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, CST.IMAGES.RESTART).setDepth(5).setScale(2.5);

        restartButton.setInteractive();

        restartButton.on('pointerup', () => {
            restartButton.setScale(2.75);
            this.time.addEvent({
                delay: 100,
                callback: ()=>{
                    restartButton.setScale(2.5);
                },
                loop: false
            });
            this.time.addEvent({
                delay: 200,
                callback: ()=>{
                    this.sound.stopAll();
                    this.scene.stop();
                    this.scene.start(CST.SCENES.GAME);
                    this.scene.resume(CST.SCENES.HUDSCENE);
                    this.scene.setVisible(true, CST.SCENES.HUDSCENE);
                },
                loop: false
            });
        });

        const homeButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, CST.IMAGES.HOME).setDepth(6).setScale(2.5);

        homeButton.setInteractive();

        homeButton.on('pointerup', () => {
            homeButton.setScale(2.75);
            this.time.addEvent({
                delay: 100,
                callback: ()=>{
                    homeButton.setScale(2.5);
                },
                loop: false
            });
            this.time.addEvent({
                delay: 200,
                callback: ()=>{
                    this.sound.stopAll();
                    this.scene.start(CST.SCENES.MENU);
                },
                loop: false
            });
        });

        this.cameras.main.shake(300, 0.02);
        for (let i = 0; i < 20; i += 1) {
            this.time.addEvent({
                delay: 250 * i,
                callback: ()=>{
                    const expl: Phaser.GameObjects.Sprite = this.add.sprite(
                        this.player.player.x + Phaser.Math.Between(-20, 20),
                        this.player.player.y + Phaser.Math.Between(-20, 20),
                        'explosion2'
                        );
                    expl.play('explode');
                    this.time.addEvent({
                        delay: 450,
                        callback: ()=>{
                            expl.destroy();
                        },
                        loop: false
                    });
                    this.player.player.setRotation(this.player.player.rotation += 0.5);
                    this.player.player.setScale(this.player.player.scale - 0.05);
                },
                loop: false
            });
        }
        this.background.tilePositionY = 0;
    }

    create(){
        this.scene.launch(CST.SCENES.HUDSCENE);
        this.player = new Hero(this, this.game.renderer.width / 2, this.game.renderer.height -200, CST.SPRITE.PLANE);
        this.enemies = this.physics.add.group({
            classType: Enemy,
			runChildUpdate: true
        })
        
        for (let i=0; i < 5; i += 1) {
            const enemy = this.enemies.get(Phaser.Math.Between(100, 800), -50, CST.SPRITE.ENEMYATLAS);
            enemy.init(this.player.player, this);
            this.tweens.add({
                targets: enemy,
                y: 50,
                duration: 1000,
                ease: 'Power1'
            });
            this.physics.add.collider(this.player.bullets, enemy, ()=>{
                enemy.Die();
                //@ts-ignore
            }, null, this);
        }

        this.enemies.children.each(child => {
			const enemy = child as unknown as IEnemy
			enemy.setTarget(this.player.player!)
		})

        this.background = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, CST.IMAGES.STAGE).setDepth(-3).setOrigin(0).setScale(3.125);
    }
}