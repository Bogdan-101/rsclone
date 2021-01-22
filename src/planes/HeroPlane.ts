import { CST } from '../const/CST';

export default class Hero extends Phaser.GameObjects.Sprite
{
    private health: number;
    private bullets!: Phaser.Physics.Arcade.Group;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.health = 6;
    }
}