import { CST } from '../const/CST';
import { SETTINGS } from '../const/SETTINGS';

export class MenuScene extends Phaser.Scene{
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private isPlayable!: boolean;
    private lastFired!: number;
    private bullets!: Phaser.Physics.Arcade.Group;
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }

    preload(){
        this.lastFired = 0;
        this.isPlayable = false;
    }

    update(time: number){
        if (this.isPlayable) {
            if (this.cursors.left.isDown)
                {
                    if (this.player.x > this.game.renderer.width / 4)
                        this.player.setVelocityX(-160);
                    else
                        this.player.setVelocityX(-((160 + this.player.x - this.game.renderer.width / 4) % 161));

                    this.player.anims.play('left');
                }
                else if (this.cursors.right.isDown)
                {
                    if (this.player.x < this.game.renderer.width / 4)
                        this.player.setVelocityX(160);
                    else
                        this.player.setVelocityX(((160 + this.game.renderer.width / 4 - this.player.x) % 161));

                    this.player.anims.play('right', true);
                }
                else {
                    this.player.setVelocityX(0);

                    this.player.anims.play('turn');
                }
            if (this.cursors.up.isDown)
                {
                    if (this.player.y > this.game.renderer.height * 3 / 4)
                        this.player.setVelocityY(-160);
                    else
                        this.player.setVelocityY(-((160 + this.player.y - this.game.renderer.height * 3 / 4) % 161));

                    this.player.anims.play('turn');
                }
            else if (this.cursors.down.isDown)
                {
                    if (this.player.y < this.game.renderer.height * 3 / 4)
                        this.player.setVelocityY(160);
                    else
                        this.player.setVelocityY(((160 + this.game.renderer.height * 3 / 4 - this.player.y) % 80));

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
                    const bullet = this.bullets.create(this.player.x, this.player.y - 10, CST.IMAGES.BULLET)
                    .setDepth(9).setScale(0.25);
                    bullet.setVelocityY(-600);
                    bullet.setAcceleration(0, -50);
                }
        }
    }

    create(){
        this.sound.stopAll();
        if (this.anims.get('turn')) {
            this.anims.get('left').destroy();
            this.anims.get('turn').destroy();
            this.anims.get('right').destroy();
        }
        this.anims.create({
            key: 'left',
            frames: [ { key: SETTINGS.STATE.PLANE, frame: 0 } ],
            frameRate: 24,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: SETTINGS.STATE.PLANE, frame: 1 } ],
            frameRate: 24
        });

        this.anims.create({
            key: 'right',
            frames: [ { key: SETTINGS.STATE.PLANE, frame: 2 } ],
            frameRate: 24,
            repeat: -1
        });

        this.bullets = this.physics.add.group();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.sound.pauseOnBlur = false;
        this.sound.volume = 1;
        this.sound.play(CST.AUDIO.MAINIMENU, {
            loop: true,
            volume: +SETTINGS.STATE.MUSIC
        });

        this.player = this.physics.add.sprite(this.game.renderer.width / 4, this.game.renderer.height + 200, CST.SPRITE.PLANE)
        .setScale(1.5).setDepth(10);
        this.player.anims.play('turn');
        this.tweens.add({
            targets: this.player,
            y: this.game.renderer.height * 3 / 4,
            duration: 1000,
            ease: 'Power1'
        });

        const mainText = this.make.text({
            x: this.game.renderer.width / 2 - 200 ,
            y: 50,
            text: 'AIRBORNE',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '82px',
                color: '#000000'
            }
        }).setDepth(1).setOrigin(0);

        const helpText = this.make.text({
            x: this.game.renderer.width - 25,
            y: 25,
            text: 'Press \'H\' to show control keys and to toggle learning mode',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '18px',
                color: '#000000',
                wordWrap: { width: 200 }
            }
        }).setDepth(1).setOrigin(1, 0);

        const hintsText = this.make.text({
            x: this.game.renderer.width - 10,
            y: 125,
            text: 'Use arrows to navigate your ship, space to shoot',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '18px',
                color: '#000000',
                wordWrap: { width: 200 }
            }
        }).setDepth(1).setVisible(false).setOrigin(1, 0);

        this.input.keyboard.on('keydown-H', () => {
            hintsText.setVisible(!hintsText.visible);
            this.isPlayable = !this.isPlayable;
            if (this.isPlayable === false) {
                this.player.anims.play('turn');
                this.player.setVelocity(0);
                this.tweens.add({
                    targets: this.player,
                    y: this.game.renderer.height * 3 / 4,
                    x: this.game.renderer.width / 4,
                    duration: 1500,
                    ease: 'Power1'
                });
            }
       });

        this.cameras.main.backgroundColor.setTo(234, 234, 234);
        const background = this.add.image(0, -100, CST.IMAGES.SKY1).setOrigin(0).setScale(2.1621621621621623);

        const playImg = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height / 2 - 80, CST.IMAGES.BUTTON).setOrigin(0).setScale(3);
        const playText = this.make.text({
            x: this.game.renderer.width / 2 + 175,
            y: this.game.renderer.height / 2 - 38,
            text: 'Play',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '20px',
                color: '#000000'
            }
        });
        playImg.setInteractive();

        playImg.on('pointerup', () => {
            playImg.setScale(3.25);
            playText.setScale(1.08333);
            playText.setX(playText.x + 5);
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    playImg.setScale(3);
                    playText.setScale(1);
                    playText.setX(playText.x - 5);
                },
                loop: false
            });
            [playImg, playText, optionsImg, optionsText, creditsImg, creditsText, mainText, hintsText, helpText].map((elem) => {
                this.tweens.add({
                    targets: elem,
                    y: elem.y + 150,
                    alpha: { from: 1, to: 0 },
                    duration: 1500,
                    ease: 'Power1'
                });
            })
            this.tweens.add({
                targets: this.player,
                y: 0,
                duration: 2000,
                ease: 'Power1'
            });
            this.time.addEvent({
                delay: 1500,
                callback: () => {
                    this.sound.stopAll();
                    this.scene.start(CST.SCENES.CHOOSELEVEL);
                },
                loop: false
            });
        });

        const optionsImg = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height / 2 + 20, CST.IMAGES.BUTTON)
            .setOrigin(0).setScale(3);
        const optionsText = this.make.text({
            x: this.game.renderer.width / 2 + 160,
            y: this.game.renderer.height / 2 + 62,
            text: 'Options',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '20px',
                color: '#000000'
            }
        });
        optionsImg.setInteractive();

        optionsImg.on('pointerup', () => {
            optionsImg.setScale(3.25);
            optionsText.setX(optionsText.x + 5);
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    optionsImg.setScale(3);
                    optionsText.setX(optionsText.x - 5);
                    this.time.addEvent({
                        delay: 300,
                        callback: () => {
                            this.sound.stopAll();
                            this.scene.start(CST.SCENES.OPTIONSSCENE);
                        },
                        loop: false
                    });
                },
                loop: false
            });
        });

        const creditsImg = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height / 2 + 120, CST.IMAGES.BUTTON).setOrigin(0).setScale(3);
        const creditsText = this.make.text({
            x: this.game.renderer.width / 2 + 160,
            y: this.game.renderer.height / 2 + 162,
            text: 'Credits',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '20px',
                color: '#000000'
            }
        });
        creditsImg.setInteractive();

        creditsImg.on('pointerup', () => {
            creditsImg.setScale(3.25);
            creditsText.setScale(1.08333);
            creditsText.setX(creditsText.x + 5);
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    creditsImg.setScale(3);
                    creditsText.setScale(1);
                    creditsText.setX(creditsText.x - 5);
                    this.sound.stopAll();
                    this.scene.start(CST.SCENES.CREDITSCENE);
                },
                loop: false
            });
        });

        this.tweens.timeline({
            tweens: [{
                targets: [background, mainText, playImg, playText, optionsImg, optionsText, creditsImg, creditsText],
                alpha: {from: 0, to: 1},
                ease: 'Linear',
                duration: 2000
            }]
        });
    }
}