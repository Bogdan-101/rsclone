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

        [textRus, line, textEng].map((elem) => {
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