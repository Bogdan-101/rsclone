import { CST } from '../const/CST';

export class CreditScene extends Phaser.Scene{
    private creditsEng!: string;
    private creditsRus!: string;
    constructor(){
        super({
            key: CST.SCENES.CREDITSCENE
        })
    }

    create() {
        this.creditsRus = 'AIRBORNE\n Разработана Кармызовым Богданом (github.com/Bogdan-101), используя Phaser 3 и Javascript. Отдельная благодарность группам Суперюность, Электроника-60 и DigitalCounty за предоставленную музыку и Руденок Яне за помощь в создании ассетов. Огромная благодарность Rolling Scopes School за возможность обучения и все знания, плоды которых вы можете видеть тут.';
        this.creditsEng = 'AIRBORNE\n Developed by Bogdan Karmyzow (github.com/Bogdan-101) using Phaser 3 and Javascript. Special thanks to Superyunost, Elektronika-60 and DigitalCounty for the provided music and Rudenok Yana for help in creating assets. Many thanks to Rolling Scopes School for the opportunity to study and all the knowledge, the result of which you can see here.';
        const textRus = this.make.text({
            x: this.game.renderer.width / 10,
            y: this.game.renderer.height,
            text: this.creditsRus,
            style: {
                fontFamily: 'Courier',
                fontSize: '20px',
                color: '#ffffff',
                wordWrap: { width: 700 }
            }
        });

        const line = this.add.image(this.game.renderer.width / 10 - 50, this.game.renderer.height * 5 / 4 + 25, CST.IMAGES.CREDITSLINE)
            .setOrigin(0).setScale(1.25);

        const textEng = this.make.text({
            x: this.game.renderer.width / 10,
            y: this.game.renderer.height * 1.4,
            text: this.creditsEng,
            style: {
                fontFamily: 'Courier',
                fontSize: '20px',
                color: '#ffffff',
                wordWrap: { width: 700 }
            }
        });

        const BackImg = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 11 / 6 - 50, CST.IMAGES.BUTTON)
        .setOrigin(0.5).setScale(3);
        const BackText = this.make.text({
            x: this.game.renderer.width / 2 - 20,
            y: this.game.renderer.height * 11 / 6 - 57,
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

        [textRus, line, textEng, BackImg, BackText].map((elem) => {
            this.tweens.add({
                targets: elem,
                y: elem.y - this.game.renderer.height * 5 / 6,
                alpha: { from: 0, to: 1 },
                duration: 1500,
                ease: 'Power1'
            });
        })
    }
}