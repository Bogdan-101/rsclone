import { CST } from '../const/CST';

export class HUDScene extends Phaser.Scene{
    private healthText!: Phaser.GameObjects.Text;
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

        this.heart1 = this.physics.add.sprite(100, this.game.renderer.height - 10, CST.SPRITE.HEART).setOrigin(0, 1);
        this.heart1.anims.play('HeartFull');
        this.heart2 = this.physics.add.sprite(155, this.game.renderer.height - 10, CST.SPRITE.HEART).setOrigin(0, 1);
        this.heart2.anims.play('HeartFull');
        this.heart3 = this.physics.add.sprite(210, this.game.renderer.height - 10, CST.SPRITE.HEART).setOrigin(0, 1);
        this.heart3.anims.play('HeartFull');

        this.healthText = this.make.text({
            x: this.game.renderer.width / 2 - 200 ,
            y: this.game.renderer.height / 2 - 200,
            text: this.registry.get('health'),
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '82px',
                color: '#000000'
            }
        }).setDepth(10);
    }

    update(){
        this.healthText.setText(this.registry.get('health'));

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