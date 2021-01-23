import { CST } from '../const/CST';

export class ChooseScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.CHOOSELEVEL
        })
    }

    preload(){
        this.anims.create({
            key: 'ButtonHighlighted',
            frameRate: 10,
            frames: this.anims.generateFrameNames('levelButtons', {
                prefix: 'Button',
                suffix: '.png',
                start: 0,
                end: 0,
                zeroPad: 1
            })
        });

        this.anims.create({
            key: 'ButtonSteady',
            frameRate: 10,
            frames: this.anims.generateFrameNames('levelButtons', {
                prefix: 'Button',
                suffix: '.png',
                start: 1,
                end: 1,
                zeroPad: 1
            })
        });

        const level1 = this.physics.add.sprite(this.game.renderer.width / 3, this.game.renderer.height / 2 - 100, CST.SPRITE.LEVELBUTTON).setOrigin(0);
        level1.anims.play('ButtonSteady');
        level1.setInteractive();

        level1.on('pointerover', () => {
            level1.anims.play('ButtonHighlighted');
         });

        level1.on('pointerout', () => {
            level1.anims.play('ButtonSteady');
        });

        level1.on('pointerup', () => {
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.scene.start(CST.SCENES.GAME);
                },
                loop: false
            });
        });

        this.make.text({
            x: this.game.renderer.width / 3 + 75,
            y: this.game.renderer.height / 2 - 88,
            text: 'Jungle',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });

        const level2 = this.physics.add.sprite(this.game.renderer.width / 3, this.game.renderer.height / 2, CST.SPRITE.LEVELBUTTON).setOrigin(0);
        level2.anims.play('ButtonSteady');
        level2.setInteractive();

        level2.on('pointerover', () => {
            level2.anims.play('ButtonHighlighted');
         });

        level2.on('pointerout', () => {
            level2.anims.play('ButtonSteady');
        });

        this.make.text({
            x: this.game.renderer.width / 3 + 78,
            y: this.game.renderer.height / 2 + 12,
            text: 'Snow',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });

        const level3 = this.physics.add.sprite(this.game.renderer.width / 3, this.game.renderer.height / 2 + 100, CST.SPRITE.LEVELBUTTON).setOrigin(0);
        level3.anims.play('ButtonSteady');
        level3.setInteractive();

        level3.on('pointerover', () => {
            level3.anims.play('ButtonHighlighted');
         });

        level3.on('pointerout', () => {
            level3.anims.play('ButtonSteady');
        });

        this.make.text({
            x: this.game.renderer.width / 3 + 75,
            y: this.game.renderer.height / 2 + 112,
            text: 'Space',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });

        const BackImg = this.add.image(this.game.renderer.width / 3, this.game.renderer.height / 2 + 200, CST.IMAGES.BUTTON)
            .setOrigin(0).setScale(3);
        const BackText = this.make.text({
            x: this.game.renderer.width / 3 + 73,
            y: this.game.renderer.height / 2 + 242,
            text: 'Back',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '20px',
                color: '#000000'
            }
        });
        BackImg.setInteractive();

        BackImg.on('pointerup', () => {
            BackImg.setScale(3.25);
            BackText.setScale(1.08333);
            BackText.setX(BackText.x + 5);
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    BackImg.setScale(3);
                    BackText.setScale(1);
                    BackText.setX(BackText.x - 5);
                    this.scene.start(CST.SCENES.MENU);
                },
                loop: false
            });
        });
    }
}