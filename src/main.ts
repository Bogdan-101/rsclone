/// <reference path='../typings/phaser.d.ts' />


import { GameScene } from './scenes/GameScene';
import { LoadScene } from './scenes/LoadScene';
import { MenuScene } from './scenes/MenuScene';
import { ChooseScene } from './scenes/ChooseScene'
import { HUDScene } from './scenes/HUDScene';
import { OptionsScene } from './scenes/OptionsScene';
import { GameOverScene } from './scenes/GameOverScene';
import { MusicScene } from './scenes/MusicScene';
import { PauseScene } from './scenes/PauseScene';
const game = new Phaser.Game({
    width: 800,
    height: 600,
    scene:[
        LoadScene, MenuScene, GameScene, ChooseScene, HUDScene, OptionsScene, GameOverScene, MusicScene, PauseScene
    ],
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
})