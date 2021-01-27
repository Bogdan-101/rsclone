import { CST } from '../const/CST';

export class MusicScene extends Phaser.Scene{
    private music!: Phaser.Sound.BaseSound;
    private musicIndex!: number;
    constructor(){
        super({
            key: CST.SCENES.MUSICSCENE
        })
    }

    DieMusic() {
        this.sound.volume = 0.1;
    }

    create() {
        if (+CST.STATE.MUSIC >= 0.1) {
            const rand = Phaser.Math.Between(1, 3);

            switch (rand) {
                case 1: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC1, { volume: +CST.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 2: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC2, { volume: +CST.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 3: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC3, { volume: +CST.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                default: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC1, { volume: +CST.STATE.MUSIC });
                    this.music.play();
                    break;
                }
            }

            const musicText = this.make.text({
                x: -200,
                y: 10,
                text: `Now playing:\n${this.music.key.slice(0, this.music.key.length - 4)}`,
                style: {
                    fontFamily: 'arcadeFont',
                    fontSize: '16px',
                    color: '#000000'
                }
            });

            this.tweens.add({
                targets: musicText,
                x: 10,
                alpha: { from: 0, to: 1 },
                duration: 1000,
                ease: 'Cubic.easeInOut'
            });

            this.time.addEvent({
                delay: 6000,
                callback: () => {
                    this.tweens.add({
                        targets: musicText,
                        x: -200,
                        alpha: { from: 1, to: 0 },
                        duration: 1000,
                        ease: 'Cubic.easeInOut'
                    });
                    this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            musicText.destroy();
                        },
                        loop: false
                    });
                },
                loop: false
            });
        }
    }

    update() {
        if (+CST.STATE.MUSIC !== 0 && +CST.STATE.EFFECTS !== 0 && !this.music.isPlaying) {
            let rand = Phaser.Math.Between(1, 3);
            while (rand === this.musicIndex)
                rand = Phaser.Math.Between(1, 3);

            switch (rand) {
                case 1: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC1, { volume: +CST.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 2: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC2, { volume: +CST.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 3: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC3, { volume: +CST.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                default: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC1, { volume: +CST.STATE.MUSIC });
                    this.music.play();
                    break;
                }
            }

            const musicText = this.make.text({
                x: -200,
                y: 10,
                text: `Now playing:\n${this.music.key.slice(0, this.music.key.length - 4)}`,
                style: {
                    fontFamily: 'arcadeFont',
                    fontSize: '16px',
                    color: '#000000'
                }
            });

            this.tweens.add({
                targets: musicText,
                x: 10,
                alpha: { from: 0, to: 1 },
                duration: 1000,
                ease: 'Cubic.easeInOut'
            });

            this.time.addEvent({
                delay: 6000,
                callback: () => {
                    this.tweens.add({
                        targets: musicText,
                        x: -200,
                        alpha: { from: 1, to: 0 },
                        duration: 1000,
                        ease: 'Cubic.easeInOut'
                    });
                    this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            musicText.destroy();
                        },
                        loop: false
                    });
                },
                loop: false
            });
        }
    }
}