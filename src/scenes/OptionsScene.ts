import { CST } from '../const/CST';

export class OptionsScene extends Phaser.Scene{

    private text!: Phaser.GameObjects.Text;
    private audioText!: Phaser.GameObjects.Text;
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

        this.audioText = this.make.text({
            x: this.game.renderer.width / 2 - 10,
            y: this.game.renderer.height / 2 - 120,
            text: '',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });

        this.make.text({
            x: this.game.renderer.width / 2 - 70,
            y: this.game.renderer.height / 2 - 170,
            text: 'Volume:',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '26px',
                color: '#fff'
            }
        });
    }

    update(){
        this.audioText.setText(CST.STATE.AUDIO.slice(0, 3));
    }

    create(){
        const upButton = this.add.image(this.game.renderer.width / 2 + 50, this.game.renderer.height / 2 - 150, CST.IMAGES.ARROWBUTTON)
            .setScale(0.25).setOrigin(0);
        const downButton = this.add.image(this.game.renderer.width / 2 + 50 + 19, this.game.renderer.height / 2 - 115 + 23, CST.IMAGES.ARROWBUTTON)
            .setScale(0.25).setRotation(3.1415926538);

        upButton.setInteractive();

        upButton.on('pointerup', () => {
            if (+CST.STATE.AUDIO + 0.1 <= 0.9)
                CST.STATE.AUDIO = (+CST.STATE.AUDIO + 0.1).toString();
            else
                CST.STATE.AUDIO = '1';
        });

        downButton.setInteractive();

        downButton.on('pointerup', () => {
            if (+CST.STATE.AUDIO - 0.1 >= 0.1)
                CST.STATE.AUDIO = (+CST.STATE.AUDIO - 0.1).toString();
            else
                CST.STATE.AUDIO = '0';
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
            console.log(CST.STATE.PLANE);
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
            this.text.setText('The  best  of  the  best  -  King\'s  aviation  is  yours!');

            CST.STATE.PLANE = plane2Img.texture.key;
            console.log(CST.STATE.PLANE);
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
            console.log(CST.STATE.PLANE);
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
            console.log(CST.STATE.PLANE);
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
            console.log(CST.STATE.PLANE);
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