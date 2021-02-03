import { CST } from '../const/CST';

export class HUDScene extends Phaser.Scene{
    private scoreText!: Phaser.GameObjects.Text;
    private heart1!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private heart2!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private heart3!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    constructor(){
        super({
            key: CST.SCENES.HUDSCENE
        })
    }

    preload(){
        this.anims.create({
            key: 'HeartFull',
            frameRate: 10,
            frames: this.anims.generateFrameNames('HealthHearts', {
                prefix: 'tile00',
                suffix: '.png',
                start: 0,
                end: 0,
                zeroPad: 1
            })
        });

        this.anims.create({
            key: 'HeartHalf',
            frameRate: 10,
            frames: this.anims.generateFrameNames('HealthHearts', {
                prefix: 'tile00',
                suffix: '.png',
                start: 1,
                end: 1,
                zeroPad: 1
            })
        });

        this.anims.create({
            key: 'HeartEmpty',
            frameRate: 10,
            frames: this.anims.generateFrameNames('HealthHearts', {
                prefix: 'tile00',
                suffix: '.png',
                start: 2,
                end: 2,
                zeroPad: 1
            })
        });
    }

    create(){
        this.add.image(25, this.game.renderer.height, CST.IMAGES.HPBACK).setOrigin(0, 1);

        this.add.image(this.game.renderer.width / 2 - 50, this.game.renderer.height, CST.IMAGES.SCORE).setOrigin(0, 1);

        this.heart1 = this.physics.add.sprite(100, this.game.renderer.height - 10, CST.SPRITE.HEART).setOrigin(0, 1);
        this.heart1.anims.play('HeartFull');
        this.heart2 = this.physics.add.sprite(155, this.game.renderer.height - 10, CST.SPRITE.HEART).setOrigin(0, 1);
        this.heart2.anims.play('HeartFull');
        this.heart3 = this.physics.add.sprite(210, this.game.renderer.height - 10, CST.SPRITE.HEART).setOrigin(0, 1);
        this.heart3.anims.play('HeartFull');

        this.scoreText = this.make.text({
            x: this.game.renderer.width / 2 + 15,
            y: this.game.renderer.height - 50,
            text: 'Score:\n' + this.registry.get('score'),
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '20px',
                color: '#ffffff'
            }
        }).setDepth(11);
    }

    update(){
        this.scoreText.setText('Score: \n' + this.registry.get('score'));

        if (this.registry.get('health') === 6)
            this.heart3.anims.play('HeartFull');
        if (this.registry.get('health') === 5)
            this.heart3.anims.play('HeartHalf');
        if (this.registry.get('health') === 4)
            this.heart3.anims.play('HeartEmpty');
        if (this.registry.get('health') === 3)
            this.heart2.anims.play('HeartHalf');
        if (this.registry.get('health') === 2)
            this.heart2.anims.play('HeartEmpty');
        if (this.registry.get('health') === 1)
            this.heart1.anims.play('HeartHalf');
        if (this.registry.get('health') === 0)
            this.heart1.anims.play('HeartEmpty');
    }
}