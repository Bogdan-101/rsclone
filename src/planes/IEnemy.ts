export default interface IEnemy {
    setTarget(target: Phaser.GameObjects.Components.Transform): void;
    update(t: number, dt: number): void;
}