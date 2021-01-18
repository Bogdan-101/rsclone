import { CST } from '../const/CST';

export class MenuScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.MENU
        })
    }
    init(){

    }

    preload(){

    }

    create(){
        this.sound.pauseOnBlur = false;
        this.sound.play(CST.AUDIO.MAINIMENU, {
            loop: true
        });

        const mainText = this.make.text({
            x: this.game.renderer.width / 2 - 200 ,
            y: this.game.renderer.height / 2 - 200,
            text: 'AIRBORNE',
            style: {
                fontFamily: 'arcadeFont',
                fontSize: '82px',
                color: '#000000'
            }
        }).setDepth(1);

        this.cameras.main.backgroundColor.setTo(234, 234, 234);
        const background = this.add.image(-100, 0, CST.IMAGES.SKY1).setOrigin(0).setScale(0.5);

        let playImg = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height / 2, CST.IMAGES.BUTTON).setOrigin(0).setScale(3);
        const playText = this.make.text({
            x: this.game.renderer.width / 2 + 175,
            y: this.game.renderer.height / 2 + 42,
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
                callback: ()=>{
                    playImg.setScale(3);
                    playText.setScale(1);
                    playText.setX(playText.x - 5);
                },
                loop: false
            });
            this.time.addEvent({
                delay: 200,
                callback: ()=>{
                    this.scene.start(CST.SCENES.GAME);
                },
                loop: false
            });
        });

        let optionsImg = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height / 2 + 100, CST.IMAGES.BUTTON).setOrigin(0).setScale(3);
        const optionsText = this.make.text({
            x: this.game.renderer.width / 2 + 160,
            y: this.game.renderer.height / 2 + 142,
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
            optionsText.setScale(1.08333);
            optionsText.setX(optionsText.x + 5);
            this.time.addEvent({
                delay: 100,
                callback: ()=>{
                    optionsImg.setScale(3);
                    optionsText.setScale(1);
                    optionsText.setX(optionsText.x - 5);
                },
                loop: false
            });
        });

        let creditsImg = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height / 2 + 200, CST.IMAGES.BUTTON).setOrigin(0).setScale(3);
        const creditsText = this.make.text({
            x: this.game.renderer.width / 2 + 160,
            y: this.game.renderer.height / 2 + 242,
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
                callback: ()=>{
                    creditsImg.setScale(3);
                    creditsText.setScale(1);
                    creditsText.setX(creditsText.x - 5);
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