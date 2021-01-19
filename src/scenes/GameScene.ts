import { Game } from 'phaser';
import { CST } from '../const/CST';
import Enemy from '../planes/Enemy'
import IEnemy from '../planes/IEnemy'
export class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.GAME
        })
    }
    init(){
    }
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private background!: Phaser.GameObjects.TileSprite;
    private bullets!: Phaser.Physics.Arcade.Group;
    private lastSpawned!: number;
    private lastFired!: number;
    private enemies!: Phaser.GameObjects.Group;
    private isDead!: boolean;

    preload(){
        this.lastFired = 0;
        this.anims.create({
            key: 'left',
            frames: [ { key: CST.SPRITE.PLANE, frame: 0 } ],
            frameRate: 24,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: CST.SPRITE.PLANE, frame: 1 } ],
            frameRate: 24
        });
        
        this.anims.create({
            key: 'right',
            frames: [ { key: CST.SPRITE.PLANE, frame: 2 } ],
            frameRate: 24,
            repeat: -1
        });

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

        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.sprite(100, 450, CST.SPRITE.PLANE);
        this.player.setCollideWorldBounds(true);
    }

    update(time: number, delta: number){
        if (this.isDead === false) {
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
    
            this.background.tilePositionY -= 0.5;
    
            if (this.cursors.space.isDown && time > this.lastFired) {
                if (typeof(this.lastSpawned) === 'undefined')
                    this.lastSpawned = time;
                this.lastFired = time + 200;
                const bullet = this.bullets.create(this.player.x, this.player.y - 10, CST.IMAGES.BULLET).setDepth(-2).setScale(0.25);
                bullet.setVelocityY(-600);
                bullet.setAcceleration(0, -50);
            }
    
            if (time > this.lastSpawned) {
                this.lastSpawned = time + 3000;
                const enemy = this.enemies.get(Phaser.Math.Between(100, 700), 50, CST.SPRITE.ENEMY);
                enemy.init(this.player);
                this.physics.add.collider(this.bullets, enemy, ()=>{
                    enemy.Die();
                    //@ts-ignore
                }, null, this);
                enemy.setTarget(this.player!)
            }
        }
    }
    
    GameOver(): void{
        this.isDead = true;
        this.physics.pause();
        this.player.setTint(0xff5555);
        this.add.rectangle(0, 0, this.renderer.width, this.renderer.height, 0x000000, 0.6).setOrigin(0).setDepth(1).setScale(2);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGES.GAMEOVER).setDepth(5);
        const restartButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, CST.IMAGES.RESTART).setDepth(5).setScale(2.5);

        restartButton.setInteractive();

        restartButton.on('pointerup', () => {
            restartButton.setScale(2.75);
            restartButton.setScale(1.08333);
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
                    this.scene.start(CST.SCENES.GAME);
                },
                loop: false
            });
        });

        const homeButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, CST.IMAGES.HOME).setDepth(6).setScale(2.5);

        homeButton.setInteractive();

        homeButton.on('pointerup', () => {
            homeButton.setScale(2.75);
            homeButton.setScale(1.08333);
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

        this.cameras.main.shake(300);
        for (let i = 0; i < 20; i += 1) {
            this.time.addEvent({
                delay: 250 * i,
                callback: ()=>{
                    const expl: Phaser.GameObjects.Sprite = this.add.sprite(this.player.x + Phaser.Math.Between(-20, 20), this.player.y + Phaser.Math.Between(-20, 20), 'explosion2');
                    expl.play('explode');
                    this.time.addEvent({
                        delay: 450,
                        callback: ()=>{
                            expl.destroy();
                        },
                        loop: false
                    });
                    this.player.setRotation(this.player.rotation += 0.5);
                    this.player.setScale(this.player.scale - 0.05);
                },
                loop: false
            });
        }
        this.background.tilePositionY = 0;
    }

    create(){
        this.isDead = false;
        this.bullets = this.physics.add.group();
        this.enemies = this.physics.add.group({
            classType: Enemy,
			runChildUpdate: true
        })
        
        for (let i=0; i < 5; i += 1) {
            const enemy = this.enemies.get(Phaser.Math.Between(0, 800), 50, CST.SPRITE.ENEMY);
            enemy.init(this.player);
            this.physics.add.collider(this.bullets, enemy, ()=>{
                enemy.Die();
                //@ts-ignore
            }, null, this);
        }

        this.enemies.children.each(child => {
			const enemy = child as unknown as IEnemy
			enemy.setTarget(this.player!)
		})

        this.background = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, CST.IMAGES.STAGE).setDepth(-3).setOrigin(0).setScale(3.125);
    }
}