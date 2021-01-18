/// <reference path='../typings/phaser.d.ts' />


import { LoadScene } from './scenes/LoadScene';
import { MenuScene } from './scenes/MenuScene';
const game = new Phaser.Game({
    width: 800,
    height: 600,
    scene:[
        LoadScene, MenuScene
    ],
    render: {
        pixelArt: true
    }
})