import { CST } from '../const/CST';

export class PauseScene extends Phaser.Scene{
    constructor(){
        super({
            key: CST.SCENES.PAUSESCENE
        })
    }

    create() {
        this.add.rectangle(0, 0, this.renderer.width, this.renderer.height, 0x000000, 0.6)
            .setOrigin(0).setDepth(1).setScale(2);
        this.input.keyboard.on('keydown-ESC', () => {
            //@ts-ignore
            this.scene.get(CST.SCENES.GAME).ContinuePlay();
        });
    }
}