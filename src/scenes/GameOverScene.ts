import { CST } from '../const/CST';

export class GameOverScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.GAMEOVERSCENE
        })
    }

    create(){
        this.add.rectangle(0, 0, this.renderer.width, this.renderer.height, 0x000000, 0.6)
            .setOrigin(0).setDepth(1).setScale(2);
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGES.GAMEOVER)
            .setDepth(5);
        const restartButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, CST.IMAGES.RESTART)
            .setDepth(5).setScale(2.5);

        restartButton.setInteractive();

        restartButton.on('pointerup', () => {
            restartButton.setScale(2.75);
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    restartButton.setScale(2.5);
                },
                loop: false
            });
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    //@ts-ignore
                    this.scene.get(CST.SCENES.GAME).RestartGame();
                },
                loop: false
            });
        });

        this.input.keyboard.on('keydown-R', () => {
            //@ts-ignore
            this.scene.get(CST.SCENES.GAME).RestartGame();
       });

        const homeButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 200, CST.IMAGES.HOME)
            .setDepth(6).setScale(2.5);

        homeButton.setInteractive();

        homeButton.on('pointerup', () => {
            homeButton.setScale(2.75);
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    homeButton.setScale(2.5);
                },
                loop: false
            });
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    //@ts-ignore
                    this.scene.get(CST.SCENES.GAME).GoHome();
                },
                loop: false
            });
        });
    }
}