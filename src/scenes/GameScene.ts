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

    preload(){

    }

    create(){
        
    }
}