import { CST } from '../const/CST';
import { SETTINGS } from '../const/SETTINGS';

export class MusicScene extends Phaser.Scene{
    private music!: Phaser.Sound.BaseSound;
    private musicIndex!: number;
    constructor(){
        super({
            key: CST.SCENES.MUSICSCENE
        })
    }

    DieMusic(): void {
        this.sound.volume = 0.1;
    }

    PauseMusic(): void {
        this.music.pause();
    }

    ContinueMusic(): void {
        this.music.resume();
    }

    create() {
        if (+SETTINGS.STATE.MUSIC >= 0.1) {
            const rand = Phaser.Math.Between(1, 6);

            switch (rand) {
                case 1: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC1, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 2: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC2, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 3: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC3, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 4: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC4, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 5: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC5, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 6: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC6, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                default: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC1, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
            }

            const NowPlaying = this.add.image(-200, 10, CST.IMAGES.NOWPLAYING)
                .setOrigin(0);

            const musicText = this.make.text({
                x: -200,
                y: 25 ,
                text: `Now playing:\n${this.music.key.slice(0, this.music.key.length - 4)}`,
                style: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    color: '#ffffff',
                    wordWrap: { width: 150 }
                }
            });

            this.tweens.add({
                targets: musicText,
                x: 15,
                alpha: { from: 0, to: 1 },
                duration: 1000,
                ease: 'Cubic.easeInOut'
            });

            this.tweens.add({
                targets: NowPlaying,
                x: 0,
                duration: 1000,
                ease: 'Cubic.easeInOut'
            });

            this.time.addEvent({
                delay: 6000,
                callback: () => {
                    this.tweens.add({
                        targets: musicText,
                        x: -265,
                        alpha: { from: 1, to: 0 },
                        duration: 1000,
                        ease: 'Cubic.easeInOut'
                    });
                    this.tweens.add({
                        targets: NowPlaying,
                        x: -250,
                        duration: 1000,
                        ease: 'Cubic.easeInOut'
                    });
                    this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            musicText.destroy();
                            NowPlaying.destroy();
                        },
                        loop: false
                    });
                },
                loop: false
            });
        }
    }

    update() {
        if (+SETTINGS.STATE.MUSIC !== 0 && !this.music.isPlaying && !this.scene.isActive(CST.SCENES.PAUSESCENE)) {
            let rand = Phaser.Math.Between(1, 5);
            while (rand === this.musicIndex)
                rand = Phaser.Math.Between(1, 5);

            switch (rand) {
                case 1: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC1, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 2: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC2, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 3: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC3, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 4: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC4, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 5: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC5, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                case 6: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC6, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
                default: {
                    this.music = this.sound.add(CST.AUDIO.MUSIC1, { volume: +SETTINGS.STATE.MUSIC });
                    this.music.play();
                    break;
                }
            }

            const NowPlaying = this.add.image(-200, 10, CST.IMAGES.NOWPLAYING)
                .setOrigin(0);

            const musicText = this.make.text({
                x: -200,
                y: 25,
                text: `Now playing:\n${this.music.key.slice(0, this.music.key.length - 4)}`,
                style: {
                    fontFamily: 'Courier',
                    fontSize: '16px',
                    color: '#ffffff'
                }
            });

            this.tweens.add({
                targets: musicText,
                x: 15,
                alpha: { from: 0, to: 1 },
                duration: 1000,
                ease: 'Cubic.easeInOut'
            });

            this.tweens.add({
                targets: NowPlaying,
                x: 0,
                duration: 1000,
                ease: 'Cubic.easeInOut'
            });

            this.time.addEvent({
                delay: 6000,
                callback: () => {
                    this.tweens.add({
                        targets: musicText,
                        x: -265,
                        alpha: { from: 1, to: 0 },
                        duration: 1000,
                        ease: 'Cubic.easeInOut'
                    });
                    this.tweens.add({
                        targets: NowPlaying,
                        x: -250,
                        duration: 1000,
                        ease: 'Cubic.easeInOut'
                    });
                    this.time.addEvent({
                        delay: 1000,
                        callback: () => {
                            musicText.destroy();
                            NowPlaying.destroy();
                        },
                        loop: false
                    });
                },
                loop: false
            });
        }
    }
}