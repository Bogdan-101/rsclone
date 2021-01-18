import { CST } from '../const/CST';
export class GameScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.GAME
        })
    }
    init(){
        console.log('game')
    }
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

    preload(){

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

        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = this.physics.add.sprite(100, 450, CST.SPRITE.PLANE);
    }

    update(){
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

        if (!(this.cursors.down.isDown || this.cursors.up.isDown || this.cursors.right.isDown || this.cursors.left.isDown))
        {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);

            this.player.anims.play('turn');
        }
    }

    create(){
        
    }
}