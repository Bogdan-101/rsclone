import { CST } from '../const/CST';

export class OptionsScene extends Phaser.Scene{

    private text!: Phaser.GameObjects.Text;
    private musicText!: Phaser.GameObjects.Text;
    private effectsText!: Phaser.GameObjects.Text;
    constructor(){
        super({
            key: CST.SCENES.OPTIONSSCENE
        })
    }

    preload() {
        this.text = this.make.text({
            x: 100,
            y: this.game.renderer.height - 125,
            text: '',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });

        this.musicText = this.make.text({
            x: this.game.renderer.width - 220,
            y: this.game.renderer.height / 2 - 120,
            text: '',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });

        this.effectsText = this.make.text({
            x: 130,
            y: this.game.renderer.height / 2 - 120,
            text: '',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });

        this.make.text({
            x: this.game.renderer.width - 250,
            y: this.game.renderer.height / 2 - 170,
            text: 'Music:',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });

        this.make.text({
            x: 70,
            y: this.game.renderer.height / 2 - 170,
            text: 'Effects:',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });
    }

    update(){
        this.musicText.setText(CST.STATE.MUSIC.slice(0, 3));
        this.effectsText.setText(CST.STATE.EFFECTS.slice(0, 3));
    }

    create(){
        const upMusic = this.add.image(this.game.renderer.width - 150, this.game.renderer.height / 2 - 150, CST.IMAGES.ARROWBUTTON)
            .setScale(0.25).setOrigin(0);
        const downMusic = this.add.image(this.game.renderer.width - 150 + 19, this.game.renderer.height / 2 - 115 + 23, CST.IMAGES.ARROWBUTTON)
            .setScale(0.25).setRotation(3.1415926538);

        upMusic.setInteractive();

        upMusic.on('pointerup', () => {
            if (+CST.STATE.MUSIC + 0.1 <= 0.9)
                CST.STATE.MUSIC = (+CST.STATE.MUSIC + 0.1).toString();
            else
                CST.STATE.MUSIC = '1';
        });

        downMusic.setInteractive();

        downMusic.on('pointerup', () => {
            if (+CST.STATE.MUSIC - 0.1 >= 0.1)
                CST.STATE.MUSIC = (+CST.STATE.MUSIC - 0.1).toString();
            else
                CST.STATE.MUSIC = '0';
        });

        const upEffects = this.add.image(190, this.game.renderer.height / 2 - 150, CST.IMAGES.ARROWBUTTON)
            .setScale(0.25).setOrigin(0);
        const downEffects = this.add.image(190 + 19, this.game.renderer.height / 2 - 115 + 23, CST.IMAGES.ARROWBUTTON)
            .setScale(0.25).setRotation(3.1415926538);

        upEffects.setInteractive();

        upEffects.on('pointerup', () => {
            if (+CST.STATE.EFFECTS + 0.1 <= 0.9)
                CST.STATE.EFFECTS = (+CST.STATE.EFFECTS + 0.1).toString();
            else
                CST.STATE.EFFECTS = '1';
        });

        downEffects.setInteractive();

        downEffects.on('pointerup', () => {
            if (+CST.STATE.EFFECTS - 0.1 >= 0.1)
                CST.STATE.EFFECTS = (+CST.STATE.EFFECTS - 0.1).toString();
            else
                CST.STATE.EFFECTS = '0';
        });

        const plane1Img = this.physics.add.sprite(50, this.game.renderer.height * 3 / 5, CST.SPRITE.PLANE)
            .setFrame(1).setOrigin(0).setScale(2).setDepth(2);
        const plane2Img = this.physics.add.sprite(this.game.renderer.width / 5 + 50, this.game.renderer.height * 3 / 5, CST.SPRITE.PLANE2)
            .setFrame(1).setOrigin(0).setScale(2).setDepth(2);
        const plane3Img = this.physics.add.sprite(this.game.renderer.width * 2 / 5 + 50, this.game.renderer.height * 3 / 5, CST.SPRITE.PLANE3)
            .setFrame(1).setOrigin(0).setScale(2).setDepth(2);
        const plane4Img = this.physics.add.sprite(this.game.renderer.width * 3 / 5 + 50, this.game.renderer.height * 3 / 5, CST.SPRITE.PLANE4)
            .setFrame(1).setOrigin(0).setScale(2).setDepth(2);
        const plane5Img = this.physics.add.sprite(this.game.renderer.width * 4 / 5 + 50, this.game.renderer.height * 3 / 5, CST.SPRITE.PLANE5)
            .setFrame(1).setOrigin(0).setScale(2).setDepth(2);

        const back1 = this.add.rectangle(
            40,
            this.game.renderer.height * 3 / 5 - 10,
            78,
            103,
            0xffffff
            )
            .setVisible(false).setOrigin(0).setDepth(1).setAlpha(0.4);

        plane1Img.setInteractive();

        plane1Img.on('pointerover', () => {
            back1.setVisible(true);
         })

        plane1Img.on('pointerout', () => {
            back1.setVisible(false);
        });

        plane1Img.on('pointerup', () => {
            this.text.setText('Red  eagle  will  fight  for  your  life  from  now  on!');

            CST.STATE.PLANE = plane1Img.texture.key;
        });

        const back2 = this.add.rectangle(
            this.game.renderer.width / 5 + 40,
            this.game.renderer.height * 3 / 5 - 10,
            78,
            103,
            0xffffff
            )
            .setVisible(false).setOrigin(0).setDepth(1).setAlpha(0.4);

        plane2Img.setInteractive();

        plane2Img.on('pointerover', () => {
            back2.setVisible(true);
         })

        plane2Img.on('pointerout', () => {
            back2.setVisible(false);
        });

        plane2Img.on('pointerup', () => {
            this.text.setText('The  best  of  the  beast  -  King\'s  aviation  is  yours!');

            CST.STATE.PLANE = plane2Img.texture.key;
        });

        const back3 = this.add.rectangle(
            this.game.renderer.width * 2 / 5 + 40,
            this.game.renderer.height * 3 / 5 - 10,
            78,
            103,
            0xffffff
            )
            .setVisible(false).setOrigin(0).setDepth(1).setAlpha(0.4);

        plane3Img.setInteractive();

        plane3Img.on('pointerover', () => {
            back3.setVisible(true);
         })

        plane3Img.on('pointerout', () => {
            back3.setVisible(false);
        });

        plane3Img.on('pointerup', () => {
            this.text.setText('The  mercenaries  lent  you  a  plane,  but  not  for  long');

            CST.STATE.PLANE = plane3Img.texture.key;
        });

        const back4 = this.add.rectangle(
            this.game.renderer.width * 3 / 5 + 40,
            this.game.renderer.height * 3 / 5 - 10,
            78,
            103,
            0xffffff
            )
            .setVisible(false).setOrigin(0).setDepth(1).setAlpha(0.4);

        plane4Img.setInteractive();

        plane4Img.on('pointerover', () => {
            back4.setVisible(true);
         })

        plane4Img.on('pointerout', () => {
            back4.setVisible(false);
        });

        plane4Img.on('pointerup', () => {
            this.text.setText('The  child  of  the  powerful  Uranus  is  ready!');

            CST.STATE.PLANE = plane4Img.texture.key;
        });

        const back5 = this.add.rectangle(
            this.game.renderer.width * 4 / 5 + 40,
            this.game.renderer.height * 3 / 5 - 10,
            78,
            103,
            0xffffff
            )
            .setVisible(false).setOrigin(0).setDepth(1).setAlpha(0.4);

        plane5Img.setInteractive();

        plane5Img.on('pointerover', () => {
            back5.setVisible(true);
         })

        plane5Img.on('pointerout', () => {
            back5.setVisible(false);
        });

        plane5Img.on('pointerup', () => {
            this.text.setText('Surf-green  serpent  takes  off  from  the  runway!');

            CST.STATE.PLANE = plane5Img.texture.key;
        });

        const BackImg = this.add.image(this.game.renderer.width / 2, this.game.renderer.height - 50, CST.IMAGES.BUTTON)
            .setScale(3);
        const BackText = this.make.text({
            x: this.game.renderer.width / 2 - 23,
            y: this.game.renderer.height - 57,
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